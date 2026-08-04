from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "media" / "handheld-front-studio-v7.png"
OUTPUT = ROOT / "public" / "media" / "handheld-front-studio-v9.png"
FINAL = ROOT / "public" / "media" / "handheld-front-studio-final.png"


def feathered_blur(
    image: Image.Image,
    box: tuple[int, int, int, int],
    padding: int = 14,
) -> None:
    left, top, right, bottom = box
    context = (
        left - padding,
        top - padding,
        right + padding,
        bottom + padding,
    )
    patch = image.crop(context)
    blurred = patch.filter(ImageFilter.GaussianBlur(5))
    width, height = patch.size
    mask = Image.new("L", patch.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle(
        (padding, padding, width - padding - 1, height - padding - 1),
        radius=8,
        fill=220,
    )
    mask = mask.filter(ImageFilter.GaussianBlur(8))
    image.paste(blurred, context[:2], mask)


def add_transparent_emboss(image: Image.Image, text: str, center: tuple[int, int]) -> None:
    font_path = Path(r"C:\Windows\Fonts\segoeui.ttf")
    font = ImageFont.truetype(str(font_path), 18)
    probe = ImageDraw.Draw(image)
    box = probe.textbbox((0, 0), text, font=font)
    width = box[2] - box[0]
    height = box[3] - box[1]
    x = center[0] - width // 2
    y = center[1] - height // 2 - box[1]

    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.text((x - 1, y - 1), text, font=font, fill=(117, 198, 238, 54))
    draw.text((x + 1, y + 1), text, font=font, fill=(8, 48, 126, 70))
    draw.text((x, y), text, font=font, fill=(44, 126, 190, 20))
    image.alpha_composite(overlay)


def main() -> None:
    image = Image.open(SOURCE).convert("RGBA")

    # Remove the model's two misplaced FN marks without disturbing the shell gradient.
    feathered_blur(image, (252, 992, 300, 1029))
    feathered_blur(image, (405, 1124, 454, 1160))

    # The real unit has a clear molded FN mark centered between speaker and top button.
    add_transparent_emboss(image, "FN", (512, 924))

    image.save(OUTPUT)
    image.save(FINAL)


if __name__ == "__main__":
    main()
