import styled from "styled-components";
import {
  getProducers,
  checkIfMultipleRecipes,
  getRecipeByProduct,
} from "../../utils/helperFunctions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  collapseSameTypeElements,
  extendSameTypeElements,
} from "../../redux/calculator/calculator.slice";
import {
  outputValues,
  inputArray,
  machinesArray,
} from "../../redux/calculator/calculator.selector";
import { SelectRecipePopup } from "../SelectRecipePopup/SelectRecipePopup";
import { Window } from "./Window";
import { OutputItem, SummaryItem } from "utils/types";
import { ModifyOutputPopup } from "../ModifyOutputPopup";
import { MachineEditPopup } from "../MachineEditPopup";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  object-fit: contain;
  margin-bottom: 20px;
  justify-content: space-around;
`;

export function Summary() {
  const dispatch = useDispatch();
  const output: OutputItem[] = useSelector(outputValues);
  const input: SummaryItem[] = useSelector(inputArray);
  const machines: SummaryItem[] = useSelector(machinesArray);
  const [outputId, setOutputId] = useState<null | string>(null);
  const [inputId, setInputId] = useState<null | string>(null);
  const [machineId, setMachineId] = useState<null | string>(null);

  function handleOutputClick(id: string) {
    const divElement = document.activeElement as HTMLDivElement;
    divElement.blur();
    setOutputId(id);
  }

  function handleInputClick(id: string, event: React.MouseEvent) {
    if (event.shiftKey && event.button === 0) {
      const producers = getProducers(output, id);
      producers.forEach((id) => {
        dispatch(collapseSameTypeElements(id));
      });
    } else {
      if (checkIfMultipleRecipes(id)) {
        const divElement = document.activeElement as HTMLDivElement;
        divElement.blur();
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
  }

  function handleMachineClick(id: string) {
    if (!id.includes("module") && !id.includes("beacon")) {
      setMachineId(id);
    }
  }

  return (
    <Container>
      <Window title={"Output"} items={output} handleClick={handleOutputClick} />
      {outputId && (
        <ModifyOutputPopup outputId={outputId} setOutputId={setOutputId} />
      )}
      <Window title={"Input"} items={input} handleClick={handleInputClick} />
      {inputId && <SelectRecipePopup id={inputId} setId={setInputId} />}
      {machines.length > 0 && (
        <Window
          title={"Machinery"}
          items={machines}
          handleClick={handleMachineClick}
        />
      )}
      {machineId && (
        <MachineEditPopup machineId={machineId} setMachineId={setMachineId} />
      )}
    </Container>
  );
}
