import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import BlobImg from "../../../assets/images/blob.svg";
import CorollaImg from "../../../assets/images/corolla_banner_no_bg.png";
import { SCREENS } from "../../components/responsive";
import Button from "../../components/button";


const TopSectionContainer = styled.div`
    min-height: 400px;
    margin-top: 6em;
    ${tw`
        w-full
        max-w-screen-2xl
        flex
        justify-between
        pl-3
        pr-3
        lg:pl-12
        lg:pr-12
    `};
`;

const LeftContainer = styled.div`
    ${tw`
        w-1/2
        flex
        flex-col
        h-full
    `};
`;

const RightContainer = styled.div`
    ${tw`
        w-1/2
        flex
        flex-col
        relative
        mt-20
    `};
`;

const Slogan = styled.h1`
    ${tw`
        font-bold
        text-2xl
        xl:text-6xl
        sm:text-3xl
        md:text-5xl
        lg:font-black
        md:font-extrabold
        text-black
        mb-4
        sm:leading-snug
        lg:leading-normal
        xl:leading-relaxed
    `};
`;

const Desciption = styled.p`
    ${tw`
        text-sm
        lg:text-lg
        xl:text-lg
        sm:max-h-full
        overflow-hidden
        text-gray-800
        h-auto
    `};
`; 

const BlobContainer = styled.div`
    width: 20em;
    height: 10em;
    position: absolute;
    right: -5em;
    top: -9em;
    z-index: -1;
    transform: rotate(-30deg);

    img {
        width: 100%;
        height: auto;
        max-height: max-content;
    }
    @media (min-width: ${SCREENS.sm}) {
        width: 40em;
        max-height: 10em;
        right: -9em;
        top: -16em;
        transform: rotate(-25deg);

    }
    @media (min-width: ${SCREENS.md}) {
        width: 40em;
        max-height: 10em;
        right: -5em;
        top: -16em;
        transform: rotate(-25deg);
        
    }

    @media (min-width: ${SCREENS.lg}) {
        width: 40em;
        max-height: 30em;
        right: -7em;
        top: -16em;
        transform: rotate(-30deg);
        
    }
        @media (min-width: ${SCREENS.xl}) {
        width: 70em;
        max-height: 30em;
        right: -15em;
        top: -25em;
        transform: rotate(-20deg);
        
    }
`;

const StandaloneCar = styled.div`
    width: auto;
    height: auto;
    right: -6em;
    top: -5em;
    position: absolute;
    img {
        width: 100%;
        height: auto;
        max-width: fit-content;
    }
    @media (min-width: ${SCREENS.sm}) {
        height: 16em;
        right: -6em;
        top: -6em;

    }
    @media (min-width: ${SCREENS.lg}) {
        height: 21em;
        right: -6em;
        top: -5em;
        
    }
    @media (min-width: ${SCREENS.sm}) {
        height: 10em;
        right: -6em;
        top: -5em;
        
    }
`;

const ButtonsContainer = styled.div`
    ${tw`
        flex
        mt-3
        flex-wrap
`};`


export default function TopSection() {
    return (
        <TopSectionContainer>
            <LeftContainer>
                <Slogan>Your Car is Safest With Us</Slogan>
                <Desciption>
                    Your Car's Favourite doctor is now available 24/7 at the tip of your fingers. We know what it needs. we made it.
                    

                    
                </Desciption>
                <ButtonsContainer>
                    <Button text="Book Your Service" />
                    <Button theme="filled"  text="Buy a Car"/>
                </ButtonsContainer>
                
            </LeftContainer>
            <RightContainer>
                <BlobContainer>
                    <img src={BlobImg} alt="" />
                </BlobContainer>
                <StandaloneCar>
                    <img src={CorollaImg} alt="" />
                </StandaloneCar>
            </RightContainer>
            
        </TopSectionContainer>
    );
}