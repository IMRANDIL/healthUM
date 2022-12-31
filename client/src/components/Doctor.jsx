import React from "react";
import { useNavigate } from "react-router-dom";

const Doctor = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2"
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}
    >
      <h1 className="card_title">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr />
      <p className="card_text">
        <b>Experience : </b>
        {doctor.experience} Yrs
      </p>
      <p className="card_text">
        <b>Mobile Number : </b>
        {doctor.mobileNumber}
      </p>
      <p className="card-text">
        <b>Address : </b>
        {doctor.address}
      </p>
      <p className="card-text">
        <b>Fees : </b>
        {doctor.feePerConsultation} Rupees
      </p>
      <p className="card-text">
        <b>Timings : </b>
        {doctor.timings[0]}am - {doctor.timings[1]}pm
      </p>
    </div>
  );
};

export default Doctor;
