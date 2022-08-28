import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#0D4477",
};

const Spinner = () => {
    return (
        <div>
           <ClipLoader cssOverride={override} size={150} />
        </div>
    )
}

export default Spinner
