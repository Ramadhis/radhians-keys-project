import React, { useState, useEffect } from "react";
import Header from "../../layout-partials/Header";
import BlockUi from "../../layout-partials/block-ui/BlockUi";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";

const ResetPassword = ({ token }) => {
    const [handleBlockUi, setHandleBlockUi] = useState(false);
    const { auth, errors } = usePage().props;
    const [formData, setFormData] = useState({
        token: token,
        password: "",
        confirm_password: "",
    });

    const [errorText, setErrorText] = useState({});
    const submit = (e) => {
        e.preventDefault();
        setHandleBlockUi(true);
        Inertia.post("/resetpassword", formData);
    };

    useEffect(() => {
        if (errors) {
            setHandleBlockUi(false);
            setErrorText(errors);
        }
    }, [errors]);

    return (
        <>
            <Header />
            <BlockUi handleShow={handleBlockUi} />
            <div className="mt-4 d-flex justify-content-center">
                <div className="card pt-2 pe-2 ps-2 w-25">
                    <div className="card-body pb-0">
                        <div className="row">
                            <div className="mb-2">
                                <h3>Reset Password</h3>
                            </div>

                            <div className="col-12">
                                <form onSubmit={submit}>
                                    <div className="mb-2">
                                        <label className="form-label">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={formData.password}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                setFormData((prev) => {
                                                    prev.password =
                                                        e.target.value;
                                                    return {
                                                        ...prev,
                                                    };
                                                });
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
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={formData.confirm_password}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                setFormData((prev) => {
                                                    prev.confirm_password =
                                                        e.target.value;
                                                    return {
                                                        ...prev,
                                                    };
                                                });
                                            }}
                                        ></input>
                                        {errorText.confirm_password && (
                                            <div className="text-danger form-text mt-0">
                                                {errorText.confirm_password}
                                            </div>
                                        )}
                                    </div>
                                    <div className="pb-3">
                                        <button
                                            className="btn btn-success w-100 float-end mb-4"
                                            type="submit"
                                        >
                                            Reset Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
