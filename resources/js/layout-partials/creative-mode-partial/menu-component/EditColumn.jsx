import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import "../../../Pages/creative-mode/creativeMode.css";
import OnKeyPressInputModal from "../modal/OnKeyPressInputModal";

const EditColumn = ({
    formEdit,
    updateKeys,
    menuEditPos,
    setMenuEditPosFunc,
}) => {
    const [formData, setFormData] = useState({
        id: "",
        type: "",
        keyWidth: "",
        legend: "",
        styleCode: "",
        keyPressCode: "",
    });
    const nodeRef = useRef(null);
    const applyStatus = useRef(null);
    const [showModalKeyPress, setShowModalKeyPress] = useState(false);

    const hadleCloseModal = () => {
        setShowModalKeyPress(false);
    };

    useEffect(() => {
        //set form edit
        if (formEdit) {
            setFormData(formEdit);

            //reset status apply (Apply success !)
            applyStatus.current.classList.add("d-none");
            //end reset status apply (Apply success !)
        }
    }, [formEdit]);

    const applyEdit = (e) => {
        e.preventDefault();
        if (formData) {
            // console.log(formData);

            //for status apply (Apply success !)
            applyStatus.current.classList.remove("d-none");
            applyStatus.current.innerHTML = "Apply success !";
            applyStatus.current.classList.remove("text-danger");
            applyStatus.current.classList.add("text-success");
            setTimeout(() => {
                applyStatus.current.classList.add("d-none");
            }, 2000);
            //for status apply

            return updateKeys(formData);
        }

        return;
    };

    const onKeysUp = () => {
        applyStatus.current.classList.remove("d-none");
        applyStatus.current.classList.add("text-danger");
        applyStatus.current.innerHTML = "Apply to save change!";
    };

    //for form OnKeyPressInputModal
    const setOnKeysPressCode = (val) => {
        // console.log("value", val);
        setFormData((prev) => {
            return { ...prev, keyPressCode: val };
        });
        applyStatus.current.classList.remove("d-none");
        applyStatus.current.classList.add("text-danger");
        applyStatus.current.innerHTML = "Apply to save change!";
    };
    //end for form OnKeyPressInputModal

    //get max width(X) and height(Y)
    let width = window.screen.availWidth;
    let height = window.screen.availHeight;

    const dragStop = (e, dragElement) => {
        // console.log(`x: ${dragElement.x} y:${dragElement.y} `);
        setMenuEditPosFunc(dragElement.x, dragElement.y);
        return true;
    };

    return (
        <>
            <Draggable
                nodeRef={nodeRef}
                handle=".handle"
                onStop={dragStop}
                position={
                    menuEditPos == null
                        ? { x: width - 530, y: height - 430 }
                        : menuEditPos
                }
            >
                <div
                    ref={nodeRef}
                    className="card position-fixed"
                    style={{ width: "250px", height: "300px", zIndex: "100" }}
                >
                    <div className="card-header g-0 p-1 ps-2 handle bg-dark text-white">
                        Edit column menu
                        {/* <button className="btn btn-sm btn-info float-end text-white">
                    <i className="bi bi-caret-down-fill"></i>
                  </button> */}
                        <i className="bi bi-arrows-move d-inline float-end pe-1"></i>
                    </div>
                    {formEdit ? (
                        <div className="card-body p-1 ps-2">
                            <form onSubmit={applyEdit}>
                                {formEdit ? (
                                    formEdit["type"] !== undefined ? (
                                        <span className="badge bg-success d-inline">
                                            Custom Keys
                                        </span>
                                    ) : (
                                        <span className="badge bg-primary d-inline">
                                            Standar keys
                                        </span>
                                    )
                                ) : null}
                                {formEdit.type != "emptyspace" ? (
                                    <>
                                        <div className="mb-1">
                                            <label className="form-text">
                                                Keys Legend (max 10 character)
                                            </label>
                                            <input
                                                type="legend"
                                                value={
                                                    formData
                                                        ? formData.legend
                                                        : null
                                                }
                                                onChange={(e) => {
                                                    return setFormData(
                                                        (prev) => {
                                                            prev.legend =
                                                                e.target.value;
                                                            return { ...prev };
                                                        }
                                                    );
                                                }}
                                                maxLength="10"
                                                // onKeyUp={onKeysUp}
                                                className="form-control form-control-sm"
                                            />
                                        </div>
                                        <div className="mb-1">
                                            <label className="form-text">
                                                On Key pressed
                                            </label>
                                            <input
                                                type="onkeypress"
                                                value={
                                                    formData
                                                        ? formData.keyPressCode
                                                        : null
                                                }
                                                onChange={(e) => {
                                                    return setFormData(
                                                        (prev) => {
                                                            prev.keyPressCode =
                                                                e.target.value;
                                                            return { ...prev };
                                                        }
                                                    );
                                                }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    return setShowModalKeyPress(
                                                        true
                                                    );
                                                }}
                                                className="form-control form-control-sm"
                                                readOnly
                                            />
                                        </div>
                                    </>
                                ) : null}

                                {"type" in formEdit ? (
                                    <div className="mb-1">
                                        <label className="form-text">
                                            Width (px)
                                        </label>
                                        <input
                                            type="number"
                                            pattern="[0-9]*"
                                            min="10"
                                            max="1000"
                                            value={
                                                formData
                                                    ? formData.keyWidth
                                                    : null
                                            }
                                            maxLength="3"
                                            onChange={(e) => {
                                                return setFormData((prev) => {
                                                    prev.keyWidth =
                                                        e.target.value;
                                                    return { ...prev };
                                                });
                                            }}
                                            className="form-control form-control-sm"
                                        />
                                    </div>
                                ) : null}

                                <div
                                    ref={(e) => {
                                        applyStatus.current = e;
                                    }}
                                    style={{ fontSize: "14px" }}
                                    className="float-right w-50 d-inline fw-bold h6 d-none"
                                >
                                    Apply success !
                                </div>

                                <div className="float-right w-50 d-inline">
                                    <button
                                        type="submit"
                                        className="btn btn-sm float-right btn-primary mt-1 mb-1"
                                        style={{ float: "right" }}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="card-body p-1 ps-2">
                            <div className="form-text">click keys to edit</div>
                        </div>
                    )}
                </div>
            </Draggable>
            {/* modal set on key press */}
            <OnKeyPressInputModal
                setOnKeysPressCode={setOnKeysPressCode}
                handleModal={showModalKeyPress}
                hadleCloseModal={hadleCloseModal}
            />
        </>
    );
};

export default EditColumn;
