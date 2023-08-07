import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 } from "uuid";
import "./creativeMode.css";
import Keys from "../../layout-partials/keycaps/keys";
import {
    AddColumn,
    EditColumn,
    RowOption,
    TopMenu,
} from "../../layout-partials/creative-mode-partial/menu-component/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import { createFileName, useScreenshot } from "use-react-screenshot";
import SavePreview from "../../layout-partials/creative-mode-partial/creative-mode-core/SavePreview";
import BlockUi from "../../layout-partials/block-ui/BlockUi";
import TutorialCreativeMode from "../../layout-partials/creative-mode-partial/creative-mode-core/TutorialCreativeMode";

const creativeMode = () => {
    const [displayLoading, setDisplayLoading] = useState(false); //SavePreview
    const [handleShowTutorial, setHandleShowTutorial] = useState(false);
    const [handleUiBlock, setHandleUiBlock] = useState(false);
    const { auth, errors, session } = usePage().props;

    const refLayout = useRef(); // get ref (layout) for take screenshot layout
    const [image, takeScreenshot] = useScreenshot({
        type: "image/jpeg",
        quality: 0.5,
    });

    useEffect(() => {
        // if (errors) {
        //     console.log(errors);
        // }

        if (handleShowTutorial == false) {
            let getLocalStorageData = JSON.parse(
                localStorage.getItem("stateStore")
            );

            if (getLocalStorageData) {
                if (getLocalStorageData.tutorialCompletion == false) {
                    setHandleShowTutorial(true);
                }
            } else {
                setHandleShowTutorial(true);
            }
        }

        //return data
        if (session.data) {
            //set id after user save layout for first time
            setSavingData((prev) => {
                return { ...prev, id: session.data.id };
            });

            let getSessionStorageData = JSON.parse(
                sessionStorage.getItem("lastSavedData")
            );
            if (getSessionStorageData) {
                //update localStorage Data after user save data for first time
                let updateLastSavedData = {
                    ...getSessionStorageData,
                    id: session.data.id,
                };
                sessionStorage.setItem(
                    "lastSavedData",
                    JSON.stringify(updateLastSavedData)
                );
            }
        }
    }, [session, auth, errors]);

    //load latest state from localstorage
    useEffect(() => {
        let getSessionStorageData = JSON.parse(
            sessionStorage.getItem("lastSavedData")
        );
        if (getSessionStorageData) {
            setKeys(getSessionStorageData.layoutData);
            setSavingData((prev) => {
                return {
                    ...prev,
                    id: getSessionStorageData.id,
                    layoutName: getSessionStorageData.layoutName,
                    layoutData: getSessionStorageData.layoutData,
                };
            });
        }
    }, []);

    let defaultLayout = {
        keyDownBorder: " 1px solid blue ",
        keyDownBackground: "lightskyblue",
        fontSize: "13px",
        row: [
            {
                id: v4(),
                column: [
                    {
                        id: v4(),
                        legend: "`~",
                        styleCode: "keycaps-45",
                        keyPressCode: "Backquote",
                    },
                    {
                        id: v4(),
                        legend: "1!",
                        styleCode: "keycaps-45",
                        keyPressCode: "Digit1",
                    },
                    {
                        id: v4(),
                        legend: "2@",
                        styleCode: "keycaps-45",
                        keyPressCode: "Digit2",
                    },
                    {
                        id: v4(),
                        legend: "3#",
                        styleCode: "keycaps-45",
                        keyPressCode: "Digit3",
                    },
                    {
                        id: v4(),
                        legend: "4$",
                        styleCode: "keycaps-45",
                        keyPressCode: "Digit4",
                    },
                    {
                        id: v4(),
                        legend: "5%",
                        styleCode: "keycaps-45",
                        keyPressCode: "Digit5",
                    },
                    {
                        id: v4(),
                        legend: "6^",
                        styleCode: "keycaps-45",
                        keyPressCode: "Digit6",
                    },
                    {
                        id: v4(),
                        legend: "7&",
                        styleCode: "keycaps-45",
                        keyPressCode: "Digit7",
                    },
                ],
            },
            {
                id: v4(),
                column: [
                    {
                        id: v4(),
                        legend: "Tab",
                        styleCode: "keycaps-70",
                        keyPressCode: "Tab",
                    },
                    {
                        id: v4(),
                        legend: "Q",
                        styleCode: "keycaps-45",
                        keyPressCode: "KeyQ",
                    },
                    {
                        id: v4(),
                        legend: "W",
                        styleCode: "keycaps-45",
                        keyPressCode: "KeyW",
                    },
                    {
                        id: v4(),
                        legend: "E",
                        styleCode: "keycaps-45",
                        keyPressCode: "KeyE",
                    },
                    {
                        id: v4(),
                        legend: "R",
                        styleCode: "keycaps-45",
                        keyPressCode: "KeyR",
                    },
                    {
                        id: v4(),
                        legend: "T",
                        styleCode: "keycaps-45",
                        keyPressCode: "KeyT",
                    },
                    {
                        id: v4(),
                        legend: "Y",
                        styleCode: "keycaps-45",
                        keyPressCode: "KeyY",
                    },
                    {
                        id: v4(),
                        legend: "U",
                        styleCode: "keycaps-45",
                        keyPressCode: "KeyU",
                    },
                    {
                        id: v4(),
                        legend: "I",
                        styleCode: "keycaps-45",
                        keyPressCode: "KeyI",
                    },
                ],
            },
            {
                id: v4(),
                column: [
                    {
                        id: v4(),
                        legend: "Caps",
                        styleCode: "keycaps-85",
                        keyPressCode: "CapsLock",
                    },
                    {
                        id: v4(),
                        legend: "A",
                        styleCode: "keycaps-45",
                        keyPressCode: "KeyA",
                    },
                    {
                        id: v4(),
                        legend: "S",
                        styleCode: "keycaps-45",
                        keyPressCode: "KeyS",
                    },
                    {
                        id: v4(),
                        legend: "D",
                        styleCode: "keycaps-45",
                        keyPressCode: "KeyD",
                    },
                    {
                        id: v4(),
                        legend: "F",
                        styleCode: "keycaps-45",
                        keyPressCode: "KeyF",
                    },
                    {
                        id: v4(),
                        legend: "G",
                        styleCode: "keycaps-45",
                        keyPressCode: "KeyG",
                    },
                    {
                        id: v4(),
                        legend: "H",
                        styleCode: "keycaps-45",
                        keyPressCode: "KeyH",
                    },
                    {
                        id: v4(),
                        legend: "J",
                        styleCode: "keycaps-45",
                        keyPressCode: "KeyJ",
                    },
                    {
                        id: v4(),
                        legend: "K",
                        styleCode: "keycaps-45",
                        keyPressCode: "KeyK",
                    },
                    {
                        id: v4(),
                        legend: "L",
                        styleCode: "keycaps-45",
                        keyPressCode: "KeyL",
                    },
                ],
            },
        ],
    };

    let blankLayout = {
        keyDownBorder: " 1px solid blue ",
        keyDownBackground: "lightskyblue",
        fontSize: "13px",
        row: [
            {
                id: v4(),
                column: [],
            },
            {
                id: v4(),
                column: [],
            },
            {
                id: v4(),
                column: [],
            },
        ],
    };

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

    // call is for getting ref from div keys
    let call = useRef([]);

    //keys data layout
    const [keys, setKeys] = useState(defaultLayout);

    //fot set form edit data in form
    const [formEdit, setFormEdit] = useState(null);

    //to fix error Unable to find draggable with id: without disabled strict mode
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
        // console.log(keys);
    }, []);
    //end to fix error Unable to find draggable with id: without disabled strict mode

    // dragEnd for dragdropContext
    const handleDragEnd = (val) => {
        // console.log(val);

        //destination = dropped item
        let destination = val.destination;
        //source = dragged item
        let source = val.source;

        // drag drop validation
        if (!destination) {
            // console.log("not dropped in droppable");
            return;
        }

        if (
            destination.index === source.index &&
            destination.droppableId == source.droppableId
        ) {
            // console.log("drop in same place");
            return;
        }

        // row sorting
        if (
            source.droppableId === "all-columns" &&
            destination.droppableId === "all-columns"
        ) {
            //sort for row
            setKeys((prev) => {
                let arrKeys = [...prev.row];
                //swap array in row object
                arrKeys.splice(source.index, 1);
                arrKeys.splice(destination.index, 0, prev.row[source.index]);
                return { ...prev, row: arrKeys };
                //End swap array in row object
            });
            // console.log(keys);
        } else if (
            source.droppableId != "all-columns" &&
            destination.droppableId != "all-columns"
        ) {
            //column sorting
            let row = [...keys.row];

            let findIndexSource = row.findIndex((val) => {
                return val.id === source.droppableId;
            });
            let findIndexDestination = row.findIndex((val) => {
                return val.id === destination.droppableId;
            });

            //get dragged object
            let saveItem = {
                ...keys.row[findIndexSource].column[source.index],
            };

            row[findIndexSource].column.splice(source.index, 1);
            row[findIndexDestination].column.splice(
                destination.index,
                0,
                saveItem
            );
            setKeys((prev) => {
                return { ...prev, row: row };
            });
        } else {
            return;
        }
    };

    const addRow = () => {
        let newRow = [...keys.row];
        if (newRow.length <= 10) {
            newRow.push({ id: v4(), column: [] });
            setKeys((prev) => {
                return { ...prev, row: newRow };
            });
        } else {
            alert("you reach max limit of creating row");
        }
    };

    const [placeholderProps, setPlaceholderProps] = useState({});
    const onDragUpdate = (update) => {
        // console.log("onDragUpdate", update);
    };

    //list add column
    const [listKeys, setListKeys] = useState([
        {
            id: v4(),
            type: "emptyspace",
            keyWidth: "80",
            legend: "",
            styleCode: "",
            keyPressCode: "",
        },
        {
            id: v4(),
            type: "custom",
            keyWidth: "100",
            legend: "custom",
            styleCode: "",
            keyPressCode: "KeyA",
        },
        {
            id: "1",
            legend: "A",
            styleCode: "keycaps-45",
            keyPressCode: "KeyA",
        },
        {
            id: "2",
            legend: "Caps",
            styleCode: "keycaps-100",
            keyPressCode: "CapsLock",
        },
        {
            id: "3",
            legend: "Space",
            styleCode: "keycaps-150",
            keyPressCode: "Space",
        },
    ]);

    const [reverse, setReverse] = useState(true);
    const reverseMenu = () => {
        return setReverse((prev) => {
            return prev === true ? false : true;
        });
    };

    const [selectedColRadio, setSelectedColRadio] = useState("1");
    const radioChecked = (e) => {
        // console.log(e.target.value);
        return setSelectedColRadio(`${e.target.value}`);
    };

    //add column
    const addKeys = (id) => {
        let findIndex = keys.row.findIndex((key) => {
            return key.id === id;
        });
        // console.log("add key", findIndex);
        // console.log("count column", keys.row[findIndex].column.length);

        //count all key in 1 row
        let countColumn = keys.row[findIndex].column.length;
        //set max key in 1 row
        if (countColumn >= 50) {
            return alert("you reach max keys in one row");
        }

        let row = [...keys.row];

        let findIndexListKeys = listKeys.findIndex((list) => {
            return list.id == selectedColRadio;
        });

        let getObjectListKeys = {
            ...listKeys[findIndexListKeys],
            id: v4(),
        };

        //find index in row and pushing object to state keys
        row[findIndex].column.push(getObjectListKeys);
        setKeys((prev) => {
            return { ...prev, row: row };
        });
    };

    const deleteRow = (id) => {
        // console.log("delete", id);
        try {
            let findIndexKeys = keys.row.findIndex((key) => {
                return key.id == id;
            });
            // console.log(findIndexKeys);
            let row = [...keys.row];
            row.splice(findIndexKeys, 1);
            setKeys((prev) => {
                return { ...prev, row: row };
            });
        } catch (error) {
            return error;
        }
    };

    // state for get previous clicked keys
    const [prevClicked, setPrevClicked] = useState(null);

    // state for selected row col keys ID
    const [selectedRowColKeys, setSelectedRowColKeys] = useState(null);

    // id parameter === index of row and column keys example -> 0-1
    //function for control keys if clicked by user
    const clk = (id, clickPosition) => {
        // id is index array (row and col), example row 1 col 2 -> "1-2"
        let splitId = id.split("-");
        if (clickPosition) {
            // left click
            if (prevClicked !== null) {
                call.current[`${prevClicked}`].classList.remove("keysBg");
            }
            setSelectedRowColKeys(id);
            call.current[`${id}`].classList.add("keysBg");
            let getDatabyRowCol = null;
            // console.log("clicked", getDatabyRowCol);
            setPrevClicked(`${id}`);
            if (keys) {
                getDatabyRowCol = {
                    ...keys.row[splitId[0]].column[splitId[1]],
                };
                return setFormEdit(getDatabyRowCol);
            }
        } else if (!clickPosition) {
            // Right click for delete item/keys/column
            //get array row
            let row = [...keys.row];
            //delete array using splice
            row[splitId[0]].column.splice(splitId[1], 1);
            setKeys((prev) => {
                return { ...prev, row: row };
            });

            //reset edit column/keys
            resetEditColumn();
            return true;
            //Logic to delete the item
        }
        return;
    };

    //apply edit
    const updateKeys = (formData) => {
        if (selectedRowColKeys) {
            let splitId = selectedRowColKeys.split("-");
            setKeys((prev) => {
                prev.row[splitId[0]].column[splitId[1]] = formData;
                return { ...prev };
            });

            setTimeout(() => {
                let getSessionStorageData = JSON.parse(
                    sessionStorage.getItem("lastSavedData")
                );
                sessionStorage.setItem(
                    "lastSavedData",
                    JSON.stringify({
                        ...getSessionStorageData,
                        layoutData: keys,
                    })
                );
            }, 500);
        }
        return;
    };

    const resetEditColumn = () => {
        // remove class for reset status clicked
        if (prevClicked !== null) {
            call.current[`${prevClicked}`].classList.remove("keysBg");
        }
        //set prev click to null for reset status clicked
        setPrevClicked(null);
        //set null for edit
        setFormEdit(null);
    };

    const handleDragstart = () => {
        resetEditColumn();
    };

    //EditMenu position x,y
    const [menuEditPos, setMenuEditPos] = useState(null);
    //AddMenu position x,y
    const [menuAddPos, setMenuAddPos] = useState(null);

    const [savingData, setSavingData] = useState({
        id: "",
        idUser: "",
        layoutName: "newLayout",
        layoutData: keys,
        imageLayout: "",
    });

    const startTutorial = () => {
        setHandleUiBlock(true);
        setTimeout(() => {
            setHandleUiBlock(false);
            setHandleShowTutorial(true);
        }, 1000);
    };

    const hideTutorial = () => {
        return setHandleShowTutorial(false);
    };

    const saveAll = async (e) => {
        e.preventDefault();
        if (auth.user) {
            setDisplayLoading(true);
            let createImage = null;

            setTimeout(async () => {
                createImage = await takeScreenshot(refLayout.current);
            }, 1000);

            setTimeout(() => {
                setDisplayLoading(false);
            }, 3000);

            setTimeout(async () => {
                // console.log(createImage);
                if (savingData.id != "") {
                    // console.log("layout update", savingData);
                    //for update layout
                    Inertia.put("/layout", {
                        ...savingData,
                        idUser: auth.user.id,
                        layoutData: keys,
                        imageLayout: createImage,
                    });
                } else {
                    Inertia.post("/layout", {
                        ...savingData,
                        idUser: auth.user.id,
                        layoutName: savingData.layoutName,
                        imageLayout: createImage,
                    });
                }

                sessionStorage.setItem(
                    "lastSavedData",
                    JSON.stringify({
                        ...savingData,
                        idUser: auth.user.id,
                        layoutData: keys,
                    })
                );
            }, 2000);
        } else {
            alert("you must login before saving layout");
        }
    };

    //new blank page
    const newBlankPage = () => {
        setHandleUiBlock(true);

        setTimeout(() => {
            sessionStorage.removeItem("lastSavedData");
            setKeys(defaultLayout);
            setSavingData({
                id: "",
                idUser: "",
                layoutName: "newLayout",
                layoutData: blankLayout,
            });

            return sessionStorage.setItem(
                "lastSavedData",
                JSON.stringify({
                    id: "",
                    idUser: "",
                    layoutName: "newLayout",
                    layoutData: blankLayout,
                })
            );
        }, 800);
        setTimeout(() => {
            return window.location.reload(true);
        }, 1200);
    };

    const runTes = () => {
        let getSessionStorageData = JSON.parse(
            sessionStorage.getItem("lastSavedData")
        );
        if (auth.user) {
            if (getSessionStorageData.id) {
                let id = getSessionStorageData.id;
                window.open(
                    `/keyboard-tes/${id}`,
                    "_blank" // <- This is what makes it open in a new window.
                );
            } else {
                alert("you must save this layout before run tes");
            }
        } else {
            alert("you must login before saving layout");
        }
    };

    const setLayoutNameFunc = (name) => {
        setSavingData((prev) => {
            return { ...prev, layoutName: name };
        });
        // console.log(name);
    };

    const resetMenuPos = () => {
        setMenuEditPos(null);
        setMenuAddPos(null);
        return true;
    };

    //Menu edit position
    const setMenuEditPosFunc = (x, y) => {
        return setMenuEditPos({ x: x, y: y });
    };

    //Menu Add position
    const setMenuAddPosFunc = (x, y) => {
        return setMenuAddPos({ x: x, y: y });
    };

    return (
        <>
            <BlockUi handleShow={handleUiBlock} />
            <TutorialCreativeMode
                handleShow={handleShowTutorial}
                hideTutorial={hideTutorial}
            />
            <SavePreview
                refLayout={refLayout}
                displayLoading={displayLoading}
                keys={keys}
            />
            <HelmetProvider>
                <Helmet>
                    <title>Creative Mode | Radhians-Keys</title>
                </Helmet>
            </HelmetProvider>
            <EditColumn
                formEdit={formEdit}
                updateKeys={updateKeys}
                menuEditPos={menuEditPos}
                setMenuEditPosFunc={setMenuEditPosFunc}
                resetMenuPos={resetMenuPos}
            />
            <AddColumn
                radioChecked={radioChecked}
                listKeys={listKeys}
                menuAddPos={menuAddPos}
                setMenuAddPosFunc={setMenuAddPosFunc}
            />
            <div className="mb-4" style={{ display: "table", width: "100%" }}>
                <TopMenu
                    addRow={addRow}
                    saveAll={saveAll}
                    reverseMenu={reverseMenu}
                    runTes={runTes}
                    resetMenuPos={resetMenuPos}
                    setLayoutNameFunc={setLayoutNameFunc}
                />
                <div
                    className="container-drag "
                    style={{ marginTop: "130px" }}
                    // ref={refLayout}
                >
                    <DragDropContext
                        onDragEnd={handleDragEnd}
                        onDragStart={handleDragstart}
                        onDragUpdate={onDragUpdate}
                    >
                        {isMounted ? (
                            <Droppable
                                droppableId="all-columns"
                                direction="vertical"
                                type="column"
                            >
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            className="inner-container pt-3 pb-3 ps-2 pe-2 shadow"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            <div className="row">
                                                <div className="form-text w-50 ps-3">
                                                    right click to delete
                                                    items/keys
                                                </div>
                                                <a
                                                    href="#"
                                                    onClick={startTutorial}
                                                    className="form-text w-50 text-end pe-4"
                                                >
                                                    Quick tutorial
                                                    <i className="ps-1 bi bi-play-btn"></i>
                                                </a>
                                            </div>
                                            {keys.row.map((dat, key) => {
                                                return (
                                                    <Draggable
                                                        key={dat.id}
                                                        index={key}
                                                        draggableId={dat.id}
                                                    >
                                                        {(
                                                            provided,
                                                            snapshot
                                                        ) => {
                                                            return (
                                                                <div
                                                                    className="row-drop shadow-sm"
                                                                    ref={
                                                                        provided.innerRef
                                                                    }
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <div className="menu-list me-3">
                                                                        {/* droppable side option */}
                                                                        <RowOption
                                                                            reverse={
                                                                                reverse
                                                                            }
                                                                            addKeys={
                                                                                addKeys
                                                                            }
                                                                            deleteRow={
                                                                                deleteRow
                                                                            }
                                                                            id={
                                                                                dat.id
                                                                            }
                                                                        />
                                                                        {/* end droppable side menu */}
                                                                        {/* inner drop */}
                                                                        <Droppable
                                                                            droppableId={
                                                                                dat.id
                                                                            }
                                                                            direction="horizontal"
                                                                        >
                                                                            {(
                                                                                provided,
                                                                                snapshot
                                                                            ) => {
                                                                                return (
                                                                                    <div
                                                                                        className={
                                                                                            (reverse ==
                                                                                            true
                                                                                                ? "drop-area-left "
                                                                                                : "drop-area-right ") +
                                                                                            (snapshot.isDraggingOver
                                                                                                ? " drag-area-dragging"
                                                                                                : null)
                                                                                        }
                                                                                        ref={
                                                                                            provided.innerRef
                                                                                        }
                                                                                        {...provided.droppableProps}
                                                                                    >
                                                                                        {dat.column.map(
                                                                                            (
                                                                                                col,
                                                                                                colIndex
                                                                                            ) => {
                                                                                                return (
                                                                                                    <Draggable
                                                                                                        key={
                                                                                                            col.id
                                                                                                        }
                                                                                                        index={
                                                                                                            colIndex
                                                                                                        }
                                                                                                        draggableId={
                                                                                                            col.id
                                                                                                        }
                                                                                                    >
                                                                                                        {(
                                                                                                            provided,
                                                                                                            snapshot
                                                                                                        ) => {
                                                                                                            return (
                                                                                                                <div
                                                                                                                    className="inlineCss"
                                                                                                                    ref={
                                                                                                                        provided.innerRef
                                                                                                                    }
                                                                                                                    {...provided.draggableProps}
                                                                                                                    {...provided.dragHandleProps}
                                                                                                                >
                                                                                                                    <Keys
                                                                                                                        width={
                                                                                                                            col.keyWidth
                                                                                                                        }
                                                                                                                        creativeMode={
                                                                                                                            true
                                                                                                                        }
                                                                                                                        clk={
                                                                                                                            clk
                                                                                                                        }
                                                                                                                        sendRef={
                                                                                                                            call
                                                                                                                        }
                                                                                                                        i={
                                                                                                                            colIndex
                                                                                                                        }
                                                                                                                        type={
                                                                                                                            col.type
                                                                                                                        }
                                                                                                                        id={`${
                                                                                                                            key +
                                                                                                                            "-" +
                                                                                                                            colIndex
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
                                                                                                        }}
                                                                                                    </Draggable>
                                                                                                );
                                                                                            }
                                                                                        )}
                                                                                        {
                                                                                            provided.placeholder
                                                                                        }
                                                                                    </div>
                                                                                );
                                                                            }}
                                                                        </Droppable>
                                                                        {/*End inner drop */}
                                                                    </div>
                                                                </div>
                                                            );
                                                        }}
                                                    </Draggable>
                                                );
                                            })}
                                            {provided.placeholder}
                                            <button
                                                className="btn btn-sm btn-danger mt-3"
                                                onClick={() => {
                                                    return confirm(
                                                        "are you sure want create new with blank page ?"
                                                    )
                                                        ? newBlankPage()
                                                        : "cancel";
                                                }}
                                            >
                                                <i className="bi bi-file-earmark me-1"></i>
                                                New Blank Page
                                            </button>
                                            {/* <button
                                                className="btn btn-success"
                                                onClick={downloadScreenhot}
                                            >
                                                Download
                                            </button> */}
                                        </div>
                                    );
                                }}
                            </Droppable>
                        ) : null}
                    </DragDropContext>
                    <div className="wall"></div>
                </div>
            </div>
        </>
    );
};

export default creativeMode;
