import React, { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import "./Modal2.css";
import ReactDom from "react-dom";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { useParams } from "react-router-dom";
import { storage } from "../../firebase";
import { ADD_STAFF } from '../../mutations/officeMutations';
import { useMutation } from '@apollo/client';
import {GET_OFFICES} from'../../queries/officeQueries'

const Modal2 = ({ openModal, onClose, name, lastname,setName,setLastName ,setErrorMessage}) => {
  const params = useParams();
  const { id } = params;

 const [selectedAvatar, setSelectedAvatar] = useState('');
  /**Create staff member  */
 const [addStaff,{  loading }] = useMutation(ADD_STAFF, {
    variables: { id:id, firstName:name,lastName:lastname,avatar:selectedAvatar},
    refetchQueries: [{ query: GET_OFFICES }]
  });


const [error,setError]=useState('')

const createStaff=()=>{
  if(!selectedAvatar) return setError("Please select an avatar")
  addStaff({ id:id, firstName:name,lastName:lastname,avatar:selectedAvatar})
  setLastName('')
  setName('')
  setSelectedAvatar('')
  setError('')
  setErrorMessage('')
  onClose()
}

  //Fetching all the avatars from firebase
  const [avatars, setAvatars] = useState([]);
  useEffect(() => {
    const fetchAllAvatars = () => {
    let list = [];
    const listRef = ref(storage, "avatars");
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {});
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((downloadURL) => {
            list.push(downloadURL);
            setAvatars(list);
           
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
    fetchAllAvatars();
  }, [setAvatars]);


  //Selecting the avatar here
  const handleClickAvatar = (avatar) => {
    setSelectedAvatar(() => {
      return avatar;
    });
  };

  //This show be at the end
  if (!openModal) {
    return null;
  }
  return ReactDom.createPortal(
    <>
      <div className="modal">
        <div className="modal-wrapper">
          <div className="inner-wrapper">
            <div className="heading-wrapper">
              <h3>New Staff Member</h3>
              <AiOutlineCloseCircle color="#0D4477" onClick={onClose} />
            </div>
            <div className="avatar-wrapper">
              <h3>{error ? <span style={{color:"red"}}>{error}</span> : "Avatar"}</h3>
              <div className="avatars">
                {avatars.map((avatar, index) => (
                  <img
                    alt="avatar"
                    key={index}
                    src={avatar}
                    onClick={() => handleClickAvatar(avatar)}
                    style={{
                      borderRadius: "50%",
                      border: `${
                        avatar === selectedAvatar ? `4px solid #475569` : `none`
                      }`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="dots">
              <BsDot color="#489DDA" />
              <BsDot color="#489DDA" />
            </div>
            <div className="button-wrapper">
              <button className="button" onClick={createStaff} >
                {loading ? "Loading.." : "Add Staff"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal2;
