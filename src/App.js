// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddressViewer from "./views/AddressViewer"; // View for displaying addresses
import AddressForm from "./views/AddressForm"; // Form for adding/updating addresses
import NotFound from "./views/NotFound"; // Add NotFound component

function App() {
  return (
    <Router>
      <div className="main-container d-flex flex-column min-vh-100">
        <Routes>
          <Route exact path="/" element={<AddressViewer />} />
          <Route exact path="/new-address" element={<AddressForm />} />
          <Route path="*" element={<NotFound />} />{" "}
          {/* Catch-all route for 404 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
