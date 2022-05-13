import React from "react";

import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

import {Outlet} from 'react-router-dom';
export default function MainLayout(props) {
   return (
      <div>
         <NavigationBar />
         <Outlet/>
         <Footer />
      </div>
   );
}
