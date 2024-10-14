import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";
import { PencilSquare, Trash } from "react-bootstrap-icons";

const AddressViewer = () => {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/addresses")
      .then((response) => setContacts(response.data))
      .catch((err) => console.error("Error fetching contacts", err));
  }, []);

  const deleteContact = (id) => {
    axios
      .delete(`http://localhost:5000/api/addresses/${id}`)
      .then(() => {
        axios
          .get("http://localhost:5000/api/addresses")
          .then((response) => setContacts(response.data));
      })
      .catch((err) => console.error("Error deleting contact", err));
  };

  const startEditing = (contact) => {
    setEditContact(contact);
  };

  const saveUpdate = (updatedContact) => {
    axios
      .put(
        `http://localhost:5000/api/addresses/${updatedContact._id}`,
        updatedContact
      )
      .then(() => {
        axios.get("http://localhost:5000/api/addresses").then((response) => {
          setContacts(response.data);
          setEditContact(null);
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
          {/* Edit form */}
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
