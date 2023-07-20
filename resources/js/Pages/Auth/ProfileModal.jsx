import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import BlockUi from "../../layout-partials/block-ui/BlockUi";

const ProfileModal = ({
    handleProfileModal,
    hideProfileModal,
    showChangePasswordModal,
}) => {
    const [handleBlockUi, setHandleBlockUi] = useState(false);
    const [errorText, setErrorText] = useState({});

    const { auth, session, errors } = usePage().props;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    const handleClose = () => {
        return hideProfileModal();
    };

    const submitEdit = (e) => {
        e.preventDefault();
        setHandleBlockUi(true);
        Inertia.post("/update-user", formData);
    };

    const ChangePasswordModal = () => {
        hideProfileModal();
        setTimeout(() => {
            showChangePasswordModal();
        }, 300);
        return true;
    };

    useEffect(() => {
        if (auth.user) {
            setFormData((prev) => {
                return {
                    ...prev,
                    name: auth.user.name,
                    email: auth.user.email,
                };
            });
        }
    }, [auth]);

    useEffect(() => {
        if (handleProfileModal) {
            if (session.success) {
                handleClose();
                setHandleBlockUi(false);
            }

            if (errors) {
                setHandleBlockUi(false);
                setErrorText(errors);
            }
        }
    }, [session, errors]);

    return (
        <>
            <Modal show={handleProfileModal} onHide={handleClose}>
                <BlockUi handleShow={handleBlockUi} />

                <Modal.Header
                    className="bg-dark text-white"
                    closeButton
                    closeVariant="white"
                >
                    <Modal.Title>Account Info</Modal.Title>
                </Modal.Header>
                <form onSubmit={submitEdit}>
                    <Modal.Body>
                        <div>
                            <div className="mb-3">
                                <label className="form-label">My Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setFormData((prev) => {
                                            prev.name = e.target.value;
                                            return {
                                                ...prev,
                                            };
                                        });
                                    }}
                                    required
                                ></input>
                                {errorText.name && (
                                    <div className="text-danger form-text mt-0">
                                        {errorText.name}
                                    </div>
                                )}
                            </div>
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
                                {errorText.email && (
                                    <div className="text-danger form-text mt-0">
                                        {errorText.email}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    return ChangePasswordModal();
                                }}
                                className="btn btn-danger btn-sm float-start"
                            >
                                you want change password ?
                            </button>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Save changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default ProfileModal;
