import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Navbar from "../../components/navbar";
import TopSection from "./topSection";
import BookCard from "../../components/bookCard";
import { Margin } from "@mui/icons-material";
import Marginer from "../../components/marginer";
import BookingSteps from "./bookingSteps";
import AboutUs from "./aboutUs";
import Footer from "../../components/footer";

const PageContainer = styled.div`
    ${tw`
        flex
        flex-col
        w-full
        h-full
        items-center
        
        justify-center
        pt-10
        lg:pt-20
    `};
    `;

export  default function HomePage() {
    return (
        <PageContainer>
            <Navbar />
            <TopSection />
            <Marginer direction="horizontal" margin="20px" />
            <BookCard />
            <Marginer direction="horizontal" margin="20px" />
            <BookingSteps />
            <Marginer direction="horizontal" margin="5em" />
            <AboutUs />
            <Footer />




        </PageContainer>
    );
}