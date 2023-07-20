import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./styleModal.css";

const OnKeyPressInputModal = ({
    handleModal,
    hadleCloseModal,
    setOnKeysPressCode,
}) => {
    const [keysPressList, setKeysPressList] = useState([
        {
            name: "F1",
            keyPressCode: "F1",
        },
        {
            name: "F2",
            keyPressCode: "F2",
        },
        {
            name: "F3",
            keyPressCode: "F3",
        },
        {
            name: "F4",
            keyPressCode: "F4",
        },
        {
            name: "F5",
            keyPressCode: "F5",
        },
        {
            name: "F6",
            keyPressCode: "F6",
        },
        {
            name: "F7",
            keyPressCode: "F7",
        },
        {
            name: "F8",
            keyPressCode: "F8",
        },
        {
            name: "F9",
            keyPressCode: "F9",
        },
        {
            name: "F10",
            keyPressCode: "F10",
        },
        {
            name: "F11",
            keyPressCode: "F11",
        },
        {
            name: "F12",
            keyPressCode: "F12",
        },
        //
        {
            name: "`~",
            keyPressCode: "Backquote",
        },
        {
            name: "1!",
            keyPressCode: "Digit1",
        },
        {
            name: "2@",
            keyPressCode: "Digit2",
        },
        {
            name: "3#",
            keyPressCode: "Digit3",
        },
        {
            name: "4$",
            keyPressCode: "Digit4",
        },
        {
            name: "5%",
            keyPressCode: "Digit5",
        },
        {
            name: "6^",
            keyPressCode: "Digit6",
        },
        {
            name: "7&",
            keyPressCode: "Digit7",
        },
        {
            name: "8*",
            keyPressCode: "Digit8",
        },
        {
            name: "9(",
            keyPressCode: "Digit9",
        },
        {
            name: "0)",
            keyPressCode: "Digit0",
        },
        {
            name: "Q",
            keyPressCode: "KeyQ",
        },
        {
            name: "W",
            keyPressCode: "KeyW",
        },
        {
            name: "E",
            keyPressCode: "KeyE",
        },
        {
            name: "R",
            keyPressCode: "KeyR",
        },
        {
            name: "T",
            keyPressCode: "KeyT",
        },
        {
            name: "Y",
            keyPressCode: "KeyY",
        },
        {
            name: "U",
            keyPressCode: "KeyU",
        },
        {
            name: "I",
            keyPressCode: "KeyI",
        },
        {
            name: "O",
            keyPressCode: "KeyO",
        },
        {
            name: "P",
            keyPressCode: "KeyP",
        },
        //
        {
            name: "A",
            keyPressCode: "KeyA",
        },
        {
            name: "S",
            keyPressCode: "KeyS",
        },
        {
            name: "D",
            keyPressCode: "KeyD",
        },
        {
            name: "F",
            keyPressCode: "KeyF",
        },
        {
            name: "G",
            keyPressCode: "KeyG",
        },
        {
            name: "H",
            keyPressCode: "KeyH",
        },
        {
            name: "J",
            keyPressCode: "KeyJ",
        },
        {
            name: "K",
            keyPressCode: "KeyK",
        },
        {
            name: "L",
            keyPressCode: "KeyL",
        },
        //
        {
            name: "Z",
            keyPressCode: "KeyZ",
        },
        {
            name: "X",
            keyPressCode: "KeyX",
        },
        {
            name: "C",
            keyPressCode: "KeyC",
        },
        {
            name: "V",
            keyPressCode: "KeyV",
        },
        {
            name: "B",
            keyPressCode: "KeyB",
        },
        {
            name: "N",
            keyPressCode: "KeyN",
        },
        {
            name: "M",
            keyPressCode: "KeyM",
        },
        //
        {
            name: "Esc",
            keyPressCode: "Escape",
        },
        {
            name: "Left Crtl",
            keyPressCode: "ControlLeft",
        },
        {
            name: "Right Ctrl",
            keyPressCode: "ControlRight",
        },
        {
            name: "OS / Win",
            keyPressCode: "MetaLeft",
        },
        {
            name: "Left Alt",
            keyPressCode: "AltLeft",
        },
        {
            name: "Right Alt",
            keyPressCode: "AltRight",
        },
        {
            name: "Space",
            keyPressCode: "SpaceSpace",
        },
        {
            name: "Menu",
            keyPressCode: "ContextMenu",
        },
        {
            name: "Arrow Up",
            keyPressCode: "ArrowUp",
        },
        {
            name: "Arrow Down",
            keyPressCode: "ArrowDown",
        },
        {
            name: "Arrow Left",
            keyPressCode: "ArrowLeft",
        },
        {
            name: "Arrow Right",
            keyPressCode: "ArrowRight",
        },
        {
            name: "Insert",
            keyPressCode: "Insert",
        },
        {
            name: "Home",
            keyPressCode: "Home",
        },
        {
            name: "Page Up",
            keyPressCode: "PageUp",
        },
        {
            name: "Page Down",
            keyPressCode: "PageDown",
        },
        {
            name: "Delete",
            keyPressCode: "Delete",
        },
        {
            name: "End",
            keyPressCode: "End",
        },
        {
            name: "PrintScreen",
            keyPressCode: "PrintScreen",
        },
        {
            name: "ScrollLock",
            keyPressCode: "ScrollLock",
        },
        {
            name: "Pause",
            keyPressCode: "Pause",
        },
    ]);

    const handleClose = () => hadleCloseModal(false);
    // const handleShow = () => setShow(true);

    //state pressed code radio button
    const [pressedCode, setPressedCode] = useState("");

    //apply set pressed Code
    const applyPressedCode = () => {
        console.log("applied press code", pressedCode);
        setOnKeysPressCode(pressedCode);
        //reset modal state pressedCode
        setPressedCode("");
        return handleClose();
    };

    return (
        <>
            <Modal
                size="lg"
                show={handleModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header
                    className="bg-dark text-white"
                    closeButton
                    closeVariant="white"
                >
                    <div className="h5">On key Pressed List Key</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="w-100 mb-1">
                        <input
                            type="text"
                            className="form-control w-25"
                            placeholder="Search key..."
                        />
                    </div>
                    <div className="form-text mb-1">
                        Select one for key press
                    </div>
                    <div
                        className="w-100"
                        style={{
                            maxHeight: "400px",
                            overflowY: "auto",
                            scrollbarWidth: "thin",
                            scrollbarColor: "#0d6efd #e0e0e0",
                        }}
                    >
                        <div
                            className="w-100 radio-group"
                            onChange={(e) => {
                                console.log(e.target.value);
                                return setPressedCode(e.target.value);
                            }}
                        >
                            {/* for disabled key press */}
                            <label className="p-1 lable-key-press inline-block">
                                <input
                                    className="form-check-input radio-none"
                                    value={""}
                                    type="radio"
                                    name="keyPress"
                                />
                                <div className="key-press-input">
                                    <div className="h-100 d-flex align-items-center justify-content-center">
                                        Disabled
                                    </div>
                                </div>
                            </label>
                            {/* end for disabled key press */}

                            {keysPressList.map((val, index) => {
                                return (
                                    <label
                                        className="p-1 lable-key-press inline-block"
                                        key={index}
                                    >
                                        <input
                                            className="form-check-input radio-none"
                                            value={val.keyPressCode}
                                            type="radio"
                                            name="keyPress"
                                        />
                                        <div className="key-press-input">
                                            <div className="h-100 d-flex align-items-center justify-content-center">
                                                {val.name}
                                            </div>
                                        </div>
                                    </label>
                                );
                            })}

                            {/* <label className="p-1 lable-key-press inline-block">
              <input className="form-check-input radio-none" value={"KeyA"} type="radio" name="keyPress" />
              <div className="key-press-input">
                <div className="h-100 d-flex align-items-center justify-content-center">A</div>
              </div>
            </label>
            <label className="p-1 lable-key-press inline-block">
              <input className="form-check-input radio-none" value={"PrintScreen"} type="radio" name="keyPress" />
              <div className="key-press-input">
                <div className="h-100 d-flex align-items-center justify-content-center">Print Screen</div>
              </div>
            </label>
            <label className="p-1 lable-key-press inline-block">
              <input className="form-check-input radio-none" value={"Delete"} type="radio" name="keyPress" />
              <div className="key-press-input">
                <div className="h-100 d-flex align-items-center justify-content-center">Delete</div>
              </div>
            </label> */}
                        </div>
                    </div>
                </Modal.Body>
                <div className="w-100">
                    <div
                        className="btn btn-primary float-end me-2 my-2"
                        onClick={applyPressedCode}
                    >
                        Apply
                    </div>
                    <div
                        className="btn btn-danger float-end mx-1 my-2"
                        onClick={handleClose}
                    >
                        Cancel
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default OnKeyPressInputModal;
