import React, { useState, useEffect } from "react";
import BlockUi from "../../layout-partials/block-ui/BlockUi";
import { Button, Modal } from "react-bootstrap";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";

const ChangePassword = ({
    handleChangePasswordModal,
    hideChangePasswordModal,
}) => {
    const { auth, session, errors } = usePage().props;
    const [handleBlockUi, setHandleBlockUi] = useState(false);
    const [errorText, setErrorText] = useState({});
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleClose = () => {
        setFormData({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        });
        setErrorText({});
        return hideChangePasswordModal();
    };

    useEffect(() => {
        if (handleChangePasswordModal) {
            if (session.forgotpassword) {
                setHandleBlockUi(false);
                // console.log(session.forgotpassword);
            }

            if (errors) {
                setHandleBlockUi(false);
                setErrorText(errors);
            }

            if (session.success) {
                setHandleBlockUi(false);
                setErrorText({});
                handleClose();
            }
        }
    }, [session, errors]);

    const submit = (e) => {
        e.preventDefault();
        setHandleBlockUi(true);
        Inertia.post("/change-password", formData);
        return true;
    };

    return (
        <>
            <Modal
                show={handleChangePasswordModal}
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
                    <Modal.Title>Change my password</Modal.Title>
                </Modal.Header>
                <form onSubmit={submit}>
                    <Modal.Body>
                        <div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={formData.currentPassword}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setFormData((prev) => {
                                            prev.currentPassword =
                                                e.target.value;
                                            return {
                                                ...prev,
                                            };
                                        });
                                    }}
                                    required
                                ></input>
                                {errorText.currentPassword && (
                                    <div className="text-danger form-text mt-1">
                                        {errorText.currentPassword}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={formData.newPassword}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setFormData((prev) => {
                                            prev.newPassword = e.target.value;
                                            return {
                                                ...prev,
                                            };
                                        });
                                    }}
                                    required
                                ></input>
                                {errorText.newPassword && (
                                    <div className="text-danger form-text mt-1">
                                        {errorText.newPassword}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={formData.confirmNewPassword}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setFormData((prev) => {
                                            prev.confirmNewPassword =
                                                e.target.value;
                                            return {
                                                ...prev,
                                            };
                                        });
                                    }}
                                    required
                                ></input>
                                {errorText.confirmNewPassword && (
                                    <div className="text-danger form-text mt-1">
                                        {errorText.confirmNewPassword}
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
                            Change password
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default ChangePassword;
