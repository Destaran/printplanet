import styled, { css } from 'styled-components';

const subColor = 'black';
const mainColor = 'black';

export const shrinkLabelStyles = css`
  top: 0px;
  font-size: 12px;
  color: ${mainColor};
`
export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 27px;
  transition: 300ms ease all;

  ${({shrink}) => shrink && shrinkLabelStyles};
`

export const Select = styled.select`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  display: block;
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${subColor};
  margin: 15px 0;
  padding: 10px;
  height: 42.5px;

  &:focus {
    outline: none;
  }

  &:focus ~ ${FormInputLabel} {
    ${shrinkLabelStyles};
  }
`

export const Group = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  margin: 0;
  input[type='password'] {
  }
`