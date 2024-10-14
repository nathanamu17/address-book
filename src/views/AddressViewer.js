import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";
import { PencilSquare, Trash } from "react-bootstrap-icons";

const AddressViewer = () => {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phone: "",
    streetAddress: "",
  });

  useEffect(() => {
    // Fetch all contacts on initial load
    axios
      .get("http://localhost:3001/api/addresses")
      .then((response) => setContacts(response.data))
      .catch((err) => console.error("Error fetching contacts", err));
  }, []);

  const deleteContact = (id) => {
    // Delete the contact by ID
    axios
      .delete(`http://localhost:3001/api/addresses/${id}`)
      .then(() => {
        // Refresh contact list after deletion
        axios
          .get("http://localhost:3001/api/addresses")
          .then((response) => setContacts(response.data));
      })
      .catch((err) => console.error("Error deleting contact", err));
  };

  const startEditing = (contact) => {
    // Start editing by setting the selected contact's data in the form
    setEditContact(contact);
    setFormData(contact);
  };

  const handleInputChange = (e) => {
    // Update form data on input change
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveUpdate = (e) => {
    e.preventDefault();
    // Send PUT request to update contact
    axios
      .put(`http://localhost:3001/api/addresses/${editContact._id}`, formData)
      .then(() => {
        // Refresh contact list after update
        axios.get("http://localhost:3001/api/addresses").then((response) => {
          setContacts(response.data);
          setEditContact(null); // Exit edit mode
        });
      })
      .catch((err) => console.error("Error updating contact", err));
  };

  return (
    <div className="contacts-viewer">
      <h2>Contacts</h2>
      <Menu />

      {editContact ? (
        <div>
          <h3>Edit Contact</h3>
          {/* Edit form for updating the contact */}
          <form onSubmit={saveUpdate}>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              required
            />
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              required
            />
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              placeholder="Street Address"
              required
            />
            <button type="submit">Save</button>
            <button onClick={() => setEditContact(null)}>Cancel</button>
          </form>
        </div>
      ) : (
        contacts.map((contact) => (
          <div className="contact-card" key={contact._id}>
            <h5>Name: {contact.fullName}</h5>
            <p>Email: {contact.emailAddress}</p>
            <p>Phone: {contact.phone}</p>
            <p>Address: {contact.streetAddress}</p>
            <button onClick={() => deleteContact(contact._id)}>
              <Trash />
            </button>
            <button onClick={() => startEditing(contact)}>
              <PencilSquare />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AddressViewer;
