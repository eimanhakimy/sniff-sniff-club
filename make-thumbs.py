"""Make small thumbnails for the Gallery section.

Run this again whenever you add or change photos in assets/teddy or assets/tam:
    pip install pillow
    python make-thumbs.py

Thumbnails are written to assets/thumbs/<folder>/<same file name>. The Gallery grid loads
these small files; tapping a photo opens the full-size original.
"""
import os
from PIL import Image, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "assets")
FOLDERS = ("teddy", "tam")
WIDTH = 420

count = 0
for folder in FOLDERS:
    src_dir = os.path.join(ASSETS, folder)
    out_dir = os.path.join(ASSETS, "thumbs", folder)
    os.makedirs(out_dir, exist_ok=True)
    for name in sorted(os.listdir(src_dir)):
        if not name.lower().endswith((".jpg", ".jpeg", ".png")):
            continue
        im = ImageOps.exif_transpose(Image.open(os.path.join(src_dir, name))).convert("RGB")
        im.thumbnail((WIDTH, WIDTH * 2))
        im.save(os.path.join(out_dir, os.path.splitext(name)[0] + ".jpg"), quality=76, optimize=True)
        count += 1
print("made", count, "thumbnails")
