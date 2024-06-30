from flask import Flask, request, send_file, jsonify
from flask_cors import CORS, cross_origin
from textToSpeech import pdf_to_mp3
from imp_points import extract_and_summarize  # Ensure this is correctly imported
from BionicText import convert_to_bionic_reading, extract_text_from_pdf
from chatbot import ask_question
import os

# Define the temporary directory based on the operating system
temp_dir = 'C:\\temp\\' if os.name == 'nt' else '/tmp/'
pdf_path = os.path.join(temp_dir, 'input.pdf')
summary_path = os.path.join(temp_dir, 'summary.txt')  # Define path for summary output
mp3_path = os.path.join(temp_dir, 'output.mp3')
bionic_text_path = os.path.join(temp_dir, 'bionic_text.html')  # This will be used as a default or example path

app = Flask(__name__)
CORS(app, resources={
    r"/generate-speech": {"origins": "*"},
    r"/generate-summary": {"origins": "*"},
    r"/generate-bionic-text": {"origins": "*"},
    r"/chatbot": {"origins": "*"} 
})


@app.route('/generate-speech', methods=['POST'])
@cross_origin()
def generate_speech():
    if 'pdfFile' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    pdf_file = request.files['pdfFile']
    if pdf_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Save the uploaded PDF file to the determined temporary path
        pdf_file.save(pdf_path)
        if not pdf_to_mp3(pdf_path, mp3_path):
            raise Exception('Conversion failed. Unable to extract text or generate speech.')

        if not os.path.exists(mp3_path):
            raise Exception('MP3 file not found after conversion.')

        # Return the MP3 file as a downloadable attachment
        return send_file(mp3_path, as_attachment=True)
    except Exception as e:
        app.logger.error('Failed to generate speech: %s', str(e))  # Log the error for more details
        return jsonify({'error': str(e)}), 500

@app.route('/generate-summary', methods=['POST'])
@cross_origin()
def generate_summary():
    if 'pdfFile' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    pdf_file = request.files['pdfFile']
    if pdf_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Save the uploaded PDF, process it, etc.
        pdf_file.save(pdf_path)
        extract_and_summarize(pdf_path, summary_path)  # Adjusted function call

        if not os.path.exists(summary_path):
            raise Exception('Summary file not found after conversion.')

        # Corrected send_file call
        return send_file(summary_path, mimetype='text/plain', as_attachment=True, download_name='summary.txt')
    except Exception as e:
        app.logger.error(f'Failed to generate summary: {e}')  # Log the error
        return jsonify({'error': str(e)}), 500
    
@app.route('/generate-bionic-text', methods=['POST'])
@cross_origin()
def generate_bionic_text():
    if 'pdfFile' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    pdf_file = request.files['pdfFile']
    if pdf_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Save the uploaded PDF file to the temporary directory
        pdf_file_path = os.path.join(temp_dir, pdf_file.filename)
        pdf_file.save(pdf_file_path)

        # Output path for the converted file
        bionic_output_path = os.path.join(temp_dir, 'bionic_text.html')

        # Extract text and convert to Bionic Reading format
        text = extract_text_from_pdf(pdf_file_path)
        convert_to_bionic_reading(text, bionic_output_path)

        if not os.path.exists(bionic_output_path):
            raise Exception('Bionic text file not found after conversion.')

        # Return the bionic text file as a downloadable attachment
        return send_file(bionic_output_path, as_attachment=True, download_name='bionic_text.html')
    except Exception as e:
        app.logger.error('Failed to generate bionic text: %s', str(e))
        return jsonify({'error': str(e)}), 500


@app.route('/chatbot', methods=['POST'])
@cross_origin()
def chatbot_conversation():
    message_data = request.get_json()
    user_message = message_data.get('message')

    if not user_message:
        return jsonify({'error': 'Empty message received'}), 400

    try:
        response = ask_question(user_message)
        return jsonify({'message': response}), 200
    except Exception as e:
        return jsonify({'error': f'Error processing message: {str(e)}'}), 500
