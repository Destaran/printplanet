import styled, { css } from "styled-components";

const shrinkLabelStyles = css`
  top: 0px;
  font-size: 12px;
  color: black;
`;

interface InputProps {
  shrink: boolean;
}

const FormInputLabel = styled.label<InputProps>`
  color: black;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 27px;
  transition: 300ms ease all;

  ${({ shrink }) => shrink && shrinkLabelStyles};
`;

const Select = styled.select`
  background: none;
  background-color: white;
  color: ${({ color }) => (color ? color : "black")};
  font-size: 18px;
  display: block;
  width: 100%;
  border: 1px solid black;
  margin-bottom: 15px;
  height: 22px;

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
`;

export function UnitSelect({ ...otherProps }) {
  return (
    <Group>
      <Select {...otherProps}>
        <option value={1}>/s</option>
        <option value={1 / 60}>/m</option>
        <option value={1 / 360}>/h</option>
      </Select>
    </Group>
  );
}
