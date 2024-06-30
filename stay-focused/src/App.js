import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import Home from './pages/Home';
import ToDoList from './pages/ToDoList';
import Pomodoro from './pages/Pomodoro';
import ChatBot from './pages/ChatBot';
import TextToSpeech from './pages/TextToSpeech';
import BionicText from './pages/BionicText';
import Summariser from './pages/Summariser';


function App() {  
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/todolist" element={<ToDoList />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          {/* <Route path="/flashcards" element={<Flashcards />} /> */}
          <Route path="/summariser" element={<Summariser />} />
          <Route path="/texttospeech" element={<TextToSpeech />} />
          <Route path="/bionictext" element={<BionicText />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
