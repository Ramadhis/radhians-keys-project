import React from "react";

const BlockUi = ({ handleShow }) => {
    return (
        <>
            <div
                className={`d-flex justify-content-center w-100 ${
                    handleShow ? "d-block" : "d-none"
                }`}
                style={{
                    zIndex: "1000",
                    position: "absolute",
                    minHeight: "100%",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        background: "#000",
                        opacity: "0.6",
                        zIndex: "1001",
                        width: "100%",
                        minHeight: "100%",
                    }}
                ></div>
                <div
                    className="spinner-border me-2 text-white align-self-center"
                    role="status"
                    style={{
                        position: "absolute",
                        width: "2.5rem",
                        height: "2.5rem",
                        zIndex: "1002",
                    }}
                ></div>
            </div>
        </>
    );
};

export default BlockUi;
