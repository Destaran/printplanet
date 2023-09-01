import styled, { css } from "styled-components";

const shrinkLabelStyles = css`
  top: 0px;
  font-size: 12px;
  color: "black";
`;

interface FormInputLabelProps {
  shrink: boolean;
}

const FormInputLabel = styled.label<FormInputLabelProps>`
  color: "black";
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
  color: ${({ color }) => (color ? color : "black")};
  font-size: 18px;
  display: block;
  width: 100%;
  border: 1px solid black;
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
`;

interface Props {
  value: string;
  label?: string;
  required?: boolean;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  color?: string;
}

export const FormInput = ({ label, ...otherProps }: Props) => {
  const hasText = otherProps.value.length > 0;

  return (
    <Group>
      <Input {...otherProps} />
      {label && <FormInputLabel shrink={hasText}>{label}</FormInputLabel>}
    </Group>
  );
};
