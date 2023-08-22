import React from "react";
//sweetalert
import Swal from "sweetalert2";
import "animate.css";
//sweetalert

const RowOption = ({ reverse, addKeys, deleteRow, id }) => {
    const swalCustom = Swal.mixin({
        customClass: {
            title: "h5 text-start",
            confirmButton: "btn btn-success me-2 ps-4 pe-4 text-end",
            denyButton: "btn btn-danger me-2 ps-4 pe-4",
            actions: "w-100 d-flex justify-content-end pe-4",
        },
        buttonsStyling: false,
    });

    const delRow = () => {
        swalCustom
            .fire({
                title: "Are you sure you want to delete this line?",
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: "No",
            })
            .then((result) => {
                if (result.isConfirmed) {
                    return deleteRow(id);
                } else if (result.isDenied) {
                    return false;
                }
            });
    };

    return (
        <div
            className={
                reverse == true
                    ? " menu-position-left "
                    : " menu-position-right "
            }
        >
            <div className="menu-item pe-1">
                <div
                    className="btn btn-sm btn-success w-100 g-0 p-0 "
                    style={{ fontSize: "16px" }}
                    onClick={() => {
                        return addKeys(id);
                    }}
                >
                    <i className="bi bi-plus-circle"></i>
                </div>
            </div>
            <div className="menu-item pe-1">
                <div
                    className="btn btn-sm btn-danger w-100 g-0 p-0"
                    style={{ fontSize: "16px" }}
                    onClick={() => {
                        return delRow();
                    }}
                >
                    <i className="bi bi-x-circle"></i>
                </div>
            </div>
        </div>
    );
};

export default RowOption;
