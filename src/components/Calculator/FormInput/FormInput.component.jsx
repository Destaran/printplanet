import styled, { css } from "styled-components";

const subColor = "black";
const mainColor = "black";

const shrinkLabelStyles = css`
  top: 0px;
  font-size: 12px;
  color: ${mainColor};
`;
const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 27px;
  transition: 300ms ease all;

  ${({ shrink }) => shrink && shrinkLabelStyles};
`;

const Input = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  display: block;
  width: 100%;
  border: 1px solid ${subColor};
  margin: 15px 0;
  height: 20px;
  padding: 10px;

  &:focus {
    outline: none;
  }

  &:focus ~ ${FormInputLabel} {
    ${shrinkLabelStyles};
  }
`;

const Group = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  margin: 0;
  input[type="password"] {
  }
`;

export const FormInput = ({ ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
    </Group>
  );
};
