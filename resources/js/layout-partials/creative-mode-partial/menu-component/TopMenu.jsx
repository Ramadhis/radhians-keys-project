import React, { useState, useEffect, useRef } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Header from "../../Header";
import { usePage } from "@inertiajs/inertia-react";

const TopMenu = ({
    addRow,
    saveAll,
    reverseMenu,
    runTes,
    resetMenuPos,
    setLayoutNameFunc,
}) => {
    const { auth, errors, session } = usePage().props;
    const [layoutName, setLayoutName] = useState("newLayout");
    const [sessionInformation, setSessionInfomation] = useState("");
    const sessionInfoRef = useRef(null);

    useEffect(() => {
        let getSessionStorageData = JSON.parse(
            sessionStorage.getItem("lastSavedData")
        );
        //get last data saved
        if (getSessionStorageData) {
            setLayoutName(getSessionStorageData.layoutName);
        }
    }, []);

    useEffect(() => {
        if (session.success) {
            setSessionInfomation(session.success);
            sessionInfoRef.current.classList.remove("d-none");
            setTimeout(() => {
                sessionInfoRef.current.classList.add("d-none");
            }, 8000);
        }
    }, [session]);

    return (
        <div
            className="col-12 g-0 position-fixed bg-white shadow-sm"
            style={{ display: "table" }}
        >
            <Header />
            <div
                className="p-1 mt-2 ms-2 float-start me-2"
                style={{ width: "300px" }}
            >
                <input
                    type="text"
                    className="form-control form-control-sm"
                    style={{ width: "200px" }}
                    placeholder="Layout name....."
                    value={layoutName}
                    onChange={(e) => {
                        setLayoutName(e.target.value);
                        setLayoutNameFunc(e.target.value);
                    }}
                    maxLength="60"
                ></input>
                {errors.layoutName && (
                    <div className="text-danger form-text mt-0">
                        {errors.layoutName}
                    </div>
                )}
            </div>
            <div className="p-1 mt-2 float-end me-2">
                <button
                    className="btn btn-sm btn-primary me-1"
                    onClick={addRow}
                >
                    <i className="bi bi-plus-square me-1"></i>
                    Add Row
                </button>

                <button
                    className="btn btn-sm btn-success me-1"
                    onClick={reverseMenu}
                >
                    <i className="bi bi-arrow-left-right me-1"></i>
                    Reverse Option position
                </button>
                <button
                    className="btn btn-sm btn-warning me-1"
                    onClick={resetMenuPos}
                >
                    <i className="bi bi-arrow-repeat me-1"></i>
                    Reset menu position
                </button>
                <OverlayTrigger
                    delay={{ hide: 1000, show: 200 }}
                    overlay={(props) => (
                        <Tooltip {...props}>
                            You must save layout before run tes
                        </Tooltip>
                    )}
                    placement="bottom"
                >
                    <button
                        className="btn btn-sm btn-success me-1 d-inline"
                        onClick={runTes}
                    >
                        <i className="bi bi-caret-right-fill me-1"></i>
                        Run Tes
                    </button>
                </OverlayTrigger>
                <button
                    className="btn btn-sm btn-success me-1 d-inline"
                    onClick={saveAll}
                >
                    <i className="bi bi-cloud-check me-1"></i>
                    Save All
                </button>
            </div>
            <hr style={{ width: "100%" }}></hr>
            <div
                className="float-start form-text"
                style={{
                    marginTop: "-15px",
                    marginLeft: "15px",
                    fontSize: "14px",
                }}
            >
                &#169; 2023 Radhians-Keys
            </div>
            <div
                className="float-end form-text d-none"
                ref={(e) => {
                    sessionInfoRef.current = e;
                }}
                style={{
                    marginTop: "-15px",
                    marginRight: "14px",
                    fontSize: "14px",
                    fontWeight: "bold",
                }}
            >
                {sessionInformation}
            </div>
        </div>
    );
};

export default TopMenu;
