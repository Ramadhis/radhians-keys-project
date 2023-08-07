import React, { useCallback } from "react";
import Keys from "../../keycaps/keys";

const SavePreview = ({ refLayout, displayLoading, keys }) => {
    const creativeMode = false;
    const layoutRender = useCallback(
        (arr) => {
            return (
                <div className="card pt-2 pe-2 ps-2 bg-white">
                    <div
                        className="card-body pb-0"
                        style={{ display: "table" }}
                    >
                        {arr.row !== undefined ? (
                            arr.row.length != 0 ? (
                                arr.row.map((k, key) => {
                                    return (
                                        <table key={key}>
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style={{
                                                            whiteSpace:
                                                                "nowrap",
                                                        }}
                                                    >
                                                        {k.column.map(
                                                            (col, key2) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            key2
                                                                        }
                                                                        className="d-inline"
                                                                    >
                                                                        {col.type ==
                                                                        undefined ? (
                                                                            <div
                                                                                key={
                                                                                    col.id
                                                                                }
                                                                                className={
                                                                                    col.styleCode +
                                                                                    " default-setting-keys ps-1 pe-1 keycaps-hovered "
                                                                                }
                                                                                style={{
                                                                                    fontSize:
                                                                                        keys.fontSize,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    col.legend
                                                                                }
                                                                            </div>
                                                                        ) : col.type ==
                                                                          "emptyspace" ? (
                                                                            <div
                                                                                key={
                                                                                    col.id
                                                                                }
                                                                                className={
                                                                                    "ps-2 pe-1"
                                                                                }
                                                                                style={{
                                                                                    width:
                                                                                        col.keyWidth +
                                                                                        "px",
                                                                                    height: "45px",
                                                                                    // borderRadius: "5px 5px 5px 5px",
                                                                                    display:
                                                                                        "inline-block",
                                                                                    top: "0",
                                                                                    border:
                                                                                        creativeMode ===
                                                                                        true
                                                                                            ? "2px solid black"
                                                                                            : "1px solid rgba(111,111,111,0.2) transparent",
                                                                                    borderStyle:
                                                                                        creativeMode ===
                                                                                        true
                                                                                            ? "dashed"
                                                                                            : "none",
                                                                                    margin: "3px",
                                                                                }}
                                                                            ></div>
                                                                        ) : (
                                                                            <div
                                                                                key={
                                                                                    col.id
                                                                                }
                                                                                className={
                                                                                    col.styleCode +
                                                                                    " ps-2 pe-1 "
                                                                                }
                                                                                style={{
                                                                                    fontSize:
                                                                                        keys.fontSize,
                                                                                    width:
                                                                                        col.keyWidth +
                                                                                        "px",
                                                                                    height: "45px",
                                                                                    borderRadius:
                                                                                        "5px 5px 5px 5px",
                                                                                    border: "1px solid #0073ff",
                                                                                    margin: "3px",
                                                                                    overflowX:
                                                                                        "scroll",
                                                                                    overflow:
                                                                                        "hidden",
                                                                                    display:
                                                                                        "inline-block",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    col.legend
                                                                                }
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    );
                                })
                            ) : (
                                <div className="h3 m-5 ">Layout Not Found</div>
                            )
                        ) : null}
                    </div>
                    <div className="form-text w-100">
                        <div className="float-end mb-1">
                            &#169; 2023 Radhians-Keys
                        </div>
                    </div>
                </div>
            );
        },
        [keys]
    );

    return (
        <div
            className="position-fixed w-100 h-100"
            style={{
                zIndex: "1000",
                display: displayLoading ? "block" : "none",
            }}
        >
            <div
                className="w-100 h-100 d-flex justify-content-center"
                style={{ zIndex: "1010", position: "fixed" }}
            >
                <div
                    className="align-self-center"
                    style={{
                        zIndex: "1010",
                    }}
                >
                    <div className="w-100">
                        <div
                            className=" spinner-border me-2 text-white"
                            role="status"
                            style={{ width: "1.5rem", height: "1.5rem" }}
                        ></div>
                        <div className="h5 text-white d-inline-block">
                            Saving data .....
                        </div>
                    </div>
                    <div
                        ref={(e) => {
                            refLayout.current = e;
                        }}
                        style={{
                            background: "white",
                        }}
                    >
                        {keys ? layoutRender(keys) : null}
                    </div>
                    <div
                        className="h5 text-white float-end"
                        style={{ paddingBottom: "-20px" }}
                    >
                        Preview Layout
                    </div>
                </div>
            </div>
            <div
                className="w-100 h-100"
                style={{
                    background: "#4d4d4d",
                    opacity: "0.8",
                    zIndex: "1001",
                }}
            ></div>
        </div>
    );
};

export default SavePreview;
