import { Input, Group } from './CalculatorFormInput.styles';

const CalculatorFormInput = ({label, ...otherProps}) => {
    return (
        <Group>
            <Input {...otherProps}/>
        </Group>
    )
}

export default CalculatorFormInput;