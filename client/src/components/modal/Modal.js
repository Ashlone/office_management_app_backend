import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import "./Modal.css";
import ReactDom from "react-dom";
import Modal2 from "./Modal2";

const Modal = ({ showModal,closeAddModal }) => {
  //set states
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [openModal, setOpenModal] = useState(false);
const[errorMessage,setErrorMessage]=useState('')

  if (!showModal) {
    return null;
  }

  //Function to click next
  const handleNext = () => {
    if(!name || !lastname) return setErrorMessage('Please enter staff name and lastname')
    setOpenModal(true);
  };

  return ReactDom.createPortal(
    <>
      <div className="modal">
        <div className="modal-wrapper">
          <div className="heading-wrapper">
            <h3>New Staff Member</h3>
            <AiOutlineCloseCircle color="#0D4477" onClick={closeAddModal} />
          </div>
          <div className="form">
          {
          errorMessage  && <div className='errorMessage'>{errorMessage}</div>
        }
            <input
              placeholder="First Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {
          errorMessage && <div className='errorMessage'>{errorMessage}</div>
        }
            <input
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
            <div className="dots">
              <BsDot color="#489DDA" />
              <BsDot color="#489DDA" />
            </div>
            <button
              onClick={handleNext}
            >
              Next
            </button>
            <Modal2
              openModal={openModal}
              onClose={closeAddModal}
              name={name}
              lastname={lastname}
              setLastName={setLastName}
              setName={setName}
              setErrorMessage={setErrorMessage}
            />
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
