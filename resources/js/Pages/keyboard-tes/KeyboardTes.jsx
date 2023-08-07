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
    let call = useRef([]);

    //template empty layout
    let layoutEmpty = {
        keyDownBorder: "",
        keyDownBackground: "",
        fontSize: "",
        row: [],
    };

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
            case "F1":
                event.preventDefault();
                break;
            case "F2":
                event.preventDefault();
                break;
            case "F3":
                event.preventDefault();
                break;
            case "F4":
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
            case "NumpadDivide":
                event.preventDefault();
                break;
        }

        if (keys.row !== undefined) {
            //find index using event code
            let getIndex = findIndex(event.code);
            // console.log("getIndex", getIndex);
            // console.log(keys);
            setPressed(event.code);
            // const element2 = (call.current["1-1"].style.border = "1px solid blue");

            //foreach index of ref
            getIndex.forEach((val, index) => {
                // call.current[`${val}`].style.border = keys[0].keyDownBorder;
                if (call.current[`${val}`] != null) {
                    call.current[`${val}`].style.background =
                        keys.keyDownBackground;
                    call.current[`${val}`].classList.add("keysBg");
                }

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
        //find index using event code
        let getIndex = findIndex(event.code);

        //if printscreen pressed, because printscreen not detected in keydown
        if (keys.row !== undefined) {
            if (event.code === "PrintScreen") {
                // console.log("print");

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
            if (call.current[`${val}`] != null) {
                call.current[`${val}`].style.background = null;
            }

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
        // console.log(element2);
    };

    const [state, setState] = useState("");
    const handler = (event) => {
        // changing the state to the name of the key
        // which is pressed
        setState(event.code);
    };

    const changeLayout = ($code) => {
        setStatusChangeLayout(true);
        // console.log($code);
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
                                <tbody>
                                    {arr.row !== undefined ? (
                                        arr.row.length != 0 ? (
                                            arr.row.map((k, key) => {
                                                return (
                                                    <tr
                                                        key={key}
                                                        style={{
                                                            whiteSpace:
                                                                "nowrap",
                                                        }}
                                                    >
                                                        <td>
                                                            {k.column.map(
                                                                (col, key2) => {
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                key2
                                                                            }
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
                                                                                i={
                                                                                    key2
                                                                                }
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
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <div className="h3 m-5 ">
                                                Layout Not Found
                                            </div>
                                        )
                                    ) : null}
                                </tbody>
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
                            className="bi bi-fullscreen"
                            style={{
                                fontSize: "35px",
                                position: "absolute",
                                top: "13px",
                                right: "22px",
                            }}
                        ></i>
                        <i
                            className="bi bi-camera"
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
                    <Link href="/keyboard-tes/3">
                        <div
                            className="select-layout-border"
                            style={{ cursor: "pointer" }}
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
                    </Link>
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
