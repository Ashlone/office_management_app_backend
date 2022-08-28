import React, { useState } from "react";
import "./Card.css";
import { HiOutlineUserGroup, HiOutlineLocationMarker } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { MdOutlinePhone, MdOutlineModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Card = ({ office }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ borderLeftColor: `${office.color}` }}
      className="card-wrapper"
    >
      <div className="title">
        <h3>{office.officeName}</h3>
        <MdOutlineModeEditOutline
          onClick={() => navigate(`/officeview/${office.id}`)}
        />
      </div>

      <div className="staff-member">
        <HiOutlineUserGroup color="#484954" />
        <p>{office.staff.length}</p>
      </div>
      <hr className="line-divider" />
      <div>
        {!open ? (
          <div className="moreinfo" onClick={() => setOpen(true)}>
            <p>More info</p>
            <IoIosArrowDown color="#0D4477" />
          </div>
        ) : (
          <div className="moreinfo" onClick={() => setOpen(false)}>
            <p>More info</p>
            <IoIosArrowUp color="#0D4477" />
          </div>
        )}
      </div>

      {open && (
        <>
          <div className="staff-member">
            <MdOutlinePhone color="#484954" />
            <p>{office.phone}</p>
          </div>
          <div className="staff-member">
            <IoMailOutline color="#484954" />
            <p>{office.email}</p>
          </div>
          <div className="staff-member">
            <HiOutlineUserGroup color="#484954" />
            <p>Office Capacity: {office.maximumCapacity}</p>
          </div>

          <div className="staff-member">
            <HiOutlineLocationMarker color="#484954" />
            <p>{office.physicalAddress}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
