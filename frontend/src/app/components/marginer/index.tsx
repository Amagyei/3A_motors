import React from "react";
import styled from "styled-components";

export interface IMarginerProps {
    margin: number | string;
    direction?: 'horizontal' | 'vertical';
}

const HorizontalMargin = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'margin',
})<{ margin: number | string }>`
    margin-top: ${({ margin }) => (typeof margin === 'string' ? margin : `${margin}px`)};
`;

const VerticalMargin = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'margin',
})<{ margin: number | string }>`
    margin-left: ${({ margin }) => (typeof margin === 'string' ? margin : `${margin}px`)};
`;

export default function Marginer(props: IMarginerProps) {
    const { margin, direction = 'vertical' } = props;

    if (direction === 'horizontal') {
        return <HorizontalMargin margin={margin} />;
    } else {
        return <VerticalMargin margin={margin} />;
    }
}