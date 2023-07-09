import styled from "styled-components";

const ppBlue = "#14213d";

const Container = styled.div`
  width: fit-content;
  display: flex;
  border: 1px solid ${ppBlue};
  padding: 10px;
  width: auto;
  input,
  select {
    margin-top: 0;
  }
`;

const ModulesContainer = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;

const BeaconContainer = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  height: 30px;
  margin-right: 10px;

  p {
    margin: 0 5px 0 5px;
  }

  input {
    width: 30px;
    margin: 0 5px 0 0;
  }

  img {
    height: 28px;
    width: 28px;
    background-color: #313131;
    border: 1px solid black;
  }
`;

const ConfigContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MachineSettings = styled.div``;

const MachineFunctions = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  button {
    margin: 0;
    height: 43px;
    width: 50px;
    border-radius: 0px;
  }

  #second {
    margin-top: 15px;
    height: 30px;
  }
`;

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getMachineObjectById,
  getImageUrlById,
} from "../../../../utils/helperFunctions";
import { useDispatch } from "react-redux";
import { saveDefaultMachineConfig } from "../../../../reduxStore/calculator/calculator.slice";
import { defaultCraftingMachine } from "../../../../reduxStore/calculator/calculator.selector";
import { Button } from "../../../Button/Button.component";
import { ModuleSlot } from "./ModuleSlot/ModuleSlot.component";
import { Select } from "./Select/Select.component";
import { useCallback } from "react";

// destructure machineConfig into multiple states and assemble the complete object in saveHandler

export const MachineConfig = () => {
  const dispatch = useDispatch();
  const defaultMachine = useSelector(defaultCraftingMachine);
  const [currentSelected, setCurrentSelected] = useState(
    getMachineObjectById(defaultMachine.id)
  );
  const [machineConfig, setMachineConfig] = useState(defaultMachine);

  const beaconAmountChange = ({ target }) => {
    const { value } = target;
    setMachineConfig((prevConfig) => ({
      ...prevConfig,
      beacons: {
        ...prevConfig.beacons,
        amount: value,
      },
    }));
  };

  const saveHandler = () => {
    const categories = Object.keys(currentSelected.categories);
    const payload = {
      categories,
      machineConfig,
    };
    dispatch(saveDefaultMachineConfig(payload));
  };

  const resetHandler = useCallback(() => {
    setMachineConfig({
      id: currentSelected.name,
      craftingSpeed: currentSelected.craftingSpeed,
      modules: new Array(currentSelected.moduleSlots).fill(""),
      beacons: {
        amount: 0,
        modules: ["", ""],
      },
    });
  }, [
    currentSelected.craftingSpeed,
    currentSelected.moduleSlots,
    currentSelected.name,
  ]);

  useEffect(() => {
    resetHandler();
  }, [resetHandler]);

  return (
    <Container>
      <MachineSettings>
        <Select
          currentSelected={currentSelected}
          setCurrentSelected={setCurrentSelected}
        />
        <ConfigContainer>
          <BeaconContainer>
            {machineConfig.beacons.modules.map((module, idx) => {
              return (
                <ModuleSlot
                  key={idx}
                  idx={idx}
                  module={module}
                  setCurrentConfig={setMachineConfig}
                  beaconModule={true}
                />
              );
            })}
            <p>&#x2715;</p>
            <input
              value={machineConfig.beacons.amount}
              onChange={beaconAmountChange}
              max={20}
              min={0}
              type="number"
            />
            <img src={getImageUrlById("beacon")} alt="Beacon" />
          </BeaconContainer>
          <ModulesContainer>
            {machineConfig.modules.map((module, idx) => {
              return (
                <ModuleSlot
                  key={idx}
                  idx={idx}
                  module={module}
                  setCurrentConfig={setMachineConfig}
                />
              );
            })}
          </ModulesContainer>
        </ConfigContainer>
      </MachineSettings>
      <MachineFunctions>
        <Button buttonType={"green"} onClick={saveHandler}>
          Save
        </Button>
        <Button id="second" buttonType={"red"} onClick={resetHandler}>
          Reset
        </Button>
      </MachineFunctions>
    </Container>
  );
};
