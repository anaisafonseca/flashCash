import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 2rem;
    margin-top: -8rem;

    div {
        background: var(--white);
        padding: 2rem 2.5rem;
        border-radius: 0.25rem;
        color: var(--text-title);

        header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 1.25rem;
        }

        strong {
            display: block;
            margin-top: 1.5rem;
            font-size: 2.25rem;
            line-height: 3rem;
            font-weight: 500;
        }

        &.highlightBackground {
            background: var(--green);
            color: var(--white);
        }
    }
`;