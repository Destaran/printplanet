import styled from 'styled-components';

export const OutterElementContainer = styled.div`
    border: 1px solid white;
    height: 26px;
    width: 52px;
    padding: 2px;
    background-color: #14213d;
`

export const InnerElementContainer = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    background-color: #ba7900;
`

export const ImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    object-fit: contain;
    background-color: white;
    img {
        height: 100%;
        width: auto;
    }
`

export const NumberContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    color: white;
    p {
        margin: 0;
    }
`