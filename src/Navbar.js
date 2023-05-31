// imports
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPlus } from '@fortawesome/free-solid-svg-icons';

// component for the navbar
export default function Navbar(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button className="nav-link btn btn-link"
                                    onClick={event => {props.addTestCase({shouldScroll: true})}}>
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span className="ml-5">AddTestCase</span>
                                </button>
                            </li>
                            <li className="nav-separator"></li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link"
                                    onClick={event => {props.downloadJSON()}}>
                                    <FontAwesomeIcon icon={faDownload} />
                                    <span className="ml-5">Download JSON</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}