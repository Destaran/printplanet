import { Select, Group } from "./FormSelect.styles";

export const FormSelect = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Select {...otherProps}>
        <option value={1}>/s</option>
        <option value={1 / 60}>/m</option>
        <option value={1 / 360}>/h</option>
      </Select>
    </Group>
  );
};
