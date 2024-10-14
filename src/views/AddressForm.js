import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";

const AddressForm = () => {
  const navigate = useNavigate();
  const [addressData, setAddressData] = useState({
    fullName: "",
    emailAddress: "",
    phone: "",
    streetAddress: "",
  });

  const handleInputChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/addresses", addressData)
      .then(() => navigate("/"));
  };

  return (
    <div className="form-wrapper min-vh-100">
      <h2>Add New Address</h2>
      <Menu />
      <form onSubmit={submitForm}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="emailAddress"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Street Address</label>
          <input
            type="text"
            name="streetAddress"
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddressForm;
