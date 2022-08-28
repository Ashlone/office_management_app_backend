import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./NewOffice.css";
import { useNavigate } from "react-router-dom";

import { ADD_OFFICE } from '../../mutations/officeMutations';
import { useMutation } from '@apollo/client';
import {GET_OFFICES} from'../../queries/officeQueries'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {validEmail } from '../../validations/index'

const NewOffice = () => {
  const navigate = useNavigate();

  //setStates
  const [officename, setOfficeName] = useState("");
  const [physicaladdress, setPhysicalAddess] = useState("");
  const [emailaddress, setEmailAddress] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [maximumcapacity, setMaximumCapacity] = useState("");
  const [errorMessage,setErrorMessage]=useState(null)
  //Getting the value of the color and keeping the value
  const colors = [
    "#FFBE0B",
    "#FF9B71",
    "#FB5607",
    " #97512C",
    " #DBBADD",
    "#FF006E",
    "#A9F0D1",
    "#00B402",
    "#489DDA",
    "#0072E8",
    "#8338EC",
  ];

  const [colorpicker, setColorPicker] = useState("");
  
  const handleColorPicker = (color) => {
    setColorPicker(() => {
      return color;
    });
  };

//Adding 
 const [addOffice,{  loading, error }] = useMutation(ADD_OFFICE, {
    variables: { officeName:officename, email:emailaddress, phone:phonenumber,maximumCapacity:maximumcapacity,physicalAddress:physicaladdress,color:colorpicker },
     refetchQueries: [{ query: GET_OFFICES }],
  });


  //validating email address
const handleEmail=(e)=>{
e.preventDefault();
  if(!validEmail(e.target.value)){
    setErrorMessage('Please enter a valid email')
  }else{
    setErrorMessage(null)
  }
  setEmailAddress(e.target.value)
}

//validating PhoneNumber
const [errorNumber,setErrorNumber]=useState(null)
const handlePhoneNumber=(e)=>{
  e.preventDefault();
 if(e.target.value.length > 10){
    setErrorNumber('Your phonenumber should not have more than 10 digits')
  }else{
    setErrorNumber(null)
  }
  setPhoneNumber(e.target.value)
}


//Creating Office
const createOffice = (e) => {
e.preventDefault();
//if empty fields are available ,it will return an error
    if (!officename || !emailaddress|| !phonenumber || !maximumcapacity || !physicaladdress || !colorpicker){
      return toast('Please fill in all fields');
    }
    //adding to db here
    addOffice({ officeName:officename, email:emailaddress, phone:phonenumber,maximumCapacity:maximumcapacity,physicalAddress:physicaladdress,color:colorpicker });
    if(error) toast(`Failed to add`)
      navigate('/')
  };

  

  return (
    <div>
      <div className="title-wrapper">
        <AiOutlineArrowLeft onClick={() => navigate("/")} />
        <h2>New Office</h2>
        <span>hidden</span>
        {/**This element will be hidden */}
      </div>
      <div className="form">
        <input
         type="text"
          placeholder="Office Name"
          value={officename}
          onChange={(e) => setOfficeName(e.target.value)}
        />
        <input
         type="text"
          placeholder="Physical Address"
          value={physicaladdress}
         onChange={(e) => setPhysicalAddess(e.target.value)}
        />
        {
          errorMessage && <div className='errorMessage'>{errorMessage}</div>
        }
        <input
         type="text"
          placeholder="Email Address"
          value={emailaddress}
          onChange={handleEmail}
        />
        {
          errorNumber && <div className='errorMessage'>{errorNumber}</div>
        }
        <input
          placeholder="Phone Number"
          type="number"
          value={phonenumber}
          onChange={handlePhoneNumber}
        />
        <input
          type="number"
          placeholder="Maximum Capacity"
          value={maximumcapacity}
           onChange={(e) => setMaximumCapacity(e.target.value)}
        />
      </div>
      <div className="color-title">
        <h3>Office Color</h3>
      </div>
      <div className="color-picker">
        {colors.map((color, index) => (
          <div
            key={index}
            style={{
              background: `${color}`,
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: `${colorpicker === color ? `4px solid #475569` : `none`}`,
            }}
            onClick={() => handleColorPicker(color, index)}
          ></div>
        ))}
      </div>
      <div className='button-container'>
      <button onClick={createOffice} className="button">
      {loading ? 'Loading...' : "Add Office"}
      </button>
      <ToastContainer />
      </div>
    </div>
  );
};

export default NewOffice;
