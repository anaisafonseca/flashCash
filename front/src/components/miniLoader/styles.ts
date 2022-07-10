import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    from {
        transform: rotateY(0deg);
    }

    to {
        transform: rotateY(-180deg);
    }
`

export const Rotate = styled.div`
    animation: ${rotate} .5s ease-in-out infinite alternate-reverse both;
`

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
	width: 100%;
    height: 100%;
    width: 50px;
    margin: auto;
`
