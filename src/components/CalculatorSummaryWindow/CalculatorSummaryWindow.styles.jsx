import styled from 'styled-components';

export const SummaryWindowContainer = styled.div`
    max-width: 31%;
    min-width: auto;
    height: auto;
`

export const SummaryWindowOutter = styled.div`
    display: inline-flex;
    height: auto;
    width: fit-content;
    align-items: center;
    justify-content: center;
    border: 1px black solid;
    background-color: #14213d;
    margin: 0;
    padding: 4px;
`

export const SummaryWindowInner = styled.div`
    display: grid;
    grid-template-columns: repeat(6, auto);
    border: 1px black solid;
    background-color: white;
    width: 100%;
    height: auto;
`

export const TitleText = styled.p`
    margin: 0 0 1px 6px;
`