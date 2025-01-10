import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SCREENS } from "../../components/responsive";

import JeepImg from "../../../assets/images/jeep.png";
import CorollaImg from "../../../assets/images/corolla_banner_no_bg.png";


const AboutUsContainer= styled.div`
    ${tw`
        w-full
        flex
        flex-col
        md:flex-row
        items-center
        2xl:justify-center
        pt-4
        pb-4
        px-7
        lg:pt-6
        lg:pb-6
        md:pl-0
        bg-white
    `};
`;

const CarContainer = styled.div`  
    width: auto;
    height: 15em;
    margin-left: -30px;

    img {
        width: auto;
        height: 100%;
    }
    
    @media (min-width: ${SCREENS.md}) {
        height: 28em;
    }
    
    @media (min-width: ${SCREENS.lg}) {
        height: 30em;
    }

    @media (min-width: ${SCREENS["2xl"]}) {
        height: 35em;
        margin-left: 0;
    }

    
`;

const InfoContainer = styled.div`
    ${tw`
        w-1/2
        flex
        flex-col
        md:ml-6
        2xl:ml-16
    `};
`;

const Title = styled.h1`
    ${tw`
        text-2xl
        md:text-5xl
        text-black
        font-extrabold
        md:leading-normal
    `};
`;

const InfoText = styled.p`

    ${tw`
        text-black
        text-sm
        md:text-base
        mt-4
        font-normal

    `}; 
`;

const CarTitle = styled.h2`
    ${tw`
        text-3xl
        lg:text-5xl
        text-black
        font-extrabold
    `};
`;

const AboutUsText = styled.p`
    ${tw`
        text-black
        text-lg
        font-normal
        max-w-2xl
        mt-4
    `};
`;

const CarText = styled.p`
    ${tw`
        text-black
        text-lg
        font-normal
        max-w-2xl
        mt-4
    `};
`;

const CarImage = styled.div`
    width: auto;
    height: 15em;
    img {
        width: auto;
        height: 100%;
    }
`;

const AboutUsImage = styled.div`
    width: auto;
    height: 15em;
    img {
        width: auto;
        height: 100%;
    }
`;

export default function AboutUs() {
    return (
        <AboutUsContainer>
            <CarContainer>
                <CarImage>
                    <img src={CorollaImg} alt="car"/>
                </CarImage>
            </CarContainer>
            <InfoContainer>
                <Title>Driving Excellence with 3A Motors</Title>
                <InfoText>
                At 3A Motors, we are passionate about redefining the automotive experience for our customers. With a steadfast commitment to excellence, we specialize in providing top-notch automotive services, including vehicle sales, maintenance, and spare parts supply. Founded with the mission to deliver exceptional quality and unparalleled customer satisfaction, 3A Motors has grown into a trusted name in the industry.

Our dedicated team of experts is here to ensure that every interaction is seamless, whether you’re purchasing a car, scheduling a service appointment, or seeking genuine parts for your vehicle. We pride ourselves on our transparent processes, innovative solutions, and a customer-centric approach that sets us apart.

As a company, we believe in staying ahead of the curve by embracing cutting-edge technology and sustainable practices to meet the evolving needs of our clients. At 3A Motors, we’re not just about cars; we’re about building lasting relationships based on trust, quality, and reliability. Let us drive your automotive journey forward.
                </InfoText>
            </InfoContainer>
        </AboutUsContainer>
    );
        
}