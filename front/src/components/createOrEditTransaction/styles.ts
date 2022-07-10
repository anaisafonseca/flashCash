import styled from 'styled-components';

export const Container = styled.form`
    h2 {
        color: var(--text-title);
        font-size: 2rem;
        margin-bottom: 2rem;
    }

    input {
        width: 100%;
    }

    button[type=submit] {
        width: 100%;
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

    p {
        font-size: 0.85rem;
        color: var(--text-title);
        padding-top: 0.5rem;
    }
`;


export const TypesContainer = styled.div`
    margin: 1rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
`;


// type buttons ----------------------------------------------------------------
interface TypeButtonProps {
    isActive: boolean;
    activeColor: 'red' | 'green';
};
const typeColors = {
    red: '#efdade',
    green: '#d2e8e0'
}

export const TypeButton = styled.button<TypeButtonProps>`
    height: 4rem;
    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    background: ${
        (props) => props.isActive ?
        typeColors[props.activeColor] :
        'transparent'
    };

    img {
        width: 20px;
        height: 20px;
    }

    span {
        display: inline-block;
        margin-left: 1rem;
        font-size: 1rem;
        color: var(--text-title);
    }

    transition: border-color 0.2s;

    &:hover {
        border-color: #aaaaaa;
    }
`;