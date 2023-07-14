import { getRecipes, getProducers } from "../../../utils/helperFunctions";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  outputValues,
  inputArray,
  machinesArray,
} from "../../../reduxStore/calculator/calculator.selector";
import {
  collapseSameTypeElements,
  extendSameTypeElements,
} from "../../../reduxStore/calculator/calculator.slice";
import { SummaryWindow } from "../SummaryWindow/SummaryWindow.component";
import { ModifyOutputPopup } from "../ModifyOutputPopup/ModifyOutputPopup.component";
import { ItemTreeExtendPopup } from "../ItemTreeExtendPopup/ItemTreeExtendPopup.component";

const CalculatorSummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  object-fit: contain;
  margin-bottom: 22.5px;
  justify-content: space-around;
`;

export const Summary = () => {
  const dispatch = useDispatch();
  const output = useSelector(outputValues);
  const input = useSelector(inputArray);
  const machines = useSelector(machinesArray);
  const additionalOutput = [];
  const [inputId, setInputId] = useState(null);
  const [outputId, setOutputId] = useState(null);
  const [machinesId, setMachinesId] = useState(null);

  const handleOutputClick = (id) => {
    setOutputId(id);
  };

  const handleInputClick = (id, event) => {
    const recipe = getRecipes(id);
    if (event.shiftKey && event.button === 0) {
      const producers = getProducers(output, id);
      producers.forEach((id) => {
        dispatch(collapseSameTypeElements(id));
      });
    } else {
      if (recipe.length > 1) {
        setInputId(id);
      } else {
        const payload = {
          id: id,
          recipe: recipe.name,
        };
        dispatch(extendSameTypeElements(payload));
      }
    }
  };

  const handleMachineClick = (id) => {
    setMachinesId(id);
  };

  return (
    <CalculatorSummaryContainer>
      <SummaryWindow
        title={"Desired Output"}
        items={output}
        handleClick={handleOutputClick}
      />
      {outputId && (
        <ModifyOutputPopup outputId={outputId} setOutputId={setOutputId} />
      )}
      <SummaryWindow
        title={"Required Input"}
        items={input}
        handleClick={handleInputClick}
      />
      {inputId && (
        <ItemTreeExtendPopup inputId={inputId} setInputId={setInputId} />
      )}
      {machines.length > 0 && (
        <SummaryWindow
          title={"Required Machines"}
          items={machines}
          handleClick={handleMachineClick}
        />
      )}
      {/* machinesId */}
      {additionalOutput.length > 0 && (
        <SummaryWindow title={"Additional Output"} items={additionalOutput} />
      )}
    </CalculatorSummaryContainer>
  );
};
