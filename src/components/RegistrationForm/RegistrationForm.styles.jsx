import styled from 'styled-components';

export const RegistrationContainer = styled.div`
    margin: 30px auto;
    padding: 0;
    width: 300px;
    border: 1px black solid;
    background-color: white;
    border-radius: 10px;
`

export const InnerRegistrationContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 25px;
`

export const Form = styled.form`
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
`

export const DateOfBirthContainer = styled.div`
    margin: 15px 0 15px 0;
    width: 100%;
    justify-content: left;
    label {
        display: block;
        margin-bottom: 3px;
    }
`

export const ContainerHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`