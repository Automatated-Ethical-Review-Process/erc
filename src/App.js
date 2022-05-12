import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/DefaultLayout";
import AfterLoginLayout from "./components/DashboardLayout";

function App() {
   const sample = (
      <div style={{ width: "100%", height: "100%", backgroundColor: "red" }}>
         <h1>Hello</h1>
      </div>
   );
   return (
      <Router>
         <Routes>
            <Route
               exact
               path="/dashboard"
               element={<AfterLoginLayout content={sample} />}
            />
            <Route exact path="/login" element={<Layout />} />

            <Route path="*" element={<h1>Not Found</h1>} />
         </Routes>
      </Router>
   );
}

export default App;
