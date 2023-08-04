import styled from "styled-components";
import {
  getProducers,
  checkIfMultipleRecipes,
  getRecipeByProduct,
} from "../../../utils/helperFunctions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  collapseSameTypeElements,
  extendSameTypeElements,
} from "../../../reduxStore/calculator/calculator.slice";
import {
  outputValues,
  inputArray,
  machinesArray,
} from "../../../reduxStore/calculator/calculator.selector";
import { ModifyOutputPopup } from "../ModifyOutputPopup/ModifyOutputPopup.component";
import { SelectRecipePopup } from "../SelectRecipePopup/SelectRecipePopup.component";
import { MachineEditPopup } from "../MachineEditPopup/MachineEditPopup.component";
import { Window } from "./Window/Window.component";

const Container = styled.div`
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
  const [outputId, setOutputId] = useState(null);
  const [inputId, setInputId] = useState(null);
  const [machineId, setMachineId] = useState(null);

  const handleOutputClick = (id) => {
    document.activeElement.blur();
    setOutputId(id);
  };

  const handleInputClick = (id, event) => {
    if (event.shiftKey && event.button === 0) {
      const producers = getProducers(output, id);
      producers.forEach((id) => {
        dispatch(collapseSameTypeElements(id));
      });
    } else {
      if (checkIfMultipleRecipes(id)) {
        document.activeElement.blur();
        setInputId(id);
      } else {
        const recipe = getRecipeByProduct(id);
        if (recipe) {
          const payload = {
            id: id,
            recipe: recipe.name,
          };
          dispatch(extendSameTypeElements(payload));
        }
      }
    }
  };

  const handleMachineClick = (id) => {
    setMachineId(id);
  };

  return (
    <Container>
      <Window
        title={"Desired Output"}
        items={output}
        handleClick={handleOutputClick}
      />
      {outputId && (
        <ModifyOutputPopup outputId={outputId} setOutputId={setOutputId} />
      )}
      <Window
        title={"Required Input"}
        items={input}
        handleClick={handleInputClick}
      />
      {inputId && <SelectRecipePopup id={inputId} setId={setInputId} />}
      {machines.length > 0 && (
        <Window
          title={"Required Machines / Beacons / Modules"}
          items={machines}
          handleClick={handleMachineClick}
        />
      )}
      {machineId && (
        <MachineEditPopup machineId={machineId} setMachineId={setMachineId} />
      )}
      {additionalOutput.length > 0 && (
        <Window title={"Additional Output"} items={additionalOutput} />
      )}
    </Container>
  );
};
