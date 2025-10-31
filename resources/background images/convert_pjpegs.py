import os
from PIL import Image

cwd = os.getcwd()
out_dir = os.path.join(cwd, "progressive_output")
os.makedirs(out_dir, exist_ok=True)

files = [f for f in os.listdir(cwd) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]

print("Files to process:", files)

for f in files:
    img = Image.open(f).convert('RGB')
    base, _ = os.path.splitext(f)
    new_name = f"{base}_progressive.jpg"
    out_path = os.path.join(out_dir, new_name)
    img.save(out_path, 'JPEG', progressive=True)
    print("Converted:", out_path)
