import styled from "styled-components";
import { useState } from "react";
import { Select } from "./Select.component";
import { ModuleConfig } from "./ModuleConfig.component";
import {
  checkIfDefault,
  getEmptyMachine,
  getMachineCategories,
} from "../../../utils/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { craftingMachines } from "../../../reduxStore/calculator/calculator.selector";
import { useMemo, useCallback } from "react";
import { saveDefaultMachineConfig } from "../../../reduxStore/calculator/calculator.slice";
import { Button } from "../../Button/Button.component";
import { ppBlue } from "../../../utils/colors";
import { useEffect } from "react";
import { OwnMachine } from "../../../utils/types";

const Container = styled.div`
  width: fit-content;
  display: flex;
  border-top: 1px solid ${ppBlue};
  border-bottom: 1px solid ${ppBlue};
  padding: 10px;
  width: auto;
  input,
  select {
    margin-top: 0;
  }
`;

const SettingsContainer = styled.div`
  width: 360px;
`;

const FunctionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  button {
    margin: 0;
    height: 42px;
    width: 50px;
    border-radius: 0px;
  }

  #second {
    margin-top: 15px;
    height: 30px;
  }
`;

interface Props {
  machineConfig: OwnMachine;
  setMachineConfig: React.Dispatch<React.SetStateAction<OwnMachine>>;
}

export const MachineConfig = ({ machineConfig, setMachineConfig }: Props) => {
  const dispatch = useDispatch();
  const defaultMachines = useSelector(craftingMachines);
  const [currentSelected, setCurrentSelected] = useState<string>(
    machineConfig.id
  );

  const handleSave = () => {
    const payload = {
      categories: getMachineCategories(machineConfig.id),
      machineConfig: {
        id: machineConfig.id,
        craftingSpeed: machineConfig.craftingSpeed,
        productivity: 0,
        modules: machineConfig.modules,
        beacons: machineConfig.beacons,
      },
    };
    dispatch(saveDefaultMachineConfig(payload));
  };

  const handleReset = useCallback(() => {
    setMachineConfig(getEmptyMachine(currentSelected));
  }, [currentSelected]);

  useMemo(() => {
    if (machineConfig.id !== currentSelected) {
      checkIfDefault(currentSelected, defaultMachines)
        ? setMachineConfig(
            defaultMachines[getMachineCategories(machineConfig.id)[0]]
          )
        : handleReset();
    }
  }, [currentSelected, defaultMachines, handleReset, machineConfig.id]);

  useEffect(() => {
    if (setMachineConfig) {
      const machine: OwnMachine = {
        id: machineConfig.id,
        craftingSpeed: machineConfig.craftingSpeed,
        productivity: 0,
        modules: machineConfig.modules,
        beacons: machineConfig.beacons,
      };
      setMachineConfig(machine);
    }
  }, [
    machineConfig.beacons,
    machineConfig.craftingSpeed,
    machineConfig.id,
    machineConfig.modules,
    setMachineConfig,
  ]);

  return (
    <Container>
      <SettingsContainer>
        <Select
          currentSelected={currentSelected}
          setCurrentSelected={setCurrentSelected}
        />
        <ModuleConfig
          machineConfig={machineConfig}
          setMachineConfig={setMachineConfig}
        />
      </SettingsContainer>
      <FunctionsContainer>
        <Button buttonType={"green"} onClick={handleSave}>
          Set Default
        </Button>
        <Button id="second" buttonType={"red"} onClick={handleReset}>
          Reset
        </Button>
      </FunctionsContainer>
    </Container>
  );
};
