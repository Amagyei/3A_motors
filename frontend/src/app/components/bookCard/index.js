import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendarAlt, faCaretDown, faCaretUp  } from "@fortawesome/free-solid-svg-icons";
import Button from "../button";
import Marginer from "../marginer";
import { useState } from "react";
import { SCREENS } from "../responsive";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CardContainer = styled.div`
    box-shadow: 0 1.3px 12px -3px rgba(0, 0, 0, 0.4);
    min-height: 4.3em;
    ${tw`
        flex
        justify-center
        items-center
        rounded-md
        bg-white
        p-2
        md:px-7
    `}
    `;

const ItemContainer = styled.div`
    ${tw`
        flex
        relative
    `}
`;

const Icon = styled.div`
    ${tw`
        text-red-500
        fill-current
        text-xs
        md:text-base
        mr-2
        md:mr-3
    `}
`;

const SmallIcon = styled.div`
    ${tw`
        text-gray-500
        fill-current
        text-xs
        md:text-base
        ml-2
    `}
`;

const Name = styled.span`
    ${tw`
        text-gray-600
        text-xs
        md:text-sm
        cursor-pointer
        select-none
    `}
`;

const LineSeparator = styled.span`
    width: 2px;
    height: 45%;
    ${tw`
        bg-gray-300
        mr-2
        ml-2
    `}
`;

const ButtonsContainer = styled.div`
    ${tw`
        flex
        mt-3
        flex-wrap
`};`

const DateCalendar = styled(Calendar)`
    position: absolute;
    max-width: none;
    top: 2em;
    left: -5em;
    user-select: none;


    @media (min-width: ${SCREENS.md}) {
        left: -2em;
        top: 3.5em;
    }

`;



export default function BookCard() {

    const [startDate, setStartDate] = useState(new Date());
    const [isStartCalendarOpen, setStartCalendarOpen] = useState(false);
    const toggleStartDateCalendar = () => {
        setStartCalendarOpen(!isStartCalendarOpen);
    };
    console.log(startDate);
  return (
    <CardContainer>
      <ItemContainer>
        <Icon>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
        </Icon>
        <Name>Location</Name>
      </ItemContainer>
      <LineSeparator />
      <ItemContainer>
        <Icon>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </Icon>
        <Name onClick={toggleStartDateCalendar}>Pick-Up Date</Name>
        <SmallIcon>
            <FontAwesomeIcon icon={isStartCalendarOpen ? faCaretUp: faCaretDown} />
        </SmallIcon>
        {isStartCalendarOpen && <DateCalendar value={startDate}  onChange={setStartDate}/>}
        
      </ItemContainer>
      <LineSeparator />
      <Marginer direction="horizontal" margin="2em" />
      <ButtonsContainer>
        <Button text="Book Your Service" />
      </ButtonsContainer>
        
    </CardContainer>
  );
}