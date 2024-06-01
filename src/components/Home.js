import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="welcome-message">
                <img src="https://res.cloudinary.com/dgvslio7u/image/upload/v1717223880/fjrcjahd5ecez5sc7oii.png" alt="iNotebook Logo" className="logo" />
                <h1>Welcome to iNotebook</h1>
                <p>Your personal note-keeping application.</p>
            </div>
        </div>
    );
};

export default Home;
