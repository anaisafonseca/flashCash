import styled from 'styled-components';

export const Container = styled.header`
    background: var(--dark-blue);
`;

export const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    padding: 3rem 1rem 10rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
        display: flex;
        align-items: center;
    }
`;

export const RegisterTransaction = styled.button`
    font-size: 1rem;
    color: var(--white);
    background: var(--blue);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;
    cursor: pointer;

    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.9);
    }
`;

export const Logout = styled.button`
    background: transparent;
    height: 3rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 1.5rem;
    border: 0;
    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.9);
    }
    
    img {
        margin: 0;
        height: 25px;
        width: 25px;
    }
`