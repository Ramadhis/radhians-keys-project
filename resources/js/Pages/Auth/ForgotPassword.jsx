import React, { useEffect, useState } from "react";
import BlockUi from "../../layout-partials/block-ui/BlockUi";
import { Button, Modal } from "react-bootstrap";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";

const ForgotPassword = ({
    handleForgotPasswordModal,
    hideForgotPasswordModal,
}) => {
    const { auth, session, errors } = usePage().props;
    const [handleBlockUi, setHandleBlockUi] = useState(false);
    const [errorText, setErrorText] = useState({});
    const [formData, setFormData] = useState({
        email: "",
    });
    const handleClose = () => {
        setErrorText({});
        return hideForgotPasswordModal();
    };

    useEffect(() => {
        if (handleForgotPasswordModal) {
            if (session.forgotpassword) {
                setHandleBlockUi(false);
                console.log(session.forgotpassword);
            }

            if (errors) {
                setHandleBlockUi(false);
                setErrorText(errors);
            }
        }
    }, [session, errors]);

    const submit = (e) => {
        e.preventDefault();
        setHandleBlockUi(true);
        Inertia.post("/submitforgotpassword", formData);
        return true;
    };

    return (
        <Modal
            show={handleForgotPasswordModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <BlockUi handleShow={handleBlockUi} />

            <Modal.Header
                className="bg-dark text-white"
                closeButton
                closeVariant="white"
            >
                <Modal.Title>Reset my password</Modal.Title>
            </Modal.Header>
            <form onSubmit={submit}>
                <Modal.Body>
                    <div>
                        <div className="mb-3">
                            <label className="form-label">
                                My Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                value={formData.email}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setFormData((prev) => {
                                        prev.email = e.target.value;
                                        return {
                                            ...prev,
                                        };
                                    });
                                }}
                                required
                            ></input>
                            {session.forgotpassword && (
                                <div
                                    class="alert alert-success mt-1"
                                    role="alert"
                                >
                                    {session.forgotpassword}
                                </div>
                            )}
                            {errorText.email && (
                                <div className="text-danger form-text mt-1">
                                    {errorText.email}
                                </div>
                            )}
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary">
                        Send password reset link
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default ForgotPassword;
