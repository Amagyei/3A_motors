import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import tw from "twin.macro";
import styled from "styled-components";

import Login from "./app/Pages/Login";
import HomePage  from "./app/Pages/HomePage/index";


export default class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<HomePage />} />

                    <Route path="*" element={<div>Page Not Found</div>} />
                </Routes>
            </Router>
        );
    }
}

