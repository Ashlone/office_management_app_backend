import React from "react";
import "./Modal4.css";
import ReactDom from "react-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { DELETE_STAFF } from '../../mutations/officeMutations';
import { useMutation } from '@apollo/client';
import {GET_OFFICES} from'../../queries/officeQueries'
import {  useParams} from "react-router-dom";

const Modal4 = ({ openDeleteModal, staffid ,setOpenDeleteModal, returnStateToOriginal}) => {
  const params = useParams();
  const { id } = params;

//Delete Staff
 const [deleteStaff,] = useMutation(DELETE_STAFF, {
   variables: { officeid:id, staffid:staffid},
   onCompleted: setOpenDeleteModal,
    refetchQueries: [{ query: GET_OFFICES }]
  })
  
  const handleDelete=()=>{
    deleteStaff({officeid:id, staffid:staffid})
    returnStateToOriginal(false) //returning state to original
  }
  
  if (!openDeleteModal) {
    return null;
  }
  return ReactDom.createPortal(
    <>
      <div className="modal">
        <div className="modal-wrapper">
          <div className="inner-wrapper">
            <div className="heading-wrapper">
              <AiOutlineArrowLeft size="25px" onClick={()=>returnStateToOriginal(false) } />
              <h4  >Are You Sure You Want To Delete Staff Member?</h4>
            </div>
            <div className="delete-button">
              <button onClick={()=>returnStateToOriginal(false) }>KEEP STAFF</button>
            </div>
            <div className="keep-office-button">
              <button onClick={ handleDelete}>DELETE STAFF</button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal4;
