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
            keyword: "f1,F1",
            keyPressCode: "F1",
        },
        {
            name: "F2",
            keyword: "f2,F2",
            keyPressCode: "F2",
        },
        {
            name: "F3",
            keyword: "f3,F3",
            keyPressCode: "F3",
        },
        {
            name: "F4",
            keyword: "f4,F4",
            keyPressCode: "F4",
        },
        {
            name: "F5",
            keyword: "f5,F5",
            keyPressCode: "F5",
        },
        {
            name: "F6",
            keyword: "f6,F6",
            keyPressCode: "F6",
        },
        {
            name: "F7",
            keyword: "f7,F7",
            keyPressCode: "F7",
        },
        {
            name: "F8",
            keyword: "f8,F8",
            keyPressCode: "F8",
        },
        {
            name: "F9",
            keyword: "f9,F9",
            keyPressCode: "F9",
        },
        {
            name: "F10",
            keyword: "f10,F10",
            keyPressCode: "F10",
        },
        {
            name: "F11",
            keyword: "f11,F11",
            keyPressCode: "F11",
        },
        {
            name: "F12",
            keyword: "f12,F12",
            keyPressCode: "F12",
        },
        //
        {
            name: "`~",
            keyword: "backquote,~,`",
            keyPressCode: "Backquote",
        },
        {
            name: "1!",
            keyword: "1,!",
            keyPressCode: "Digit1",
        },
        {
            name: "2@",
            keyword: "2,@",
            keyPressCode: "Digit2",
        },
        {
            name: "3#",
            keyword: "3,#",
            keyPressCode: "Digit3",
        },
        {
            name: "4$",
            keyword: "4,$",
            keyPressCode: "Digit4",
        },
        {
            name: "5%",
            keyword: "5,%",
            keyPressCode: "Digit5",
        },
        {
            name: "6^",
            keyword: "6,^",
            keyPressCode: "Digit6",
        },
        {
            name: "7&",
            keyword: "7,&",
            keyPressCode: "Digit7",
        },
        {
            name: "8*",
            keyword: "8,*",
            keyPressCode: "Digit8",
        },
        {
            name: "9(",
            keyword: "9,(",
            keyPressCode: "Digit9",
        },
        {
            name: "0)",
            keyword: "0,)",
            keyPressCode: "Digit0",
        },
        //
        {
            name: "Tab",
            keyword: "tab,Tab",
            keyPressCode: "Tab",
        },

        {
            name: "Q",
            keyword: "q,Q",
            keyPressCode: "KeyQ",
        },
        {
            name: "W",
            keyword: "w,W",
            keyPressCode: "KeyW",
        },
        {
            name: "E",
            keyword: "e,E",
            keyPressCode: "KeyE",
        },
        {
            name: "R",
            keyword: "r,R",
            keyPressCode: "KeyR",
        },
        {
            name: "T",
            keyword: "t,T",
            keyPressCode: "KeyT",
        },
        {
            name: "Y",
            keyword: "y,Y",
            keyPressCode: "KeyY",
        },
        {
            name: "U",
            keyword: "u,U",
            keyPressCode: "KeyU",
        },
        {
            name: "I",
            keyword: "i,I",
            keyPressCode: "KeyI",
        },
        {
            name: "O",
            keyword: "o,O",
            keyPressCode: "KeyO",
        },
        {
            name: "P",
            keyword: "p,P",
            keyPressCode: "KeyP",
        },
        //
        {
            name: "A",
            keyword: "a,A",
            keyPressCode: "KeyA",
        },
        {
            name: "S",
            keyword: "s,S",
            keyPressCode: "KeyS",
        },
        {
            name: "D",
            keyword: "d,D",
            keyPressCode: "KeyD",
        },
        {
            name: "F",
            keyword: "f,F",
            keyPressCode: "KeyF",
        },
        {
            name: "G",
            keyword: "g,G",
            keyPressCode: "KeyG",
        },
        {
            name: "H",
            keyword: "h,H",
            keyPressCode: "KeyH",
        },
        {
            name: "J",
            keyword: "j,J",
            keyPressCode: "KeyJ",
        },
        {
            name: "K",
            keyword: "k,K",
            keyPressCode: "KeyK",
        },
        {
            name: "L",
            keyword: "l,L",
            keyPressCode: "KeyL",
        },
        {
            name: ";:",
            keyword: ":,;,semicolon",
            keyPressCode: "Semicolon",
        },
        {
            name: `' "`,
            keyword: `',",wuote`,
            keyPressCode: "Quote",
        },
        {
            name: "Enter",
            keyword: "enter,Enter",
            keyPressCode: "Enter",
        },

        //
        {
            name: "left shift",
            keyword: "shift,left shift",
            keyPressCode: "ShiftLeft",
        },
        {
            name: "Z",
            keyword: "z,Z",
            keyPressCode: "KeyZ",
        },
        {
            name: "X",
            keyword: "x,X",
            keyPressCode: "KeyX",
        },
        {
            name: "C",
            keyword: "c,C",
            keyPressCode: "KeyC",
        },
        {
            name: "V",
            keyword: "v,V",
            keyPressCode: "KeyV",
        },
        {
            name: "B",
            keyword: "b,B",
            keyPressCode: "KeyB",
        },
        {
            name: "N",
            keyword: "n,N",
            keyPressCode: "KeyN",
        },
        {
            name: "M",
            keyword: "m,M",
            keyPressCode: "KeyM",
        },
        {
            name: ",<",
            keyword: ",<,comma,koma",
            keyPressCode: "Comma",
        },
        {
            name: ".>",
            keyword: ".,>,period",
            keyPressCode: "Period",
        },
        {
            name: "/?",
            keyword: "m,M",
            keyPressCode: "KeyM",
        },
        {
            name: "Right Shift",
            keyword: "shift,right shift",
            keyPressCode: "ShiftRight",
        },
        //
        {
            name: "Esc",
            keyword: "esc,escape,Escape",
            keyPressCode: "Escape",
        },
        {
            name: "Left Crtl",
            keyword: "control,left",
            keyPressCode: "ControlLeft",
        },
        {
            name: "Right Ctrl",
            keyword: "control,right",
            keyPressCode: "ControlRight",
        },
        {
            name: "OS / Win",
            keyword: "windows,window,os",
            keyPressCode: "MetaLeft",
        },
        {
            name: "Left Alt",
            keyword: "alt,left,Alt,Left",
            keyPressCode: "AltLeft",
        },
        {
            name: "Right Alt",
            keyword: "right,alt,Right,Left",
            keyPressCode: "AltRight",
        },
        {
            name: "Space",
            keyword: "space,Space",
            keyPressCode: "SpaceSpace",
        },
        {
            name: "Menu",
            keyword: "contextMenu,menu",
            keyPressCode: "ContextMenu",
        },
        {
            name: "Arrow Up",
            keyword: "arrow,up",
            keyPressCode: "ArrowUp",
        },
        {
            name: "Arrow Down",
            keyword: "arrow,down",
            keyPressCode: "ArrowDown",
        },
        {
            name: "Arrow Left",
            keyword: "arrow,left",
            keyPressCode: "ArrowLeft",
        },
        {
            name: "Arrow Right",
            keyword: "arrow,right",
            keyPressCode: "ArrowRight",
        },
        {
            name: "Insert",
            keyword: "insert,Insert",
            keyPressCode: "Insert",
        },
        {
            name: "Home",
            keyword: "home,Home",
            keyPressCode: "Home",
        },
        {
            name: "Page Up",
            keyword: "page up",
            keyPressCode: "PageUp",
        },
        {
            name: "Page Down",
            keyword: "page down",
            keyPressCode: "PageDown",
        },
        {
            name: "Delete",
            keyword: "delete",
            keyPressCode: "Delete",
        },
        {
            name: "End",
            keyword: "end",
            keyPressCode: "End",
        },
        {
            name: "PrintScreen",
            keyword: "printscreen",
            keyPressCode: "PrintScreen",
        },
        {
            name: "ScrollLock",
            keyword: "scrolldown",
            keyPressCode: "ScrollLock",
        },
        {
            name: "Pause",
            keyword: "pause",
            keyPressCode: "Pause",
        },
        //numpad
        {
            name: "NumLock",
            keyword: "numlock,num lock",
            keyPressCode: "NumLock",
        },
        {
            name: "/ numpad",
            keyword: " /,numpad,numpaddivide",
            keyPressCode: "NumpadDivide",
        },
        {
            name: "* numpad",
            keyword: "numpadmultiply,*",
            keyPressCode: "NumpadMultiply",
        },
        {
            name: "- numpad",
            keyword: "numpadsubtract,numpad,-",
            keyPressCode: "NumpadSubtract",
        },
        {
            name: "7 numpad",
            keyword: "numpad,7,numpad7",
            keyPressCode: "Numpad7",
        },
        {
            name: "8 numpad",
            keyword: "numpad,8,numpad8",
            keyPressCode: "Numpad8",
        },
        {
            name: "9 numpad",
            keyword: "numpad,9,numpad9",
            keyPressCode: "Numpad9",
        },
        {
            name: "4 numpad",
            keyword: "numpad,4,numpad4",
            keyPressCode: "Numpad4",
        },
        {
            name: "5 numpad",
            keyword: "numpad,5,numpad5",
            keyPressCode: "Numpad5",
        },
        {
            name: "6 numpad",
            keyword: "numpad,6,numpad6",
            keyPressCode: "Numpad6",
        },
        {
            name: "1 numpad",
            keyword: "numpad,1,numpad1",
            keyPressCode: "Numpad1",
        },
        {
            name: "2 numpad",
            keyword: "numpad,2,numpad2",
            keyPressCode: "Numpad2",
        },
        {
            name: "3 numpad",
            keyword: "numpad3,numpad3",
            keyPressCode: "Numpad3",
        },
        {
            name: "0 numpad",
            keyword: "numpad,0,numpad0",
            keyPressCode: "Numpad0",
        },
        {
            name: ". del numpad",
            keyword: "numpad,.,del",
            keyPressCode: "NumpadDecimal",
        },
        {
            name: "+ numpad",
            keyword: "+,plus,add",
            keyPressCode: "NumpadAdd",
        },
        {
            name: "enter numpad",
            keyword: "enter numpad,enternumpad",
            keyPressCode: "NumpadEnter",
        },
    ]);

    const [inputSearchKeyPress, setInputSearchKeyPreess] = useState("");
    const [listCollectKey, setListCollectKey] = useState(keysPressList);

    const handleClose = () => {
        setInputSearchKeyPreess("");
        setListCollectKey(keysPressList);
        hadleCloseModal(false);
    };
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

    const searchKeysPressList = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        const collectKey = [];
        keysPressList.find((val) => {
            if (val.keyword.indexOf(e.target.value) > -1) {
                collectKey.push(val);
            }
        });
        setListCollectKey(collectKey);
        console.log(collectKey);
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
                            value={inputSearchKeyPress}
                            onChange={(e) => {
                                searchKeysPressList(e);
                                setInputSearchKeyPreess(e.target.value);
                            }}
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

                            {listCollectKey.map((val, index) => {
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
