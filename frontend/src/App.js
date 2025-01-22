import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { FiSettings } from "react-icons/fi";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";


import tw from "twin.macro";
import styled from "styled-components";

import Login from "./app/Pages/Login";
import HomePage  from "./app/Pages/HomePage/index";
import Dashboard from "./app/Pages/Dashboard";



export default class App extends Component {
    render() {
        return (
            <div>
                <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/dashboard/*" element={<Dashboard />} />

                    <Route path="*" element={<div>Page Not Found</div>} />
                </Routes>
            </Router>

            </div>
            
        );
    }
}

