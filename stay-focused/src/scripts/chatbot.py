import requests

def read_text_from_file():
    """Reads text from 'adhd.txt' in the current directory."""
    with open('adhd.txt', 'r', encoding='utf-8') as file:
        text = file.read()
    return text

def ask_question(api_url, headers, conversation_history, question):
    """Sends a question to the text generation API and returns the answer."""
    payload = {
        "conversation_history": conversation_history,
        "preserve_history": True,
        "question": question,
        "randomness": 0.5,
        "response_type": "text",
        "stream_data": False
        # Removed the training_data line for simplicity and relevance
    }
    response = requests.post(api_url, json=payload, headers=headers)
    return response.json()

def main():
    api_url = "https://api.worqhat.com/api/ai/content/v3"
    token = "sk-894391dd580446b8ac2d643528aa979b"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    # Read text from 'adhd.txt' file
    text = read_text_from_file()
    # Convert the extracted text to conversation history format
    conversation_history = [{"Document Content": text}]
    
    # Start chatbot interaction
    print("Chatbot is ready. Ask me anything about the document.")
    while True:
        question = input("You: ")       
        response = ask_question(api_url, headers, conversation_history, question)
        print("Chatbot:", response.get("content", "Sorry, I couldn't process your request."))

if __name__ == "__main__":
    main()
