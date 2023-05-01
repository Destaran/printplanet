import styled from 'styled-components';

export const SignUpContainer = styled.div`
    font-size: 16px;
    margin: 40px auto;
    padding: 0;
    width: 300px;
    display: flex;
    justify-content: center;
    border: 1px black solid;
    border-radius: 10px;

    span {
        color: black;

        &:hover {
            cursor: pointer;
            color: orange;
        }
    }
`