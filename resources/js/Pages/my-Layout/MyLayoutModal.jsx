import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Inertia } from "@inertiajs/inertia";
import "./myLayout.css";
import { usePage } from "@inertiajs/inertia-react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
//sweetalert
import Swal from "sweetalert2";
import "animate.css";
//sweetalert

const MyLayoutModal = ({ showModalMyLayout, hideMyLayoutModal }) => {
    const [layoutList, setLayoutList] = useState([]);
    const { auth, errors, session } = usePage().props;

    const swalCustom = Swal.mixin({
        customClass: {
            title: "h5 text-start",
            confirmButton: "btn btn-success me-2 ps-4 pe-4 text-end",
            denyButton: "btn btn-danger me-2 ps-4 pe-4",
            actions: "w-100 d-flex justify-content-end pe-4",
        },
        buttonsStyling: false,
    });

    const getSessionStorage = () => {
        return JSON.parse(sessionStorage.getItem("lastSavedData"));
    };

    const getLayoutListdata = async () => {
        return await axios.get("/my-layout").then((response) => {
            // console.log(response);
            return setLayoutList(Array.from(response.data.data));
        });
    };

    useEffect(() => {
        if (showModalMyLayout === true) {
            // console.log("modal myLayout Open");
            getLayoutListdata();
        }
    }, [showModalMyLayout]);

    const getDateFromTimestamp = (timestamp) => {
        var date = new Date(timestamp);
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).substr(-2);
        var day = ("0" + date.getDate()).substr(-2);
        return day + "-" + month + "-" + year + " ";
    };

    const runTes = (id) => {
        return window.open(
            `/keyboard-tes/${id}`,
            "_blank" // <- This is what makes it open in a new window.
        );
    };

    const loadDataCreativeMode = async (id) => {
        let getSessionStorageData = getSessionStorage();

        if (getSessionStorageData && getSessionStorageData.id == id) {
            // return alert("you are in this layout");
            return swalCustom.fire("you are in this layout");
        }

        swalCustom
            .fire({
                title: "Are you sure you want to load this data ?, you will lose the current data",
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: "No",
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    await axios
                        .get(`/loadLayout/${id}`)
                        .then((response) => {
                            let getData = response.data.data;
                            sessionStorage.removeItem("lastSavedData");
                            let setLoad = {
                                id: getData.id,
                                idUser: getData.id_user,
                                layoutName: getData.name_layout,
                                layoutData: JSON.parse(getData.layout_data),
                            };
                            sessionStorage.setItem(
                                "lastSavedData",
                                JSON.stringify(setLoad)
                            );
                            location.href = "/creative-mode";
                        })
                        .catch((err) => {
                            alert(err.message);
                        });
                } else if (result.isDenied) {
                    return false;
                }
            });
        return;
    };

    const deleteData = async (id) => {
        let getSessionStorageData = getSessionStorage();
        if (getSessionStorageData && getSessionStorageData.id == id) {
            // return alert(
            //     "you cannot delete the layout data that you are currently using"
            // );
            return swalCustom.fire(
                "you cannot delete the layout data that you are currently using"
            );
        }
        swalCustom
            .fire({
                title: "are you sure want to delete this layout ?",
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: "No",
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    return await axios
                        .delete(`/my-layout/${id}`)
                        .then((response) => {
                            // alert("success deleting data");
                            getLayoutListdata(id);
                        })
                        .catch((err) => {
                            alert(err.message);
                        });
                } else if (result.isDenied) {
                    return false;
                }
            });
    };

    return (
        <>
            <Modal
                size="lg"
                show={showModalMyLayout}
                onHide={hideMyLayoutModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header
                    className="bg-dark text-white"
                    closeButton
                    closeVariant="white"
                >
                    <div className="h5">My Layout</div>
                </Modal.Header>
                <Modal.Body>
                    <div
                        className="w-100"
                        style={{ maxHeight: "500px", overflowY: "auto" }}
                    >
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" width="5%">
                                        #
                                    </th>
                                    <th scope="col" width="30%">
                                        Preview Layout
                                    </th>
                                    <th scope="col" width="30%">
                                        Layout Name
                                    </th>
                                    <th scope="col" width="15%">
                                        Last Update
                                    </th>
                                    <th scope="col" width="20%">
                                        Handle
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {layoutList.length == 0 ? (
                                    <tr>
                                        <td
                                            colSpan={"5"}
                                            className="text-center"
                                        >
                                            No data saved
                                        </td>
                                    </tr>
                                ) : (
                                    layoutList.map((data, key) => {
                                        return (
                                            <tr key={key}>
                                                <th scope="row">{data.id}</th>
                                                <td>
                                                    {data.preview_layout ? (
                                                        <img
                                                            src={`/images/${data.preview_layout}`}
                                                            className="imagePreview"
                                                            style={{
                                                                maxWidth:
                                                                    "200px",
                                                            }}
                                                        />
                                                    ) : (
                                                        <div
                                                            style={{
                                                                width: "250px",
                                                                height: "100px",
                                                                border: "1px solid lightBlue",
                                                            }}
                                                        >
                                                            <div className="d-flex justify-content-center h-100">
                                                                <div className="align-self-center">
                                                                    No Layout
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>
                                                <td>{data.name_layout}</td>
                                                <td>
                                                    {getDateFromTimestamp(
                                                        data.updated_at
                                                    )}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-info w-100"
                                                        onClick={() => {
                                                            return loadDataCreativeMode(
                                                                data.id
                                                            );
                                                        }}
                                                    >
                                                        <i className="bi bi-pencil-square me-1 float-start"></i>
                                                        {`Load & Edit`}
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-success w-100 mt-1"
                                                        onClick={() => {
                                                            return runTes(
                                                                data.id
                                                            );
                                                        }}
                                                    >
                                                        <i className="bi bi-caret-right-fill me-1 float-start"></i>
                                                        Run Tes
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger w-100 mt-1"
                                                        onClick={() => {
                                                            return deleteData(
                                                                data.id
                                                            );
                                                        }}
                                                    >
                                                        <i className="bi bi-trash me-1 float-start"></i>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default MyLayoutModal;
