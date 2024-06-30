import requests
import json

url_extract = "https://api.worqhat.com/api/ai/v2/pdf-extract"
url_summary = "https://api.worqhat.com/api/ai/content/v2"
api_key = "sk-5b429f078b2d48a2b98ed580d777c1b5"

def summarize_text(extracted_text):
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    body = {
        'question': "What are the important points in the following text?",
        'training_data': extracted_text,
        'preserve_history': False,
        'randomness': 0.4,
        'stream_data': False
    }
    response = requests.post(url_summary, headers=headers, json=body)
    if response.status_code == 200:
        json_response = response.json()
        summarized_content = json_response.get('content', '')
        return summarized_content
    else:
        return f"Failed to summarize text. Status code: {response.status_code}"

def extract_and_summarize(pdf_file_path, summary_output_path):
    headers = {
        'Authorization': f'Bearer {api_key}'
    }
    files = {
        'file': (pdf_file_path, open(pdf_file_path, 'rb'), 'application/pdf')
    }
    response = requests.post(url_extract, headers=headers, files=files)

    if response.status_code == 200:
        json_response = response.json()

        extracted_text = json_response.get('data')
        if extracted_text is not None:
            summarized_content = summarize_text(extracted_text)
            with open(summary_output_path, 'w', encoding='utf-8') as file:
                file.write(summarized_content)
            print("Content has been summarized and saved to 'summary.txt'")
        else:
            print("Extracted content is empty or does not contain 'data' key.")
    else:
        print(f"Failed to extract content from the PDF. Status code: {response.status_code}")