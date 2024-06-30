from pdfminer.high_level import extract_text
from gtts import gTTS
import sys

def pdf_to_mp3(pdf_path, mp3_output_path, lang='en'):
    try:
        pdf_text = extract_text(pdf_path)
        if not pdf_text:
            print("No text could be extracted from the PDF.")
            return False

        tts = gTTS(text=pdf_text, lang=lang)
        tts.save(mp3_output_path)
        print(f"Text converted to speech and saved as {mp3_output_path}")
        return True
    except Exception as e:
        print(f"An error occurred: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python textToSpeech.py <PDF file path> <MP3 output file path>")
        sys.exit(1)

    pdf_file_path = sys.argv[1]
    mp3_output_path = sys.argv[2]
    pdf_to_mp3(pdf_file_path, mp3_output_path)
