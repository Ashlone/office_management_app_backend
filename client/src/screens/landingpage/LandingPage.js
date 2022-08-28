import React from "react";
import Card from "../../components/cards/Card";
import "./LandingPage.css";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_OFFICES } from "../../queries/officeQueries";
import Spinner from "../../components/loader/Spinner"


const LandingPage = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_OFFICES); //destructiring data ,loading and error returned from the server

  if (loading) return <Spinner/>;
  if (error)
    return <p>Something went wrong .Please try to refresh your page.</p>;

  return (
    <div className="wrapper">
      <h2 className="title">All Offices</h2>
      <div className="column">
        {data.offices?.length > 0 ? (
          data?.offices.map((office) => (
            <Card key={office.id} office={office} />
          ))
        ) : (
          <p>No Offices</p>
        )}
      </div>
      <div className="floating-button">
        <IoIosAddCircle
          onClick={() => navigate("/newoffice")}
          size="60px"
          color="#0D4477"
        />
      </div>
    </div>
  );
};

export default LandingPage;
