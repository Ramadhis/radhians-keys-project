import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const innerDroppable = ({ dropId, dat, reverse }) => {
    return (
        <Droppable droppableId={dropId} direction="horizontal">
            {(provided, snapshot) => {
                return (
                    <div
                        className={
                            (reverse == true
                                ? "drop-area-left "
                                : "drop-area-right ") +
                            (snapshot.isDraggingOver
                                ? " drag-area-dragging"
                                : null)
                        }
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {dat.column.map((col, colIndex) => {
                            return (
                                <Draggable
                                    key={col.id}
                                    index={colIndex}
                                    draggableId={col.id}
                                >
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
                                                    id={`${
                                                        key + "-" + colIndex
                                                    }`}
                                                    styleCode={col.styleCode}
                                                    legend={col.legend}
                                                    keyPressCode={
                                                        col.keyPressCode
                                                    }
                                                    fontSize={keys.fontSize}
                                                ></Keys>
                                            </div>
                                        );
                                    }}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </div>
                );
            }}
        </Droppable>
    );
};

export default innerDroppable;
