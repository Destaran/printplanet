import { Input, Group } from "./FormInput.styles";

export const FormInput = ({ ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
    </Group>
  );
};
