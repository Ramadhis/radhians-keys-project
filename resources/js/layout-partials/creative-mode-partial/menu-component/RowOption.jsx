import React from "react";

const RowOption = ({ reverse, addKeys, deleteRow, id }) => {
  return (
    <div className={reverse == true ? " menu-position-left " : " menu-position-right "}>
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
            var result = confirm("Want to delete?");
            if (result) {
              return deleteRow(id);
            }
          }}
        >
          <i className="bi bi-x-circle"></i>
        </div>
      </div>
    </div>
  );
};

export default RowOption;
