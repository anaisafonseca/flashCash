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
    flex-direction: column;
    justify-content: center;
    align-items: center;
	width: 100vw;
    height: 100vh;
    background-color: var(--background);
    width: 65px;
    margin: auto;
`
