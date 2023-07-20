import React, { useRef, useState } from "react";
import Draggable from "react-draggable";

const AddColumn = ({
    radioChecked,
    listKeys,
    updateKeys,
    menuAddPos,
    setMenuAddPosFunc,
}) => {
    const nodeRef = useRef(null);
    let width = window.screen.availWidth;
    let height = window.screen.availHeight;

    const dragStop = (e, dragElement) => {
        console.log(`x: ${dragElement.x} y:${dragElement.y} `);
        setMenuAddPosFunc(dragElement.x, dragElement.y);
        return true;
    };

    return (
        <>
            <Draggable
                nodeRef={nodeRef}
                handle=".handle"
                onStop={dragStop}
                position={
                    menuAddPos == null
                        ? { x: width - 270, y: height - 450 }
                        : menuAddPos
                }
            >
                <div
                    ref={nodeRef}
                    className="card mt-3 position-fixed"
                    style={{ width: "250px", height: "300px", zIndex: "100" }}
                >
                    <div className="card-header g-0 p-1 ps-2 handle bg-dark text-white">
                        Add column menu
                        <i className="bi bi-arrows-move d-inline float-end pe-1"></i>
                        {/* <button className="btn btn-sm btn-info float-end text-white">
              <i className="bi bi-caret-down-fill"></i>
            </button> */}
                    </div>
                    <div
                        className="card-body p-1 ps-2 w-100 overflow-auto"
                        style={{ maxHeight: "300px" }}
                        onChange={radioChecked}
                    >
                        {listKeys ? (
                            listKeys.map((list, index) => {
                                return (
                                    <div key={index}>
                                        {list.type === "emptyspace" ? (
                                            <div className="form-text">
                                                Empty Space
                                            </div>
                                        ) : list.type === "custom" ? (
                                            <div className="form-text">
                                                Custom width key
                                            </div>
                                        ) : (
                                            <div className="form-text">
                                                Standard key
                                            </div>
                                        )}
                                        <label className="lbl w-100">
                                            <input
                                                className="form-check-input radio-none "
                                                value={list.id}
                                                type="radio"
                                                name="a"
                                            />
                                            <div className="key">
                                                {list.type === "emptyspace" ? (
                                                    <>
                                                        <div
                                                            className={
                                                                "ps-2 pe-1"
                                                            }
                                                            style={{
                                                                width:
                                                                    list.keyWidth +
                                                                    "px",
                                                                height: "45px",
                                                                // borderRadius: "5px 5px 5px 5px",
                                                                display:
                                                                    "inline-block",
                                                                top: "0",
                                                                border: "2px solid black",
                                                                borderStyle:
                                                                    "dashed",
                                                                margin: "3px",
                                                            }}
                                                        >
                                                            {list.legend}
                                                        </div>
                                                    </>
                                                ) : list.type === "custom" ? (
                                                    <>
                                                        <div
                                                            className={
                                                                "keycaps-custom ps-2 pe-1"
                                                            }
                                                            style={{
                                                                // fontSize: fontSize,
                                                                width:
                                                                    list.keyWidth +
                                                                    "px",
                                                            }}
                                                        >
                                                            {list.legend}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div
                                                        className={` ${list.styleCode} default-setting-keys ps-1 pe-1`}
                                                    >
                                                        {list.legend}
                                                    </div>
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                );
                            })
                        ) : (
                            <div>loading</div>
                        )}
                        {/* <label className="p-1 lbl w-100">
                    <input className="form-check-input radio-none " value={"45"} type="radio" name="a" />
                    <div className="key">
                      <div className="keycaps-45 ps-1 pe-1 ">A</div>
                    </div>
                  </label>
                  <label className="p-1 lbl w-100">
                    <input className="form-check-input radio-none " value={"65"} type="radio" name="a" />
                    <div className="key">
                      <div className="keycaps-65 ps-1 pe-1">A</div>
                    </div>
                  </label>
                  <label className="p-1 lbl w-100">
                    <input className="form-check-input radio-none " value={"150"} type="radio" name="a" />
                    <div className="key">
                      <div className="keycaps-150 ps-1 pe-1">A</div>
                    </div>
                  </label>
                  <label className="p-1 lbl w-100">
                    <input className="form-check-input radio-none " value={"120"} type="radio" name="a" />
                    <div className="key">
                      <div className="keycaps-120 ps-1 pe-1">A</div>
                    </div>
                  </label> */}
                    </div>
                </div>
            </Draggable>
        </>
    );
};

export default AddColumn;
