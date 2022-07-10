import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background: var(--background);    
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin-bottom: 6rem;    

    h2 {
        color: var(--text-title);
        font-size: 2rem;
        margin-bottom: 2rem;
    }

    input {
        width: 25%;
        min-width: 25rem;
        max-width: 40rem
    }

    button[type=submit] {
        width: 25%;
        min-width: 25rem;
        max-width: 40rem;
        cursor: pointer;
        padding: 0 1.5rem;
        height: 4rem;
        background: var(--green);
        color: var(--white);
        border-radius: 0.25rem;
        border: 0;
        font-size: 1rem;
        font-weight: 600;
        margin-top: 2rem;
        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.9);
        }

        &:disabled {
            background: #9FA3B4;
            opacity: 0.6;
            cursor: not-allowed;
        }
    }
`

export const SignUp = styled.button`
    margin-top: 1rem;
    border: none;
    cursor: pointer;
`