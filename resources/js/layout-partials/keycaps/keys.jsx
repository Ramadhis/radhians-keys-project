import React from "react";

const keys = ({
    creativeMode,
    type,
    colId,
    i,
    clk,
    sendRef,
    styleCode,
    legend,
    id,
    keyPressCode,
    fontSize,
    width,
}) => {
    const handleKeyDown = (event) => {
        console.log("tes", `${event.which} == ${keyPressCode}`);
        console.log("User pressed: ", legend);
    };

    const handleLeftClick = () => {
        console.log("leftClick");
        return clk(id, true);
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        console.log("rightClick");
        return clk(id, false);
    };

    //null = creative mode, not null == keyboard tes mode
    return type == undefined ? (
        //for standar keys
        <div
            ref={(e) => {
                sendRef.current[id] = e;
            }}
            key={colId}
            onKeyDown={(e) => handleKeyDown(e)}
            onClick={handleLeftClick}
            onContextMenu={handleRightClick}
            className={
                styleCode + " default-setting-keys ps-1 pe-1 keycaps-hovered "
            }
            style={{ fontSize: fontSize }}
        >
            {legend}
        </div>
    ) : type == "emptyspace" ? (
        //for Empty keys
        <div
            ref={(e) => {
                sendRef.current[id] = e;
            }}
            key={colId}
            className={"ps-2 pe-1"}
            onKeyDown={(e) => handleKeyDown(e)}
            onClick={handleLeftClick}
            onContextMenu={handleRightClick}
            style={{
                width: width + "px",
                height: "45px",
                // borderRadius: "5px 5px 5px 5px",
                display: "inline-block",
                top: "0",
                border:
                    creativeMode === true
                        ? "2px solid black"
                        : "1px solid rgba(111,111,111,0.2) transparent",
                borderStyle: creativeMode === true ? "dashed" : "none",
                margin: "3px",
            }}
        ></div>
    ) : (
        //for custom keys
        <div
            ref={(e) => {
                sendRef.current[id] = e;
            }}
            key={colId}
            className={styleCode + " ps-2 pe-1 "}
            onKeyDown={(e) => handleKeyDown(e)}
            onClick={handleLeftClick}
            onContextMenu={handleRightClick}
            style={{
                fontSize: fontSize,
                width: width + "px",
                height: "45px",
                borderRadius: "5px 5px 5px 5px",
                border: "1px solid #0073ff",
                margin: "3px",
                overflowX: "scroll",
                overflow: "hidden",
                display: "inline-block",
            }}
        >
            {legend}
        </div>
    );
};

export default keys;
