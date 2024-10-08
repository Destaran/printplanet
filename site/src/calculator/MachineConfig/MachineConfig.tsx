import styled from "styled-components";
import { useState, useEffect } from "react";
import { Select } from "./Select";
import { ModuleConfig } from "./ModuleConfig";
import {
  checkIfDefault,
  getDefaultMachine,
  getEmptyMachine,
  getMachineCategories,
} from "../../utils/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { craftingMachines } from "../../redux/calculator/calculator.selector";
import { useMemo, useCallback } from "react";
import { saveDefaultMachineConfig } from "../../redux/calculator/calculator.slice";
import { Button } from "../../components/Button";
import { OwnMachine } from "../../utils/types";

const Container = styled.div`
  width: fit-content;
  display: flex;
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
    width: 48px;
    border-radius: 0px;
  }

  #second {
    margin-top: 15px;
    height: 30px;
  }
`;

interface Props {
  config?: OwnMachine;
  setConfig?: (config: OwnMachine) => void;
  edit?: boolean;
}

export function MachineConfig({ config, setConfig, edit }: Props) {
  const dispatch = useDispatch();
  const defaultMachines = useSelector(craftingMachines);
  const initialMachine = config ? config : defaultMachines.crafting;
  const [machineConfig, setMachineConfig] = useState(initialMachine);
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
        ? setMachineConfig(getDefaultMachine(currentSelected, defaultMachines))
        : handleReset();
    }
  }, [currentSelected, defaultMachines, handleReset, machineConfig.id]);

  useEffect(() => {
    if (setConfig) {
      const machine: OwnMachine = {
        id: machineConfig.id,
        craftingSpeed: machineConfig.craftingSpeed,
        productivity: 0,
        modules: machineConfig.modules,
        beacons: machineConfig.beacons,
      };
      setConfig(machine);
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
          edit={edit}
        />
        <ModuleConfig
          machineConfig={machineConfig}
          setMachineConfig={setMachineConfig}
        />
      </SettingsContainer>
      <FunctionsContainer>
        <Button buttonType={"green"} onClick={handleSave}>
          &#10033;
        </Button>
        <Button id="second" buttonType={"red"} onClick={handleReset}>
          Reset
        </Button>
      </FunctionsContainer>
    </Container>
  );
}
