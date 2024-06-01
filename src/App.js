import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Notes from './components/Notes';
import NoteState from './context/notes/NoteState'; // Import NoteState
// import Alert from "./components/Alert";
// import Home from './components/Home'; // Ensure you have a Welcome component
import "./App.css"

function App() {
  return (
    <NoteState>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div style={{ backgroundImage: "url('')", minHeight: "100vh", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
          <Navbar />
         
          <div className="container">
            <Routes>
              
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/notes" element={<Notes />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
