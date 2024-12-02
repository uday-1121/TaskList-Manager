import React from 'react';
import "./Home.css";

const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center">Manage your Tasks<br/>Professionally and Easily!</h1>
        <p>Become Focused & Organized by keeping check on your Everyday Tasks.</p>
        <button className="home-btn p-2">Make a TaskList now</button>
      </div>
    </div>
  )
}

export default Home
