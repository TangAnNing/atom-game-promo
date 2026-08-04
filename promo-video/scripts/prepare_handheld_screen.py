from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "media" / "handheld-front-studio-final.png"
OUTPUT = ROOT / "public" / "media" / "handheld-front-studio-frame-final.png"

SCREEN = {"x": 205, "y": 188, "width": 612, "height": 493, "radius": 5}


def main() -> None:
    image = Image.open(SOURCE).convert("RGBA")
    alpha = image.getchannel("A")
    draw = ImageDraw.Draw(alpha)
    draw.rounded_rectangle(
        (
            SCREEN["x"],
            SCREEN["y"],
            SCREEN["x"] + SCREEN["width"],
            SCREEN["y"] + SCREEN["height"],
        ),
        radius=SCREEN["radius"],
        fill=0,
    )
    image.putalpha(alpha)
    image.save(OUTPUT)


if __name__ == "__main__":
    main()
