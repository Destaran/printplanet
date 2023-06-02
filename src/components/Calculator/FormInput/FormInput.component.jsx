import { Input, Group } from "./FormInput.styles";

export const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
    </Group>
  );
};
