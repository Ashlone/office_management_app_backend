import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiSearch, BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";
import "./OfficeView.css";
import Modal from "../../components/modal/Modal";
import Modal3 from "../../components/modal/Modal3";
import { useNavigate , useParams} from "react-router-dom";
import OfficeViewCard from "../../components/cards/OfficeViewCard";
import { GET_OFFICE} from "../../queries/officeQueries";
import { useQuery } from "@apollo/client";
import Spinner from "../../components/loader/Spinner"

const OfficeView = () => {
  //set states
  const [showModal, setShowModal] = useState(false);
  const [openEditDeleteModal, setOpenEditDeleteModal] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [query, setQuery] = useState("");
  const [staffmemberid,setStaffMemberId]=useState('')

const {data,loading ,error}= useQuery(GET_OFFICE, { variables: { id } }); //destructuring data ,loading and error returned from the server

if (loading) return <Spinner/>;
  if (error)
    return <p>Something went wrong .Please try to refresh your page</p>;
 
 
const handleClick=(staffid)=>{
  setOpenEditDeleteModal(true)
  setStaffMemberId(() => {
      return staffid;
    });
  
}

  return (
    <div>
      <div className="title-wrapper">
        <AiOutlineArrowLeft onClick={() => navigate("/")} />
        <h2>Office</h2>
        <span>hidden</span>
        {/**This element will be hidden */}
      </div>
      <OfficeViewCard office={data.office} />
      <div className="search-input">
        <input type="text" onChange={(e) => setQuery(e.target.value)}  />
        <BiSearch />
      </div>
      <div className="staff-members-heading">
        <h3>Staff Members In Office</h3>
        <span>{data.office.staff.length}</span>
      </div>
      {data.office.staff.length >0 ? ( data.office?.staff
        .filter((user) => user.firstName.includes(query))
        .map((member) => (
          <div key={member.id} className="staff-members-list">
            <img src={member.avatar} alt="avatars" />
            <h6>{member.firstName + "  " + member.lastName} </h6>
            <BiDotsVerticalRounded onClick={()=>handleClick(member.id)} />
          </div>
        ))):(
 <p>No Staff Members</p>
        )}

      <div className="floating-button">
        <IoIosAddCircle
          size="60px"
          color="#0D4477"
          onClick={() => setShowModal(true)}
        />
      </div>
      <Modal showModal={showModal} closeAddModal={ () => setShowModal(false)} />
      <Modal3
        openEditDeleteModal={openEditDeleteModal}
        setOpenEditDeleteModal={setOpenEditDeleteModal}
        staffmemberid={staffmemberid}
      />
    </div>
  );
};

export default OfficeView;
