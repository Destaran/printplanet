import styled from "styled-components";
import {
  checkIfDefault,
  getDefaultMachine,
  getEmptyMachine,
  getMachineObjectById,
} from "../../../../utils/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";
import {
  defaultCraftingMachine,
  craftingMachines,
} from "../../../../reduxStore/calculator/calculator.selector";
import { saveDefaultMachineConfig } from "../../../../reduxStore/calculator/calculator.slice";
import { Beacons } from "./Beacons/Beacons.component";
import { Modules } from "./Modules/Modules.component";
import { Button } from "../../../Button/Button.component";
import { Select } from "./Select/Select.component";

const ppBlue = "#14213d";

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

const ConfigContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MachineSettings = styled.div`
  width: 360px;
`;

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

export const MachineConfig = () => {
  const dispatch = useDispatch();
  const defaultMachines = useSelector(craftingMachines);
  const defaultMachine = useSelector(defaultCraftingMachine);
  const [currentSelected, setCurrentSelected] = useState(
    getMachineObjectById(defaultMachine.id)
  );
  const [modules, setModules] = useState(defaultMachine.modules);
  const [beacons, setBeacons] = useState(defaultMachine.beacons);

  const saveHandler = () => {
    const payload = {
      categories: Object.keys(currentSelected.categories),
      machineConfig: {
        id: currentSelected.name,
        craftingSpeed: currentSelected.craftingSpeed,
        productivity: 0,
        modules: modules,
        beacons: beacons,
      },
    };
    dispatch(saveDefaultMachineConfig(payload));
  };

  const changeHandler = useCallback(() => {
    if (checkIfDefault(currentSelected.name, defaultMachines)) {
      const machine = getDefaultMachine(currentSelected.name, defaultMachines);
      setBeacons(machine.beacons);
      setModules(machine.modules);
    } else {
      const empty = getEmptyMachine(currentSelected.name);
      setBeacons(empty.beacons);
      setModules(empty.modules);
    }
  }, [currentSelected.name, defaultMachines]);

  const resetHandler = () => {
    const empty = getEmptyMachine(currentSelected.name);
    setModules(empty.modules);
    setBeacons(empty.beacons);
  };

  const onBeaconChange = ({ target }) => {
    const { value, alt } = target;
    setBeacons((prevConfig) => ({
      ...prevConfig,
      [alt]: value,
    }));
  };

  const onModuleChange = useCallback(
    (modules, slotIdx, moduleIdx, isBeaconModule) => {
      isBeaconModule
        ? setBeacons((prevModules) => {
            const newModules = structuredClone(prevModules);
            newModules.modules[slotIdx] = modules[moduleIdx];
            return newModules;
          })
        : setModules((prevModules) => {
            const newModules = structuredClone(prevModules);
            newModules[slotIdx] = modules[moduleIdx];
            return newModules;
          });
    },
    [setBeacons, setModules]
  );

  useEffect(() => {
    changeHandler();
  }, [changeHandler]);

  return (
    <Container>
      <MachineSettings>
        <Select
          currentSelected={currentSelected}
          setCurrentSelected={setCurrentSelected}
        />
        <ConfigContainer>
          <Beacons
            beacons={beacons}
            onModuleChange={onModuleChange}
            onBeaconChange={onBeaconChange}
          />
          <Modules modules={modules} onModuleChange={onModuleChange} />
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
