import React, { useEffect, useState, useCallback, useRef } from "react";
import { v4 } from "uuid";
import Keys from "../../layout-partials/keycaps/keys";
import Header from "../../layout-partials/Header";
// import "./../../style.css";
import "../keyboard-tes/keyboardTes.css";
import "bootstrap-icons/font/bootstrap-icons.css";
//import inertia adapter
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { createFileName, useScreenshot } from "use-react-screenshot";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Helmet, HelmetProvider } from "react-helmet-async";

const keyboardTes = ({ layoutData }) => {
    const [pressed, setPressed] = useState();
    const [collect, setCollect] = useState();
    const [statusChangeLayout, setStatusChangeLayout] = useState(false);
    const [stateLayout, setStateLayout] = useState(null);

    //template empty layout
    let layoutEmpty = {
        keyDownBorder: "",
        keyDownBackground: "",
        fontSize: "",
        row: [],
    };

    // let layout87 = {
    //     keyDownBorder: " 1px solid blue ",
    //     keyDownBackground: "lightskyblue",
    //     fontSize: "13px",
    //     row: [
    //         {
    //             id: v4(),
    //             column: [
    //                 {
    //                     id: v4(),
    //                     legend: "Esc",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Escape",
    //                 },
    //                 {
    //                     id: v4(),
    //                     type: "emptyspace",
    //                     keyWidth: "33",
    //                     legend: "",
    //                     styleCode: "",
    //                     keyPressCode: "",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "F1",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "F1",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "F2",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "F2",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "F3",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "F3",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "F4",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "F4",
    //                 },
    //                 {
    //                     id: v4(),
    //                     type: "emptyspace",
    //                     keyWidth: "23",
    //                     legend: "",
    //                     styleCode: "",
    //                     keyPressCode: "",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "F5",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "F5",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "F6",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "F6",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "F7",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "F7",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "F8",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "F8",
    //                 },
    //                 {
    //                     id: v4(),
    //                     type: "emptyspace",
    //                     keyWidth: "23",
    //                     legend: "",
    //                     styleCode: "",
    //                     keyPressCode: "",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "F9",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "F9",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "F10",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "F10",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "F11",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "F11",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "F12",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "F12",
    //                 },
    //                 {
    //                     id: v4(),
    //                     type: "emptyspace",
    //                     keyWidth: "5",
    //                     legend: "",
    //                     styleCode: "",
    //                     keyPressCode: "",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "PrtSc",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "PrintScreen",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "ScrLk",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "ScrollLock",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Pause",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Pause",
    //                 },
    //             ],
    //         },
    //         {
    //             id: v4(),
    //             column: [
    //                 {
    //                     id: v4(),
    //                     legend: "`~",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Backquote",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "1!",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit1",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "2@",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit2",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "3#",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit3",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "4$",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit4",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "5%",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit5",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "6^",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit6",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "7&",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit7",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "8*",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit8",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "9(",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit9",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "0)",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit0",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "-_",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Minus",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "=+",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Equal",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Backspace",
    //                     styleCode: "keycaps-90",
    //                     keyPressCode: "Backspace",
    //                 },
    //                 {
    //                     id: v4(),
    //                     type: "emptyspace",
    //                     keyWidth: "5",
    //                     legend: "",
    //                     styleCode: "",
    //                     keyPressCode: "",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Ins",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Insert",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Home",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Home",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "PgUp",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "PageUp",
    //                 },
    //             ],
    //         },
    //         {
    //             id: v4(),
    //             column: [
    //                 {
    //                     id: v4(),
    //                     legend: "Tab",
    //                     styleCode: "keycaps-70",
    //                     keyPressCode: "Tab",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Q",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyQ",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "W",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyW",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "E",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyE",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "R",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyR",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "T",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyT",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Y",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyY",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "U",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyU",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "I",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyI",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "O",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyO",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "P",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyP",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "[{",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "BracketLeft",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "]}",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "BracketRight",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "\\|",
    //                     styleCode: "keycaps-65",
    //                     keyPressCode: "Backslash",
    //                 },
    //                 {
    //                     id: v4(),
    //                     type: "emptyspace",
    //                     keyWidth: "5",
    //                     legend: "",
    //                     styleCode: "",
    //                     keyPressCode: "",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Del",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Delete",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "End",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "End",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "PgDn",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "PageDown",
    //                 },
    //             ],
    //         },
    //         {
    //             id: v4(),
    //             column: [
    //                 {
    //                     id: v4(),
    //                     legend: "Caps",
    //                     styleCode: "keycaps-85",
    //                     keyPressCode: "CapsLock",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "A",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyA",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "S",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyS",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "D",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyD",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "F",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyF",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "G",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyG",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "H",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyH",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "J",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyJ",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "K",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyK",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "L",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyL",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: ";:",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Semicolon",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: `'"`,
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Quote",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "enter",
    //                     styleCode: "keycaps-103",
    //                     keyPressCode: "Enter",
    //                 },
    //             ],
    //         },
    //         {
    //             id: v4(),
    //             column: [
    //                 {
    //                     id: v4(),
    //                     legend: "Shift",
    //                     styleCode: "keycaps-112",
    //                     keyPressCode: "ShiftLeft",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Z",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyZ",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "X",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyX",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "C",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyC",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "V",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyV",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "B",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyB",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "N",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyN",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "M",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyM",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: ",<",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Comma",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: ".>",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Period",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "/?",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Slash",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Shift",
    //                     styleCode: "keycaps-120",
    //                     keyPressCode: "ShiftRight",
    //                 },
    //                 {
    //                     id: v4(),
    //                     type: "emptyspace",
    //                     keyWidth: "60",
    //                     legend: "",
    //                     styleCode: "",
    //                     keyPressCode: "",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Up",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "ArrowUp",
    //                 },
    //             ],
    //         },
    //         {
    //             id: v4(),
    //             column: [
    //                 {
    //                     id: v4(),
    //                     legend: "Ctrl",
    //                     styleCode: "keycaps-57",
    //                     keyPressCode: "ControlLeft",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "OS",
    //                     styleCode: "keycaps-57",
    //                     keyPressCode: "MetaLeft",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Alt",
    //                     styleCode: "keycaps-57",
    //                     keyPressCode: "AltLeft",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Space",
    //                     styleCode: "keycaps-150",
    //                     keyPressCode: "Space",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Alt",
    //                     styleCode: "keycaps-57",
    //                     keyPressCode: "AltRight",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Fn",
    //                     styleCode: "keycaps-57",
    //                     keyPressCode: "",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Menu",
    //                     styleCode: "keycaps-57",
    //                     keyPressCode: "ContextMenu",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Ctrl",
    //                     styleCode: "keycaps-57",
    //                     keyPressCode: "ControlRight",
    //                 },
    //                 {
    //                     id: v4(),
    //                     type: "emptyspace",
    //                     keyWidth: "5",
    //                     legend: "",
    //                     styleCode: "",
    //                     keyPressCode: "",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Lt",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "ArrowLeft",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Dn",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "ArrowDown",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Rg",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "ArrowRight",
    //                 },
    //             ],
    //         },
    //     ],
    // };

    // let layout61 = {
    //     keyDownBorder: " 1px solid blue ",
    //     keyDownBackground: "lightskyblue",
    //     fontSize: "13px",
    //     row: [
    //         {
    //             id: v4(),
    //             column: [
    //                 {
    //                     id: v4(),
    //                     legend: "`~",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Backquote",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "1!",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit1",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "2@",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit2",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "3#",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit3",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "4$",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit4",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "5%",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit5",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "6^",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit6",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "7&",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit7",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "8*",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit8",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "9(",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit9",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "0)",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Digit0",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "-_",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Minus",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "=+",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Equal",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Backspace",
    //                     styleCode: "keycaps-90",
    //                     keyPressCode: "Backspace",
    //                 },
    //             ],
    //         },
    //         {
    //             id: v4(),
    //             column: [
    //                 {
    //                     id: v4(),
    //                     legend: "Tab",
    //                     styleCode: "keycaps-70",
    //                     keyPressCode: "Tab",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Q",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyQ",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "W",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyW",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "E",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyE",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "R",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyR",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "T",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyT",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Y",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyY",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "U",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyU",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "I",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyI",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "O",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyO",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "P",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyP",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "[{",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "BracketLeft",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "]}",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "BracketRight",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "\\|",
    //                     styleCode: "keycaps-65",
    //                     keyPressCode: "Backslash",
    //                 },
    //             ],
    //         },
    //         {
    //             id: v4(),
    //             column: [
    //                 {
    //                     id: v4(),
    //                     legend: "Caps",
    //                     styleCode: "keycaps-85",
    //                     keyPressCode: "CapsLock",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "A",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyA",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "S",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyS",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "D",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyD",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "F",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyF",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "G",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyG",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "H",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyH",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "J",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyJ",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "K",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyK",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "L",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyL",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: ";:",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Semicolon",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: `'"`,
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Quote",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "enter",
    //                     styleCode: "keycaps-103",
    //                     keyPressCode: "Enter",
    //                 },
    //             ],
    //         },
    //         {
    //             id: v4(),
    //             column: [
    //                 {
    //                     id: v4(),
    //                     legend: "Shift",
    //                     styleCode: "keycaps-112",
    //                     keyPressCode: "ShiftLeft",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Z",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyZ",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "X",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyX",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "C",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyC",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "V",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyV",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "B",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyB",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "N",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyN",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "M",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "KeyM",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: ",<",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Comma",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: ".>",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Period",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "/?",
    //                     styleCode: "keycaps-45",
    //                     keyPressCode: "Slash",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Shift",
    //                     styleCode: "keycaps-120",
    //                     keyPressCode: "ShiftRight",
    //                 },
    //             ],
    //         },
    //         {
    //             id: v4(),
    //             column: [
    //                 {
    //                     id: v4(),
    //                     legend: "Ctrl",
    //                     styleCode: "keycaps-57",
    //                     keyPressCode: "ControlLeft",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "OS",
    //                     styleCode: "keycaps-57",
    //                     keyPressCode: "MetaLeft",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Alt",
    //                     styleCode: "keycaps-57",
    //                     keyPressCode: "AltLeft",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Space",
    //                     styleCode: "keycaps-150",
    //                     keyPressCode: "Space",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Alt",
    //                     styleCode: "keycaps-57",
    //                     keyPressCode: "AltRight",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Fn",
    //                     styleCode: "keycaps-57",
    //                     keyPressCode: "",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Menu",
    //                     styleCode: "keycaps-57",
    //                     keyPressCode: "ContextMenu",
    //                 },
    //                 {
    //                     id: v4(),
    //                     legend: "Ctrl",
    //                     styleCode: "keycaps-57",
    //                     keyPressCode: "ControlRight",
    //                 },
    //             ],
    //         },
    //     ],
    // };

    let call = useRef([]);
    // const [keys, setKeys] = useState(
    //     layoutData ? JSON.parse(layoutData.layout_data) : layout87
    // );

    const [keys, setKeys] = useState(JSON.parse(layoutData.layout_data));

    //searchKeyCode is event.code
    const findIndex = (searchKeyCode) => {
        if (keys.row !== undefined) {
            let arrGet = [];
            //loop key row state

            for (let x = 0; x < keys.row.length; x++) {
                if (x >= keys.row.length) {
                    break;
                }

                //loop column in keys state for search keyPressCode == searchKeyCode
                keys.row[x].column.forEach((col, index) => {
                    if (col.keyPressCode == searchKeyCode) {
                        return arrGet.push(`${x}-${index}`);
                    } else if (
                        col.keyPressCode === "MetaLeft" &&
                        searchKeyCode == "OSLeft"
                    ) {
                        //this setting is for firefox
                        //OSLeft is for firefox
                        //MetaLeft is for chrome
                        // if in array colunm = metaleft and pressed key is windows(OSleft for firefox) then return,
                        return arrGet.push(`${x}-${index}`);
                    }
                });
            }
            return arrGet;
        } else {
            return false;
        }
    };

    const keyDownPressed = (event) => {
        // stops its action

        console.log("keydown", event.code);

        switch (event.code) {
            case "Quote":
                event.preventDefault();
                break;
            case "Slash":
                event.preventDefault();
                break;
            case "ContextMenu":
                event.preventDefault();
                break;
            case "Tab":
                event.preventDefault();
                break;
            case "F3":
                event.preventDefault();
                break;
            case "F5":
                event.preventDefault();
                break;
            case "F6":
                event.preventDefault();
                break;
            case "F7":
                event.preventDefault();
                break;
            case "F8":
                event.preventDefault();
                break;
            case "F9":
                event.preventDefault();
                break;
            case "F10":
                event.preventDefault();
                break;
            case "F11":
                event.preventDefault();
                break;
            case "F12":
                event.preventDefault();
                break;
        }

        if (keys.row !== undefined) {
            //find index using event code
            let getIndex = findIndex(event.code);
            console.log("getIndex", getIndex);
            console.log(keys);
            setPressed(event.code);
            // const element2 = (call.current["1-1"].style.border = "1px solid blue");

            //foreach index of ref
            getIndex.forEach((val, index) => {
                // call.current[`${val}`].style.border = keys[0].keyDownBorder;

                call.current[`${val}`].style.background =
                    keys.keyDownBackground;
                call.current[`${val}`].classList.add("keysBg");
                // call.current[`${val}`].style = {
                //   border: "1px solid red",
                // };
            });
            return true;
        } else {
            return false;
        }
    };

    const keyUpPressed = (event) => {
        event.preventDefault();
        // console.log("keyup");

        //find index using event code
        let getIndex = findIndex(event.code);

        //if printscreen pressed, because printscreen not detected in keydown
        if (keys.row !== undefined) {
            if (event.code === "PrintScreen") {
                console.log("print");

                getIndex.forEach((val, index) => {
                    call.current[`${val}`].style.background =
                        keys.keyDownBackground;
                    setTimeout(() => {
                        call.current[`${val}`].classList.add("keysBg");
                    }, 500);
                });
            }
        } else {
            return false;
        }

        //reset
        getIndex.forEach((val, index) => {
            call.current[`${val}`].style.background = null;
            // call.current[`${val}`].style.border = "1px solid black";
        });
    };

    // run keyDownPressed & keyUpPressed in useEffect
    useEffect(() => {
        //comment this code in development
        // window.addEventListener("contextmenu", (event) => {
        //     event.preventDefault();
        // });
        //detect key down keyboard
        window.addEventListener("keydown", keyDownPressed);
        //detect key up keyboard
        window.addEventListener("keyup", keyUpPressed);
    }, []);

    //clicked keys
    const clk = () => {
        const element2 = call.current;
        console.log(element2);
    };

    const [state, setState] = useState("");
    const handler = (event) => {
        // changing the state to the name of the key
        // which is pressed
        setState(event.code);
    };

    const changeLayout = ($code) => {
        setStatusChangeLayout(true);
        console.log($code);
        //reset all ref
        if ($code === 61) {
            setKeys(layout61);
        } else if ($code === 87) {
            setKeys(layout87);
        } else if ($code === 21) {
            console("numpad");
        }
    };
    const [width, setWidth] = useState(300);
    const [image, takeScreenshot] = useScreenshot({
        type: "image/png",
        quality: 1.0,
    });

    const download = (
        image,
        { name = "ScreeshotKeyTes", extension = "jpg" } = {}
    ) => {
        const a = document.createElement("a");
        a.href = image;
        a.download = createFileName(extension, name);
        a.click();
    };

    const ref = useRef();
    const downloadScreenhot = () => {
        takeScreenshot(ref.current).then(download);
    };

    const layoutRender = useCallback(
        (arr) => {
            return (
                <>
                    <div className="card pt-2 pe-2 ps-2 bg-white" ref={ref}>
                        <div className="card-body pb-0">
                            <table
                                style={{ overflowY: "scroll", width: "100%" }}
                            >
                                {arr.row !== undefined ? (
                                    arr.row.length != 0 ? (
                                        arr.row.map((k, key) => {
                                            return (
                                                <tr
                                                    key={key}
                                                    style={{
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {k.column.map(
                                                        (col, key2) => {
                                                            return (
                                                                <div
                                                                    key={key2}
                                                                    className="d-inline"
                                                                >
                                                                    <Keys
                                                                        width={
                                                                            col.keyWidth
                                                                        }
                                                                        colId={
                                                                            col.id
                                                                        }
                                                                        creativeMode={
                                                                            false
                                                                        }
                                                                        clk={
                                                                            clk
                                                                        }
                                                                        sendRef={
                                                                            call
                                                                        }
                                                                        i={key2}
                                                                        type={
                                                                            col.type
                                                                        }
                                                                        id={`${
                                                                            key +
                                                                            "-" +
                                                                            key2
                                                                        }`}
                                                                        styleCode={
                                                                            col.styleCode
                                                                        }
                                                                        legend={
                                                                            col.legend
                                                                        }
                                                                        keyPressCode={
                                                                            col.keyPressCode
                                                                        }
                                                                        fontSize={
                                                                            keys.fontSize
                                                                        }
                                                                    ></Keys>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <div className="h3 m-5 ">
                                            Layout Not Found
                                        </div>
                                    )
                                ) : null}
                            </table>
                        </div>
                        <div className="form-text w-100">
                            <div className="float-end mb-1">
                                &#169; 2023 Radhians-Keys
                            </div>
                        </div>
                    </div>
                </>
            );
        },
        [keys]
    );

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Keyboard Tes | Radhians-Keys</title>
                </Helmet>
            </HelmetProvider>
            <Header />
            <div className="position-fixed w-100" style={{ zIndex: "900" }}>
                <OverlayTrigger
                    delay={{ hide: 500, show: 100 }}
                    overlay={(props) => (
                        <Tooltip {...props}>Screenshot keyboard tes</Tooltip>
                    )}
                    placement="left"
                >
                    <button
                        onClick={downloadScreenhot}
                        className="float-end mx-2 my-2 screen-shot-button"
                    >
                        <i
                            class="bi bi-fullscreen"
                            style={{
                                fontSize: "35px",
                                position: "absolute",
                                top: "13px",
                                right: "22px",
                            }}
                        ></i>
                        <i
                            class="bi bi-camera"
                            style={{
                                fontSize: "25px",
                                position: "absolute",
                                top: "19px",
                                right: "27px",
                            }}
                        ></i>
                    </button>
                </OverlayTrigger>
            </div>

            {/* <div
                className="mt-4 d-flex justify-content-center overflow-auto"
                style={{ display: "table" }}
            > */}
            <div
                className="mt-4 overflow-auto ps-2"
                style={{ margin: "0 auto", display: "table" }}
            >
                {keys ? layoutRender(keys) : null}

                {/* portrait */}
                <div className="card-select-layout card-select-layout-opacity">
                    <Link href="/keyboard-tes/1">
                        <div
                            className="select-layout-border"
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src="/assets/image/layout61keys.png"
                                className="mx-auto d-block"
                                style={{ width: "80px" }}
                            />
                            <div
                                className="d-flex justify-content-center text-white"
                                style={{ fontSize: "14px" }}
                            >
                                61 Keys
                            </div>
                        </div>
                    </Link>

                    <Link href="/keyboard-tes/2">
                        <div
                            className="select-layout-border"
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src="/assets/image/layout87keys.png"
                                className="mx-auto d-block"
                                style={{ width: "80px" }}
                                alt=""
                            />
                            <div
                                className="d-flex justify-content-center text-white"
                                style={{ fontSize: "14px" }}
                            >
                                87 Keys
                            </div>
                        </div>
                    </Link>
                    <div
                        className="select-layout-border"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            return changeLayout(21);
                        }}
                    >
                        <img
                            src="/assets/image/layout61keys.png"
                            className="mx-auto d-block"
                            style={{ width: "80px" }}
                            alt=""
                        />
                        <div
                            className="d-flex justify-content-center text-white"
                            style={{ fontSize: "14px" }}
                        >
                            Numpad
                        </div>
                    </div>
                    <a href="/creative-mode">
                        <div className="select-layout-border">
                            <img
                                src="/assets/image/layout87keys.png"
                                className="mx-auto d-block"
                                style={{ width: "80px" }}
                                alt=""
                            />
                            <div
                                className="d-flex justify-content-center text-white"
                                style={{ fontSize: "14px" }}
                            >
                                Create Layout
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
};

export default keyboardTes;
