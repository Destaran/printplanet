import styled from 'styled-components';

export const ItemTreeListContainer = styled.ul`
    margin: 0;
    padding: 0;


    li:last-child{
        border-color: transparent;
    }

    li:last-child > div {
        height: 30px;
    }

    // last child horizontal half

    li:last-child > div::after {
        content: '';
        position: relative;
        display: flex;
        height: 22px;
        left: -29px;
        border-left: 2px solid black;
        top: -37px;
        z-index: 1;
        width: 2px;
    }

    // vertical lines

    li::before{
        content: '';
        display: block;
        position: relative;
        top: 15px;
        left: -27px;
        width: 25px;
        border: solid black 1px;
        z-index: 1;
    }

    /* li::after{
        content: '';
        display: block;
        position: relative;
        top: 15px;
        left: -27px;
        width: 25px;
        border: solid black 1px;
    } */
`