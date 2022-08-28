import React, { useState,useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import "./Modal.css";
import ReactDom from "react-dom";
import Modal6 from "./Modal6";
import { GET_OFFICE} from "../../queries/officeQueries";
import { useQuery } from "@apollo/client";
import { useParams} from "react-router-dom"

const Modal5 = ({ openEditModal, onClose,redirect ,staffid}) => {
  //set states
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [openContinueEditModal, setContinueOpenEditModal] = useState(false);
 const[errorMessage,setErrorMessage]=useState('') 
const [avatar,setAvatar]=useState('')
const [ID,setID]=useState('') //setting ID FOR STAFF


 const params=useParams()
   const { id } = params;
 
  //Getting data
  const {data}= useQuery(GET_OFFICE, { variables: { id } });

  
  //Finding staff by id
const findStaff= data.office.staff.find((item)=>(
  item.id===staffid
))

//Changing state to show fetched data
useEffect(()=>{
 setName(findStaff.firstName)
 setLastName(findStaff.lastName)
 setAvatar(findStaff.avatar)
 setID(findStaff.id)
 },[findStaff])



  //Function to click next
  const handleNext = () => {
    if(!name || !lastname) return setErrorMessage('Please enter staff name and lastname')
    setContinueOpenEditModal(true);
  };

  if (!openEditModal) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className="modal">
        <div className="modal-wrapper">
          <div className="heading-wrapper">
            <h3>Edit Staff Member</h3>
            <AiOutlineCloseCircle size="20px" color="#0D4477" onClick={onClose} />
          </div>
          <div className="form">
          {
          errorMessage  && <div className='errorMessage'>{errorMessage}</div>
        }
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {
          errorMessage  && <div className='errorMessage'>{errorMessage}</div>
        }
            <input
           
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
            <div className="dots">
              <BsDot color="#489DDA" />
              <BsDot color="#489DDA" />
            </div>
            <button onClick={handleNext}>Next</button>
            <Modal6
              name={name}
              lastname={lastname}
              staffID={ID}
              staffAvatar={avatar}
              redirect={redirect}
              openContinueEditModal={openContinueEditModal}
              onClose={onClose}
            />
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal5;
