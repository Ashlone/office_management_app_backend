import React, { useState } from "react";
import "./Modal3.css";
import ReactDom from "react-dom";
import Modal4 from "./Modal4";
import Modal5 from "./Modal5";
import { AiOutlineCloseCircle } from "react-icons/ai";
const Modal3 = ({ openEditDeleteModal, setOpenEditDeleteModal,staffmemberid }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  if (!openEditDeleteModal) {
    return null;
  }
  
  return ReactDom.createPortal(
    <>
      <div className="modal" >
        <div className="modal-wrapper" >
        <AiOutlineCloseCircle  className="close-icon" size="20px" color="#0D4477" 
        onClick={()=>setOpenEditDeleteModal(false)}/>
          <div className="inner-wrapper" >
          
            <div className="edit-button">
              <button onClick={() => setOpenEditModal(true)}>
                Edit Staff Member
              </button>
            </div>
            <div className="delete-button">
              <button onClick={() => setOpenDeleteModal(true)}>
                Delete Staff Member
              </button>
            </div>
          </div>
        </div>
       
      </div>
     
       <Modal4
         setOpenDeleteModal={()=>setOpenEditDeleteModal(false)}
          openDeleteModal={openDeleteModal}
          staffid={staffmemberid}
         returnStateToOriginal={setOpenDeleteModal}
        />
        <Modal5
          openEditModal={openEditModal}
          onClose={() => setOpenEditModal(false)}
          staffid={staffmemberid}
          redirect={()=>setOpenEditDeleteModal(false)}
         
        />
       
    </>,
    document.getElementById("portal")
  );
};

export default Modal3;
