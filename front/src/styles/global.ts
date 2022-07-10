import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #F0F0F0;
        --input-background: #e7e9ee;
        --white: #FFFFFF;

        --red: #E52E4D;
        --green: #27C68C;
        --blue: #1A3989;
        --dark-blue: #0B1B54;

        --text-title: #363F5F;
        --text-body: #969CB3;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%; //15px
        }
        
        @media (max-width: 720) {
            font-size: 87.5%; //14px
        }
    }

    body { 
        background: var(--background);
        -webkit-font-smoothing: antialiased;
    }

    body, input, text-area, button, span {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong  {
        font-weight: 600;
    }

    input {
        background: var(--input-background);
        min-height: 4rem;
        padding: 0 1.5rem;
        border-radius: 0.25rem;
        border: 1px solid #d7d7d7;
        font-weight: 400;
        font-size: 1rem;

        &::placeholder {
            color: var(--text-body);
        }

        & + input {
            margin-top: 2rem;
        }
    }

    .react-modal-overlay {
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .react-modal-content {
        width: 100%;
        max-width: 576px;
        background: var(--background);
        padding: 3rem;
        position: relative;
        border-radius: 0.25rem;
    }

    .react-modal-close {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        border: 0;
        background: transparent;
        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.75);
        }
    }
`