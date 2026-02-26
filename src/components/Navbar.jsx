import React from 'react'
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">

                {/* Logo / Brand */}
                <Link className="navbar-brand fw-bold" to="/">
                    MyApp
                </Link>

                {/* Toggle Button (Mobile ke liye) */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Nav Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/shop">Shop</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>

                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default Navbar