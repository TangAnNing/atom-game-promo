from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage


ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / "public" / "media"
SOURCE = MEDIA / "handheld-front-blue-chroma-v3.png"
OUTPUT = MEDIA / "handheld-front-blue-v3.png"


def remove_connected_chroma(image: Image.Image) -> Image.Image:
    rgba = np.asarray(image.convert("RGBA"), dtype=np.uint8).copy()
    rgb = rgba[..., :3].astype(np.int16)
    border = np.concatenate(
        [rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]], axis=0
    )
    key = np.median(border, axis=0)
    distance = np.sqrt(np.sum((rgb - key) ** 2, axis=2))

    seed = np.zeros(distance.shape, dtype=bool)
    seed[0] = distance[0] < 80
    seed[-1] = distance[-1] < 80
    seed[:, 0] = distance[:, 0] < 80
    seed[:, -1] = distance[:, -1] < 80
    connected = ndimage.binary_propagation(seed, mask=distance < 220)

    alpha = np.full(distance.shape, 255.0, dtype=np.float32)
    matte = np.clip((distance - 32) / (115 - 32), 0, 1)
    alpha[connected] = matte[connected] * 255
    rgba[..., 3] = np.minimum(rgba[..., 3], alpha.astype(np.uint8))

    edge = connected & (alpha > 0) & (alpha < 255)
    dominant = np.argmax(key)
    other = [index for index in range(3) if index != dominant]
    neutral = (rgba[..., other[0]].astype(np.int16) + rgba[..., other[1]]) // 2
    rgba[..., dominant][edge] = np.minimum(
        rgba[..., dominant][edge], neutral[edge] + 18
    ).astype(np.uint8)
    rgba[:16, :, 3] = 0
    rgba[-16:, :, 3] = 0
    rgba[:, :16, 3] = 0
    rgba[:, -16:, 3] = 0
    return Image.fromarray(rgba, "RGBA")


def main() -> None:
    result = remove_connected_chroma(Image.open(SOURCE))
    result.save(OUTPUT)


if __name__ == "__main__":
    main()
