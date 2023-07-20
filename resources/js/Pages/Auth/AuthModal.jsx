import React, { useState, useEffect, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { Inertia } from "@inertiajs/inertia";

import { Link, usePage } from "@inertiajs/inertia-react";
import BlockUi from "../../layout-partials/block-ui/BlockUi";

const AuthModal = ({
    showAuthModal,
    hideAuthModal,
    formSelection,
    notHaveAccount,
    showForgotPasswordSendEmail,
}) => {
    const { auth, errors } = usePage().props;
    const [show, setShow] = useState(false);
    const [errorText, setErrorText] = useState({});
    const [formSelect, setFormSelect] = useState(formSelection);
    const formRef = useRef(false);
    const formRef2 = useRef(false);
    const [uiBlock, setUiBlock] = useState(false);

    useEffect(() => {
        if (showAuthModal) {
            if (auth.user) {
                hideAuthModal();
                setFormData((prev) => {
                    return {
                        ...prev,
                        name: "",
                        email: "",
                        password: "",
                        confirm_password: "",
                    };
                });
            }
            if (errors) {
                setErrorText(errors);
                setUiBlock(false);
            }
        }
    }, [auth, errors]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const handleClose = () => {
        //reset data in form
        setFormData((prev) => {
            return {
                ...prev,
                name: "",
                email: "",
                password: "",
                confirm_password: "",
            };
        });
        //resetError
        setErrorText({});
        return hideAuthModal();
    };

    // const notHaveAccount = (e) => {
    //     e.preventDefault();
    //     // formRef.current.classList.add("d-none");
    // };

    const submit = async (e) => {
        e.preventDefault();
        setUiBlock(true);
        if (formSelection === "sign-in") {
            Inertia.post("/login-user", {
                email: formData.email,
                password: formData.password,
            });
        } else {
            //formSelection === register or else
            Inertia.post("/register-user", {
                ...formData,
            });
        }
    };

    return (
        <>
            <Modal
                show={showAuthModal}
                onHide={handleClose}
                size="lg"
                backdrop="static"
                keyboard={false}
            >
                <BlockUi handleShow={uiBlock} />

                <form onSubmit={submit}>
                    {/* <Modal.Header closeButton>
                        <Modal.Title>{formSelection} Form</Modal.Title>
                    </Modal.Header> */}
                    <Modal.Body
                        className="p-0 w-100"
                        style={{ height: "530px" }}
                        closebutton="false"
                    >
                        <div className="col-12 w-100 h-100 g-0 m-0">
                            <div className="row">
                                <div className="col-6 p-4 h-100">
                                    <div className="mb-3">
                                        <div className="h4">
                                            {formSelection} Form
                                        </div>
                                        <hr
                                            className={`h4 ${
                                                formSelection === "sign-in"
                                                    ? "mb-5"
                                                    : "mb-3"
                                            }`}
                                        />
                                        {formSelection === "sign-in" ? (
                                            //login form
                                            <div
                                                ref={(e) => {
                                                    formRef.current = e;
                                                }}
                                            >
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Email address
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        value={formData.email}
                                                        onChange={(e) => {
                                                            e.preventDefault();
                                                            setFormData(
                                                                (prev) => {
                                                                    prev.email =
                                                                        e.target.value;
                                                                    return {
                                                                        ...prev,
                                                                    };
                                                                }
                                                            );
                                                        }}
                                                    ></input>
                                                    {errorText.email && (
                                                        <div className="text-danger form-text mt-0">
                                                            {errorText.email}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="exampleInputPassword1"
                                                        onChange={(e) => {
                                                            e.preventDefault();
                                                            setFormData(
                                                                (prev) => {
                                                                    prev.password =
                                                                        e.target.value;
                                                                    return {
                                                                        ...prev,
                                                                    };
                                                                }
                                                            );
                                                        }}
                                                    ></input>
                                                    {errorText.password && (
                                                        <div className="text-danger form-text mt-0">
                                                            {errorText.password}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            // register form
                                            <div
                                                ref={(e) => {
                                                    formRef2.current = e;
                                                }}
                                            >
                                                <div className="mb-2">
                                                    <label className="form-label">
                                                        Username
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.name}
                                                        onChange={(e) => {
                                                            e.preventDefault();
                                                            setFormData(
                                                                (prev) => {
                                                                    prev.name =
                                                                        e.target.value;
                                                                    return {
                                                                        ...prev,
                                                                    };
                                                                }
                                                            );
                                                        }}
                                                    ></input>
                                                    {errorText.name && (
                                                        <div className="text-danger form-text mt-0">
                                                            {errorText.name}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mb-2">
                                                    <label className="form-label">
                                                        Email address
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        value={formData.email}
                                                        onChange={(e) => {
                                                            e.preventDefault();
                                                            setFormData(
                                                                (prev) => {
                                                                    prev.email =
                                                                        e.target.value;
                                                                    return {
                                                                        ...prev,
                                                                    };
                                                                }
                                                            );
                                                        }}
                                                    ></input>
                                                    {errorText.email && (
                                                        <div className="text-danger form-text mt-0">
                                                            {errorText.email}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* <div id="emailHelp" className="form-text">
                                We'll never share your email with anyone else.
                            </div> */}
                                                <div className="mb-2">
                                                    <label className="form-label">
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        value={
                                                            formData.password
                                                        }
                                                        onChange={(e) => {
                                                            e.preventDefault();
                                                            setFormData(
                                                                (prev) => {
                                                                    prev.password =
                                                                        e.target.value;
                                                                    return {
                                                                        ...prev,
                                                                    };
                                                                }
                                                            );
                                                        }}
                                                    ></input>
                                                    {errorText.password && (
                                                        <div className="text-danger form-text mt-0">
                                                            {errorText.password}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Confirm Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        value={
                                                            formData.confirm_password
                                                        }
                                                        onChange={(e) => {
                                                            e.preventDefault();
                                                            setFormData(
                                                                (prev) => {
                                                                    prev.confirm_password =
                                                                        e.target.value;
                                                                    return {
                                                                        ...prev,
                                                                    };
                                                                }
                                                            );
                                                        }}
                                                    ></input>
                                                    {errorText.confirm_password && (
                                                        <div className="text-danger form-text mt-0">
                                                            {
                                                                errorText.confirm_password
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                                {/* <div>
                                        Do you have an account?{" "}
                                        <a href="">sign in here</a>
                                    </div> */}
                                            </div>
                                        )}
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <Button
                                                type="submit"
                                                variant="primary"
                                                className="float-end"
                                            >
                                                {formSelection === "sign-in"
                                                    ? "Login"
                                                    : "sign up"}
                                            </Button>
                                            <Button
                                                className="me-1 float-end"
                                                variant="danger"
                                                onClick={handleClose}
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </div>

                                    {formSelection === "sign-in" ? (
                                        <div className="w-100 mt-3">
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setErrorText({});
                                                    return showForgotPasswordSendEmail();
                                                }}
                                            >
                                                Forgot password?
                                            </a>
                                            <div>
                                                Don't have an account?{" "}
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setErrorText({});
                                                        return notHaveAccount();
                                                    }}
                                                >
                                                    create new
                                                </a>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>

                                <div className="col-6 h-100">
                                    <img
                                        src="/images/IMG20221212061057.jpg"
                                        style={{
                                            width: "100%",
                                            height: "530px",
                                            objectFit: "cover",
                                            borderRadius: "0 0.4rem 0.4rem 0",
                                        }}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    {/* <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            {formSelection === "sign-in" ? "Login" : "sign up"}
                        </Button>
                    </Modal.Footer> */}
                </form>
            </Modal>
        </>
    );
};

export default AuthModal;
