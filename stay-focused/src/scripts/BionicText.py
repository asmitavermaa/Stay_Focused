import sys
from PyPDF2 import PdfReader
import requests

def extract_text_from_pdf(pdf_path):
    text = ""
    reader = PdfReader(pdf_path)
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:  # Check if text was extracted
            text += page_text + "\n"
    return text

def convert_to_bionic_reading(text, output_path):
    url = "https://bionic-reading1.p.rapidapi.com/convert"
    payload = {
        "content": text,
        "response_type": "html",
        "request_type": "html",
        "fixation": "1",
        "saccade": "10"
    }
    headers = {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "00f2aebdb1mshe39113eed1bbf3dp167a75jsn71a7df41d255",
        "X-RapidAPI-Host": "bionic-reading1.p.rapidapi.com"
    }
    
    response = requests.post(url, data=payload, headers=headers)
    if response.status_code == 200:
        with open(output_path, "w", encoding='utf-8') as file:
            file.write(response.text)
        print(f"Bionic Reading conversion completed. Output saved to {output_path}")
    else:
        print("Error: Could not convert text to Bionic Reading format. Status code:", response.status_code)

def main():
    if len(sys.argv) != 3:
        print("Usage: python script.py <path_to_pdf> <output_path>")
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    output_path = sys.argv[2]
    if not output_path.lower().endswith('.html'):
        output_path += '.html'  # Ensure the output is an HTML file
    
    text = extract_text_from_pdf(pdf_path)
    convert_to_bionic_reading(text, output_path)

if __name__ == "__main__":
    main()
