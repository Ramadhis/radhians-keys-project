import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const dragAbleKeysCol = (id, colIndex) => {
    return (
        <Draggable key={id} index={colIndex} draggableId={col.id}>
            {(provided, snapshot) => {
                return (
                    <div
                        className="inlineCss"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Keys
                            width={col.keyWidth}
                            creativeMode={true}
                            clk={clk}
                            sendRef={call}
                            i={colIndex}
                            type={col.type}
                            id={`${key + "-" + colIndex}`}
                            styleCode={col.styleCode}
                            legend={col.legend}
                            keyPressCode={col.keyPressCode}
                            fontSize={keys.fontSize}
                        ></Keys>
                    </div>
                );
            }}
        </Draggable>
    );
};

export default dragAbleKeysCol;
