import styled from 'styled-components';

export const CalculatorItemSelectContainer = styled.div`
    display: flex;
    height: 100px;
    justify-content: space-between;
    margin-bottom: 22.5px;
`

export const ItemSelectContainer = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
`

export const QuantitySelectContainer = styled.div`
    width: 10%;
`

export const BeltContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`

export const BeltButton = styled.img`
    width: 24px;
    height: auto;
    &:hover {
        cursor: pointer;
    }
`

export const UnitSelectContainer = styled.div`
    width: 10%;
`

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    width: 15%;
    margin: 0 7.5px 0 7.5px;
`

export const ResetButton = styled.button`
    height: 42.5px;
`
