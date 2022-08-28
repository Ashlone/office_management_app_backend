import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import "./Modal6.css";
import ReactDom from "react-dom";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../firebase";
import {  useParams} from "react-router-dom";
import { UPDATE_STAFF } from '../../mutations/officeMutations';
import { useMutation } from '@apollo/client';
import {GET_OFFICES} from'../../queries/officeQueries'

const Modal6 = ({ openContinueEditModal, onClose, staffID, name,lastname,redirect, staffAvatar}) => {
   
   const params=useParams()
   const { id } = params;
 
  
  //Fetching all the avatars from firebase
  const [avatars, setAvatars] = useState([]);
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

useEffect(() => {
    fetchAllAvatars();
  }, []);

  
  //Selecting Avatar
  const [selectedAvatar,setSelectedAvatar]=useState('')

  useEffect(()=>{
setSelectedAvatar(staffAvatar)
  },[staffAvatar])


  const handleClickAvatar = (avatar) => {
    setSelectedAvatar(() => {
      return avatar;
    });
  };


 /**Update staff member  */
 const [updateStaff,{  loading }] = useMutation(UPDATE_STAFF, {
    variables: { id:id,staffid:staffID, firstName:name,lastName:lastname,avatar:selectedAvatar},
    onCompleted: redirect,
    refetchQueries: [{ query: GET_OFFICES }]
  });


const updateStaffMember=()=>{
  updateStaff({ id:id,staffid:staffID, firstName:name,lastName:lastname,avatar:selectedAvatar})
}


  //should be at the end
  if (!openContinueEditModal) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className="modal">
        <div className="modal-wrapper">
          <div className="inner-wrapper">
            <div className="heading-wrapper">
              <h3>Edit Staff Member</h3>
              <AiOutlineCloseCircle size="20px" color="#0D4477" onClick={onClose} />
            </div>
            <div className="avatar-wrapper">
              <h3>Avatar</h3>
              <div className="avatars">
                {avatars.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt="avatar"
                    onClick={() => handleClickAvatar(avatar)}
                    style={{
                      borderRadius: "50%",
                      border: `${
                        avatar === selectedAvatar
                          ? `4px solid #475569`
                          : `none`
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
            <div className="button">
              <button onClick={ updateStaffMember}>{loading ? "Loading.." : "Update Staff Member" }</button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal6;
