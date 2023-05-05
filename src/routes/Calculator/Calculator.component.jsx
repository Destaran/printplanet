import data from '../../utils/recipes/recipes.dictionary.json';

import CalculatorItemSelect from '../../components/CalculatorItemSelect/CalculatorItemSelect.component';
import CalculatorSummary from '../../components/CalculatorSummary/CalculatorSummary.component';

import { CalculatorContainer } from './Calculator.styles';


const Calculator = () => {

    return (
        <CalculatorContainer>
            <CalculatorItemSelect/>
            <CalculatorSummary/>
        </CalculatorContainer>
    );
};

export default Calculator;