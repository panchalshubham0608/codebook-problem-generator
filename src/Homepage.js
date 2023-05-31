// imports
import React from "react";
import logo from './logo.png';
import './Homepage.css';

// Homepage component
export default function Homepage(props) {
    return (
        <div className="header">
            <div className="container flex">
                <div className="text">
                    <h1 className="mb">
                        CodeBook <br />
                        <span>Learn</span> With Us!
                    </h1>

                    <p className="mb w-90">
                        Boost your coding skills with CodeBook,
                        a platform where you can test your coding skills and understanding
                        by solving problems across various topics starting from scratch to advanced level.
                    </p>

                    <label className="homepage-btn mt" onClick={event => props.setShowEditor(true)}>Create problem</label>
                </div>

                <div className="visual">
                    <img
                        src={logo}
                        alt="logo"
                    />
                </div>
            </div>
        </div>
    )
};
