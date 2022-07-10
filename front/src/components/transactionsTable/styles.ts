import styled from 'styled-components';


export const Container = styled.div`
    margin-top: 4rem;

    span {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 7rem;
        color: var(--text-body);
    }

    table {
        width: 100%;
        border-spacing: 0 0.5rem;

        th {
            color: var(--text-body);
            font-weight: 400;
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1.5rem;
        }

        tr {
            &:hover {
                td {
                    &.iconColumn {
                        button {
                            visibility: visible;
                        }
                    }
                }
            }

        }

        td {
            padding: 1rem 2rem;
            border: 0;
            background: var(--white);
            color: var(--text-body);
            border-radius: 0.2rem;

            &.dateColumn {
                max-width: 6rem;
            }            
            
            &.iconColumn {
                padding-right: 0;
                max-width: 4.5rem;
                text-align: right;
                
                button {
                    visibility: hidden;
                    font-size: 1rem;
                    background: transparent;
                    border: 0;
                    padding: 0.4rem 2.5rem 0 0;
                    width: 2rem;
                    height: 2rem;
                    margin: 0;
                    
                    img {
                        color: var(--text-body);
                        height: 1.25rem;
                    }
    
                    transition: filter 0.2s;
    
                    &:hover {
                        filter: brightness(0.5);
                        visibility: visible;
                    }
                }
            }

            &:first-child {
                color: var(--text-title);
            }

            &.deposit {
                max-width: 6rem;
                color: var(--green)
            }

            &.debit {
                max-width: 6rem;
                color: var(--red)
            }
        }
    }
`