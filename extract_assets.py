import fitz
import os

pdf_path = "c:/Users/Dhinesh/OneDrive/Desktop/Portfolio/HOME.pdf"
doc = fitz.open(pdf_path)
page = doc[0]

print(f"Page rect: {page.rect}")
image_list = page.get_images(full=True)
print(f"Total images found: {len(image_list)}")

out_dir = "c:/Users/Dhinesh/OneDrive/Desktop/Portfolio/extracted_assets"
os.makedirs(out_dir, exist_ok=True)

for i, img_info in enumerate(image_list):
    xref = img_info[0]
    base_img = doc.extract_image(xref)
    ext = base_img["ext"]
    w = base_img["width"]
    h = base_img["height"]
    img_bytes = base_img["image"]
    out_file = os.path.join(out_dir, f"img_{i}_{xref}_{w}x{h}.{ext}")
    with open(out_file, "wb") as f:
        f.write(img_bytes)
    print(f"Saved image {i}: {out_file} ({w}x{h})")

# Also render the full page at high resolution so we have a reference screenshot
pix = page.get_pixmap(dpi=200)
pix.save(os.path.join(out_dir, "page_rendered_200dpi.png"))
print("Saved rendered page at 200dpi")
