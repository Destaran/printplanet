import styled from 'styled-components';

export const SummaryWindowContainerDiv = styled.div`
    min-width: auto;
    height: auto;
    width: auto;
    display: flex;
    justify-content: start;
    margin-bottom: 22.5px;
`

export const SummaryWindowContainer = styled.div`
    min-width: auto;
    height: auto;
    width: auto;
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
    grid-template-columns: repeat(9, auto);
    border: 1px black solid;
    background-color: white;
    width: 100%;
    height: auto;
`

export const TitleText = styled.p`
    margin: 0;
`