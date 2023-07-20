import React, { useState, useEffect } from "react";
import AuthModal from "../Pages/Auth/AuthModal";
import MyLayoutModal from "../Pages/my-Layout/MyLayoutModal";
import ProfileModal from "./../Pages/Auth/ProfileModal";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import ChangePassword from "../Pages/Auth/ChangePassword";

import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

const Header = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [formSelection, setFormSelection] = useState("sign-in");
    const [showModalMyLayout, setModalMyLayout] = useState(false);
    const [handleProfileModal, setHandleProfileModal] = useState(false);
    const [handleForgotPasswordModal, setHandleForgotPasswordModal] =
        useState(false);
    const [handleChangePasswordModal, setHandleChangePasswordModal] =
        useState(false);

    const { auth } = usePage().props;

    //show sign up modal and hide sign in modal
    const notHaveAccount = () => {
        // return console.log("tes click");
        setShowAuthModal(false);
        setTimeout(() => {
            setFormSelection("sign-up");
            setShowAuthModal(true);
        }, 200);
        // formRef.current.classList.add("d-none");
    };

    //show sign up modal and hide sign in modal
    const showForgotPasswordSendEmail = () => {
        // return console.log("tes click");
        setShowAuthModal(false);
        setTimeout(() => {
            setHandleForgotPasswordModal(true);
        }, 200);
        // formRef.current.classList.add("d-none");
    };

    const hideAuthModal = () => {
        return setShowAuthModal(false);
    };

    const hideMyLayoutModal = () => {
        console.log("close");
        return setModalMyLayout(false);
    };

    const hideProfileModal = () => {
        return setHandleProfileModal(false);
    };

    const hideForgotPasswordModal = () => {
        return setHandleForgotPasswordModal(false);
    };

    const hideChangePasswordModal = () => {
        return setHandleChangePasswordModal(false);
    };

    const showChangePasswordModal = () => {
        return setHandleChangePasswordModal(true);
    };

    const Logout = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        Inertia.post("/logout-user");
    };

    useEffect(() => {
        console.log(auth);
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Radhians-Keys
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    href="/creative-mode"
                                >
                                    Create-Layout
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/">
                                    Keyboard-tes
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="float-end">
                        {auth.user ? (
                            //user with login auth
                            <a
                                className="nav-link dropdown-toggle float-end me-2 text-white"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                            >
                                {auth.user.name}
                            </a>
                        ) : (
                            //user without login auth
                            <>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary text-white me-2 "
                                    onClick={() => {
                                        setFormSelection("sign-in");
                                        return setShowAuthModal(true);
                                    }}
                                >
                                    Sign in
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-sm btn-primary"
                                    onClick={() => {
                                        setFormSelection("sign-up");
                                        return setShowAuthModal(true);
                                    }}
                                >
                                    Sign up
                                </button>
                            </>
                        )}

                        {/* <a
                            className="nav-link dropdown-toggle float-end me-2 text-white"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                        >
                            Ramadhiansyah
                        </a> */}
                        <ul className="dropdown-menu dropdown-menu-end me-2 float-end">
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        return setHandleProfileModal(true);
                                    }}
                                >
                                    Profile
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => {
                                        return setModalMyLayout(true);
                                    }}
                                >
                                    My Layout
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={Logout}
                                >
                                    Sign out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <AuthModal
                showAuthModal={showAuthModal}
                hideAuthModal={hideAuthModal}
                formSelection={formSelection}
                notHaveAccount={notHaveAccount}
                showForgotPasswordSendEmail={showForgotPasswordSendEmail}
            />
            <MyLayoutModal
                showModalMyLayout={showModalMyLayout}
                hideMyLayoutModal={hideMyLayoutModal}
            />

            <ProfileModal
                handleProfileModal={handleProfileModal}
                hideProfileModal={hideProfileModal}
                showChangePasswordModal={showChangePasswordModal}
            />

            <ForgotPassword
                handleForgotPasswordModal={handleForgotPasswordModal}
                hideForgotPasswordModal={hideForgotPasswordModal}
            />
            <ChangePassword
                handleChangePasswordModal={handleChangePasswordModal}
                hideChangePasswordModal={hideChangePasswordModal}
            />
        </>
    );
};

export default Header;
