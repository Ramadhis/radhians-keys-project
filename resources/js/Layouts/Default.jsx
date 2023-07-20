//import React
import React from "react";

//import Link
import { Link } from "@inertiajs/inertia-react";
import LoginModal from "../Pages/Auth/loginModal";

function Layout({ children }) {
    return (
        <>
            <header>
                <title>tes</title>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container">
                        <Link className="navbar-brand" href="/">
                            LARAVEL + INERTIA.JS
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse"
                            aria-controls="navbarCollapse"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarCollapse"
                        >
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <Link className="nav-link" href="/posts/">
                                        POSTS
                                    </Link>
                                </li>
                            </ul>
                            <LoginModal />
                        </div>
                    </div>
                </nav>
            </header>

            <main className="container mt-5">{children}</main>
        </>
    );
}

export default Layout;
