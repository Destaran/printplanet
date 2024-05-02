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
} from "../../../redux/calculator/calculator.slice";
import {
  outputValues,
  inputArray,
  machinesArray,
} from "../../../redux/calculator/calculator.selector";
import { ModifyOutputPopup } from "../ModifyOutputPopup/ModifyOutputPopup";
import { SelectRecipePopup } from "../SelectRecipePopup/SelectRecipePopup.component";
import { MachineEditPopup } from "../MachineEditPopup/MachineEditPopup.component";
import { Window } from "./Window.component";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  object-fit: contain;
  margin-bottom: 20px;
  justify-content: space-around;
`;

export const Summary = () => {
  const dispatch = useDispatch();
  const output = useSelector(outputValues);
  const input = useSelector(inputArray);
  const machines = useSelector(machinesArray);
  // @ts-expect-error
  const additionalOutput = [];
  const [outputId, setOutputId] = useState(null);
  const [inputId, setInputId] = useState(null);
  const [machineId, setMachineId] = useState(null);

  // @ts-expect-error
  const handleOutputClick = (id) => {
    // @ts-expect-error
    document.activeElement.blur();
    setOutputId(id);
  };

  // @ts-expect-error
  const handleInputClick = (id, event) => {
    if (event.shiftKey && event.button === 0) {
      // @ts-expect-error
      const producers = getProducers(output, id);
      producers.forEach((id) => {
        dispatch(collapseSameTypeElements(id));
      });
    } else {
      if (checkIfMultipleRecipes(id)) {
        // @ts-expect-error
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

  // @ts-expect-error
  const handleMachineClick = (id) => {
    if (!id.includes("module") && !id.includes("beacon")) {
      setMachineId(id);
    }
  };

  return (
    <Container>
      <Window title={"Output"} items={output} handleClick={handleOutputClick} />
      {outputId && (
        <ModifyOutputPopup outputId={outputId} setOutputId={setOutputId} />
      )}
      <Window title={"Input"} items={input} handleClick={handleInputClick} />
      {inputId && (
        // @ts-expect-error
        <SelectRecipePopup id={inputId} setId={setInputId} />
      )}
      {machines.length > 0 && (
        <Window
          title={"Machines / Beacons / Modules"}
          items={machines}
          handleClick={handleMachineClick}
        />
      )}
      {machineId && (
        // @ts-expect-error
        <MachineEditPopup machineId={machineId} setMachineId={setMachineId} />
      )}
      {additionalOutput.length > 0 && (
        // @ts-expect-error
        <Window title={"Additional Output"} items={additionalOutput} />
      )}
    </Container>
  );
};
