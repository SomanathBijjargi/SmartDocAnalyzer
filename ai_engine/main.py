from fastapi import FastAPI, UploadFile, File
import shutil
import os
from paddleocr import PaddleOCR
from pdf2image import convert_from_path

app = FastAPI()

ocr = PaddleOCR(use_angle_cls=True, lang='en')

UPLOAD_FOLDER = "temp"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.get("/")
def home():
    return {"message": "OCR API running"}

@app.post("/ocr")
async def extract_text(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        all_text = []

        # if pdf
        if file.filename.endswith(".pdf"):
            pages = convert_from_path(file_path)

            for page in pages:
                img_path = file_path + ".png"
                page.save(img_path, "PNG")

                result = ocr.ocr(img_path)
                for line in result[0]:
                    all_text.append(line[1][0])

                os.remove(img_path)

        else:
            result = ocr.ocr(file_path)
            for line in result[0]:
                all_text.append(line[1][0])

        os.remove(file_path)

        return {
            "extracted_text": "\n".join(all_text)
        }

    except Exception as e:
        return {"error": str(e)}
