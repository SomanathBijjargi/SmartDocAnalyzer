import sys
import os
from paddleocr import PaddleOCR
from pdf2image import convert_from_path

os.environ["FLAGS_log_level"] = "3"

file_path = sys.argv[1]

ocr = PaddleOCR(lang='en', show_log=False)

all_text = []

# if PDF
if file_path.lower().endswith(".pdf"):
    pages = convert_from_path(file_path)

    for i, page in enumerate(pages):
        img_path = f"temp_page_{i}.png"
        page.save(img_path, "PNG")

        result = ocr.ocr(img_path)
        for line in result[0]:
            all_text.append(line[1][0])

        os.remove(img_path)

# if image
else:
    result = ocr.ocr(file_path)
    for line in result[0]:
        all_text.append(line[1][0])

print("\n".join(all_text))
