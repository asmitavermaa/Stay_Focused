import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleMessageSend = async () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      
      try {
        const response = await axios.post('http://localhost:5000/chatbot', { message: inputMessage });
        const botMessage = response.data.message;
        setMessages([...messages, { text: botMessage, sender: 'bot' }]);
      } catch (error) {
        console.error('Error sending message:', error.message);
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-purple-900 p-8 min-h-screen font-sans">
      <h1 className="text-5xl text-center text-white font-bold mb-8">ChatBot</h1>
      <div className="bg-gray-700 rounded-lg p-4 mb-4 shadow-md" style={{ height: '400px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            {message.sender === 'user' && <span className="block text-sm text-gray-300">You</span>}
            <span className={`px-2 py-1 rounded-md ${message.sender === 'user' ? 'bg-gray-500 text-white' : 'bg-purple-500 text-white'}`} style={{ overflowWrap: 'break-word', display: 'inline-block', maxWidth: '80%', textAlign: 'left', padding: '8px', margin: '4px 0' }}>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <input
          type="text"
          className="flex-grow bg-gray-700 text-white py-2 px-4 rounded-l-lg focus:outline-none"
          placeholder="Type your message here..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          className="bg-purple-500 hover:bg-white text-white hover:text-purple-500 font-bold py-2 px-4 rounded-r-lg focus:outline-none"
          onClick={handleMessageSend}
        >
            &rarr;
        </button>
      </div>
    </div>
  );
};

export default ChatBot;