import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const loginModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submit = () => {
        e.preventDefault();
        // console.log("success");
    };

    return (
        <>
            <Button variant="primary btn-sm" onClick={handleShow}>
                Login
            </Button>

            <Modal show={show} onHide={handleClose}>
                <form onSubmit={submit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            ></input>
                            <div id="emailHelp" className="form-text">
                                We'll never share your email with anyone else.
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                ></input>
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
                                ></input>
                                <label className="form-check-label">
                                    Check me out
                                </label>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            onClick={handleClose}
                        >
                            Login
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default loginModal;
