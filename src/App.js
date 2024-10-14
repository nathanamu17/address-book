import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddressViewer from "./views/AddressViewer";
import AddressForm from "./views/AddressForm";

function App() {
  const [editingAddress, setEditingAddress] = useState(null);

  const handleEdit = (address) => {
    setEditingAddress(address);
  };

  const handleFormSubmit = (newOrUpdatedAddress) => {
    setEditingAddress(null); // Clear the form after submission
    // Optionally refresh the AddressViewer after submission
  };

  return (
    <Router>
      <div className="main-container d-flex flex-column min-vh-100">
        <Routes>
          <Route
            exact
            path="/"
            element={<AddressViewer onEdit={handleEdit} />}
          />
          <Route
            exact
            path="/new-address"
            element={
              <AddressForm
                address={editingAddress}
                onSubmit={handleFormSubmit}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
