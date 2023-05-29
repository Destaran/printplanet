import data from '../../utils/recipes/recipes.dictionary.json';

import CalculatorItemSelect from '../../components/CalculatorItemSelect/CalculatorItemSelect.component';
import CalculatorSummary from '../../components/CalculatorSummary/CalculatorSummary.component';
import CalculatorTree from '../../components/CalculatorTree/CalculatorTree.component';
import { useSelector } from 'react-redux';
import { selectOutput } from '../../reduxStore/calculator/calculator.selector';
import { CalculatorContainer } from './Calculator.styles';


const Calculator = () => {
    const output = useSelector(selectOutput);
    return (
        <CalculatorContainer>
            <CalculatorItemSelect/>
            {output.length > 0 && <CalculatorSummary/>}
            {output.length > 0 && <CalculatorTree/>}
        </CalculatorContainer>
    );
};

export default Calculator;