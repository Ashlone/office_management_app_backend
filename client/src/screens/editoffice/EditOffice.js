import React, { useState,useEffect} from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./EditOffice.css";
import { useNavigate, useParams } from "react-router-dom";
import { GET_OFFICE} from "../../queries/officeQueries";
import { useQuery } from "@apollo/client";
import Spinner from "../../components/loader/Spinner"
import {validEmail } from '../../validations/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  UPDATE_OFFICE,DELETE_OFFICE } from '../../mutations/officeMutations';
import { useMutation } from '@apollo/client';
import {GET_OFFICES} from'../../queries/officeQueries'

const EditOffice = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
 
  //setStates
  const [officename, setOfficeName] = useState("");
  const [physicaladdress, setPhysicalAddess] = useState("");
  const [emailaddress, setEmailAddress] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [maximumcapacity, setMaximumCapacity] = useState("");
  

//Fetching Data
  const {data , loading }= useQuery(GET_OFFICE, { variables: { id } });



  //Getting the value of the color and keeping the value
  const colors = [
    "#FFBE0B",
    "#FF9B71",
    "#FB5607",
    "#97512C",
    "#DBBADD",
    "#FF006E",
    "#A9F0D1",
    "#00B402",
    "#489DDA",
    "#0072E8",
    "#8338EC",
  ];




const [colorpicker, setColorPicker] = useState();
 
 useEffect(()=>{
setColorPicker(data?.office.color)
setOfficeName(data?.office.officeName)
setEmailAddress(data?.office.email)
setMaximumCapacity(data?.office.maximumCapacity)
setPhoneNumber(data?.office.phone)
setPhysicalAddess(data?.office.physicalAddress)
 },[data])

 
 

  //Selecting Color
  const handleColorPicker = (color) => {
    setColorPicker(() => {
      return color;
    });
   
  };

  //validating email address
const [errorMessage,setErrorMessage]=useState(null)
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

//Making server request
 const [updateOffice,{ error }] = useMutation( UPDATE_OFFICE, {
    variables: { id:id, officeName:officename, email:emailaddress, phone:phonenumber,maximumCapacity:maximumcapacity,physicalAddress:physicaladdress,color:colorpicker },
     refetchQueries: [{ query: GET_OFFICES }],
  });


//Creating Office
const handleUpdate = (e) => {
    e.preventDefault();
    //if empty fields are available ,it will return an error
    if (!officename || !emailaddress|| !phonenumber || !maximumcapacity || !physicaladdress || !colorpicker){
      return toast('Please fill in all fields');
    }
    updateOffice({ officeName:officename, email:emailaddress, phone:phonenumber,maximumCapacity:maximumcapacity,physicalAddress:physicaladdress,color:colorpicker});
    toast("Updated Successfully")
    navigate(`/officeview/${id}`)
  };

//Delete Office
const [deleteOffice] = useMutation(DELETE_OFFICE, {
    variables: { id: id },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_OFFICES }],
  });

    if (loading) return <Spinner/>;
  if(error) return <p>Something went wrong..Please refresh your page and try again</p>

  return (
    <div>
      <div className="title-wrapper">
        <AiOutlineArrowLeft onClick={() => navigate("/")} />
        <h2>Edit Office</h2>
        <span>hidden</span>
        {/**This element will be hidden */}
      </div>
      <div className="form">
        <input
        type="text"
          value={officename}
          onChange={(e) => setOfficeName(e.target.value)}
        />
        <input
         type="text"
          value={physicaladdress}
          onChange={(e) => setPhysicalAddess(e.target.value)}
        />
        {
          errorMessage && <div className='errorMessage'>{errorMessage}</div>
        }
        <input
        type="text"
          value={emailaddress}
          onChange={ handleEmail}
        />
        {
          errorNumber && <div className='errorMessage'>{errorNumber}</div>
        }
        <input
         type='number'
          value={phonenumber}
          onChange={handlePhoneNumber}
        />
        <input
         type="number"
          value={maximumcapacity}
          onChange={(e) => setMaximumCapacity(e.target.value)}
        />
      </div>
      <div className="color-title">
        <h3>Office Color</h3>
      </div>
      <div className="color-picker">
        {colors.map((color) => (
          <div
            key={color}
            style={{
              border: `${
                 color === colorpicker ? `4px solid #475569` : `none`
              }`,
              background: `${color}`,
              width: "36px",
              height: "36px",
              borderRadius: "50%",
            }}
            onClick={() => handleColorPicker(color)}
          ></div>
        ))}
      </div>
     <div className='buttons'>
      <button className="update-button" onClick={handleUpdate}>
        Update Office
      </button>
      <button className="delete-button" onClick={deleteOffice} >
        Delete Office
      </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditOffice;
