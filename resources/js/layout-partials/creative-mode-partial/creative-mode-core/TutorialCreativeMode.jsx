import React, { useState, useEffect } from "react";

const TutorialCreativeMode = ({ handleShow, hideTutorial }) => {
    const [countTutorial, setCountTutorial] = useState(0);
    const [tutorialData, setTutorialData] = useState([
        {
            text: "I will explain a little for the creative-mode feature.\n first, click item in the add column menu.",
            image: "/assets/image/tutorial-image-1.png",
        },
        {
            text: `Next, click the green "+" button as shown below to add items to the row.`,
            image: "/assets/image/tutorial-image-2.png",
        },
        {
            text: "You can arrange the order of items by dragging as shown below.",
            image: "/assets/image/tutorial-image-3.png",
        },
        {
            text: "additionally you can arrange the outer rows to fit in the order you want.",
            image: "/assets/image/tutorial-image-4.png",
        },
        {
            text: "after you finish making the layout, then click save, and you can run the test.",
            image: "/assets/image/tutorial-image-5.png",
        },
        {
            text: "You can see the layout that you have saved in my-layout, by clicking on your name to the right of the header.",
            image: "/assets/image/tutorial-image-6.png",
        },
    ]);

    useEffect(() => {
        if (handleShow) {
            setCountTutorial(0);
        }
    }, [handleShow]);

    const next = () => {
        if (countTutorial == tutorialData.length - 1) {
            return false;
        }
        setCountTutorial((prev) => prev + 1);
    };

    const back = () => {
        if (countTutorial < 1) {
            return false;
        }

        setCountTutorial((prev) => prev - 1);
    };

    const finish = () => {
        return hideTutorial();
    };

    return (
        <div
            className="position-fixed w-100 h-100"
            style={{ zIndex: "1000", display: handleShow }}
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
                        <div className="h5 text-white d-inline-block">
                            Tutorials creative mode.
                        </div>
                    </div>
                    <div
                        className="bg-white p-2"
                        style={{ borderRadius: "5px" }}
                    >
                        <div
                            className="mt-2 mb-1"
                            style={{ height: "50px", maxWidth: "460px" }}
                        >
                            {tutorialData[countTutorial].text}
                        </div>
                        <img
                            src={tutorialData[countTutorial].image}
                            style={{ width: "500px" }}
                        />
                        <div className="row">
                            <div className="col-6 pt-3 pb-2 d-inline-block">
                                {countTutorial == 0 ? null : (
                                    <button
                                        className="btn btn-danger"
                                        style={{ marginRight: "0px" }}
                                        onClick={back}
                                    >
                                        Back
                                    </button>
                                )}
                            </div>
                            <div className="col-6 pt-3 pb-2 d-flex flex-row-reverse d-inline-block">
                                {countTutorial == tutorialData.length - 1 ? (
                                    <button
                                        className="btn btn-primary"
                                        style={{ marginRight: "0px" }}
                                        onClick={finish}
                                    >
                                        Finish
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-primary"
                                        style={{ marginRight: "0px" }}
                                        onClick={next}
                                    >
                                        next
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        className="h5 text-white float-end"
                        style={{ paddingBottom: "-20px" }}
                    ></div>
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

export default TutorialCreativeMode;
