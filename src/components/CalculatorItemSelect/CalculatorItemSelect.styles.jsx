import styled from 'styled-components';

const ppBlue = '#14213d'
const ppBrown = '#8e5c00'

export const CalculatorItemSelectContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 112px;
    margin-bottom: 22.5px;
    input, select {
        border-radius: 0px;
    }
`

export const SelectionContainer = styled.div`
    display: flex;
    border: 1px solid ${ppBlue};
    padding: 10px;
    width: auto;
    input, select {
        margin-top: 0;
    }
`

export const MachinesContainer = styled.div`
    display: flex;
    border: 1px solid ${ppBlue};
    padding: 10px;
    width: auto;
    input, select {
        margin-top: 0;
    }
`

export const OptionsContainer = styled.div`
    display: flex;
    border: 1px solid ${ppBlue};
    padding: 10px;
    width: auto;
    input, select {
        margin-top: 0;
    }
`

export const MenusContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 10%;
    border: 1px solid ${ppBlue};
    padding: 5px;
`

export const SearchBarContainer = styled.div`
    width: 305px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
`

export const CurrentItemContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    width: 100%;
    height: 30px;
    background-color: ${ppBlue};
    p {
        margin: 0;
        color: #f4f1de;
        font-size: 16px;
    }
    img {
        height: 24px;
        width: auto;
        margin: 0 5px 0 5px;
        background-color: white;
        border: 2px solid black;
    }
`

export const QuantitySelectContainer = styled.div`
    width: 110px;
    margin-right: 10px;
`

export const BeltsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export const BeltContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    border: 2px solid black;
    background-color: ${ppBlue};

    &:hover {
        background-color: orange;
        cursor: pointer;
    }

    &:active {
        background-color: ${ppBlue};
    }
`

export const BeltButton = styled.img`
    width: 24px;
    height: auto;
`

export const UnitSelectContainer = styled.div`
    width: 15%;
    select {
        height: 43px;
    }
`

export const AddButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    button {
        margin: 0;
        height: 32px;
        width: 100%;
        border-radius: 0;
    }
`

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 0;
    button {
        margin: 2px;
        height: 28px;
    }
`

export const DefaultMachines = styled.div`
    
`