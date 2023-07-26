import styled from "styled-components";
import {
  checkIfDefault,
  getDefaultMachine as getDefaultMachine,
  getEmptyMachine,
  getMachineObjectById,
  getModdedMachineSpeed,
  getModdedMachineProd,
} from "../../../utils/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { craftingMachines } from "../../../reduxStore/calculator/calculator.selector";
import {
  swapMachines,
  saveDefaultMachineConfig,
} from "../../../reduxStore/calculator/calculator.slice";
import { Beacons } from "./Beacons/Beacons.component";
import { Modules } from "./Modules/Modules.component";
import { Select } from "./Select/Select.component";
import { Button } from "../../Button/Button.component";
import { useEffect } from "react";

const ppBlue = "#14213d";

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Header = styled.div`
  p {
    margin: 0 0 8px 0;
  }
`;

const Container = styled.div`
  background-color: white;
  width: 335px;
  display: block;
  border: 2px solid ${ppBlue};
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

const MachineSettings = styled.div``;

const MachineFunctions = styled.div`
  display: flex;
  margin: auto;
  width: 70%;
  button {
    margin: 15px 15px 0 15px;
  }
`;

// refactor: much to do here m8
export const MachineEditPopup = ({ machineId, setMachineId }) => {
  const dispatch = useDispatch();
  const defaultMachines = useSelector(craftingMachines);

  let defaultMachine;
  if (checkIfDefault(machineId, defaultMachines)) {
    defaultMachine = getDefaultMachine(machineId, defaultMachines);
  } else {
    defaultMachine = getEmptyMachine(machineId);
  }
  const [currentSelected, setCurrentSelected] = useState(
    getMachineObjectById(defaultMachine.id)
  );
  const [modules, setModules] = useState(defaultMachine.modules);
  const [beacons, setBeacons] = useState(defaultMachine.beacons);

  const saveHandler = () => {
    const payload = {
      update: machineId,
      categories: Object.keys(currentSelected.categories),
      machineConfig: {
        id: currentSelected.name,
        productivity: getModdedMachineProd(modules),
        craftingSpeed: getModdedMachineSpeed(
          modules,
          beacons,
          currentSelected.craftingSpeed
        ),
        modules: modules,
        beacons: beacons,
      },
    };
    dispatch(saveDefaultMachineConfig(payload));
    dispatch(swapMachines(payload));
    setMachineId(null);
  };

  const changeHandler = useCallback(() => {
    setBeacons({
      affecting: 0,
      additional: 0,
      constant: 0,
      modules: ["", ""],
    });
    setModules(new Array(currentSelected.moduleSlots).fill(""));
  }, [currentSelected.moduleSlots]);

  const cancelHandler = () => {
    setMachineId(null);
  };

  const onBeaconAffectingChange = ({ target }) => {
    const { value } = target;
    setBeacons((prevConfig) => ({
      ...prevConfig,
      affecting: value,
    }));
  };

  const onBeaconAdditionalChange = ({ target }) => {
    const { value } = target;
    setBeacons((prevConfig) => ({
      ...prevConfig,
      additional: value,
    }));
  };

  const onBeaconConstantChange = ({ target }) => {
    const { value } = target;
    setBeacons((prevConfig) => ({
      ...prevConfig,
      constant: value,
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
    if (currentSelected.name !== machineId) {
      changeHandler();
    }
  }, [changeHandler, currentSelected.name, machineId]);

  return (
    <PopupContainer>
      <Container>
        <Header>
          <p>Edit Current Machines & Save to Default</p>
        </Header>
        <MachineSettings>
          <Select
            currentSelected={currentSelected}
            setCurrentSelected={setCurrentSelected}
          />
          <ConfigContainer>
            <Beacons
              beacons={beacons}
              onModuleChange={onModuleChange}
              onBeaconAffectingChange={onBeaconAffectingChange}
              onBeaconAdditionalChange={onBeaconAdditionalChange}
              onBeaconConstantChange={onBeaconConstantChange}
            />
            <Modules modules={modules} onModuleChange={onModuleChange} />
          </ConfigContainer>
        </MachineSettings>
        <MachineFunctions>
          <Button buttonType={"green"} onClick={saveHandler}>
            Save
          </Button>
          <Button buttonType={"red"} onClick={cancelHandler}>
            Cancel
          </Button>
        </MachineFunctions>
      </Container>
    </PopupContainer>
  );
};
