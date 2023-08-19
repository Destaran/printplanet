import styled from "styled-components";
import {
  checkIfDefault,
  getDefaultMachine as getDefaultMachine,
  getEmptyMachine,
  getMachineObjectById,
} from "../../../utils/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { craftingMachines } from "../../../reduxStore/calculator/calculator.selector";
import {
  swapMachines,
  swapMachine,
  saveDefaultMachineConfig,
} from "../../../reduxStore/calculator/calculator.slice";
import { Beacons } from "./Beacons/Beacons.component";
import { Modules } from "./Modules/Modules.component";
import { Select } from "./Select/Select.component";
import { Button } from "../../Button/Button.component";
import { useEffect } from "react";
import { Popup } from "../../Popup/Popup.component";

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

// refactor: single machine edit compatibility
export const MachineEditPopup = ({ machineId, setMachineId, uid, pid }) => {
  const dispatch = useDispatch();
  const defaultMachines = useSelector(craftingMachines);

  let machine;
  checkIfDefault(machineId, defaultMachines)
    ? (machine = getDefaultMachine(machineId, defaultMachines))
    : (machine = getEmptyMachine(machineId));
  const [currentSelected, setCurrentSelected] = useState(
    getMachineObjectById(machine.id)
  );
  const [modules, setModules] = useState(machine.modules);
  const [beacons, setBeacons] = useState(machine.beacons);

  const enterHandler = useCallback(() => {
    if (!uid) {
      const payload = {
        update: machineId,
        categories: currentSelected.categories,
        machineConfig: {
          id: currentSelected.name,
          craftingSpeed: currentSelected.craftingSpeed,
          productivity: 0,
          modules: modules,
          beacons: beacons,
        },
      };
      dispatch(saveDefaultMachineConfig(payload));
      dispatch(swapMachines(payload));
      setMachineId(null);
    } else {
      const payload = {
        uid,
        pid,
        machineConfig: {
          id: currentSelected.name,
          craftingSpeed: currentSelected.craftingSpeed,
          productivity: 0,
          modules: modules,
          beacons: beacons,
        },
      };
      dispatch(swapMachine(payload));
      setMachineId(null);
    }
  }, [
    beacons,
    currentSelected.categories,
    currentSelected.craftingSpeed,
    currentSelected.name,
    dispatch,
    machineId,
    modules,
    pid,
    setMachineId,
    uid,
  ]);

  const backHandler = useCallback(() => {
    setMachineId(null);
  }, [setMachineId]);

  const changeHandler = useCallback(() => {
    setBeacons({
      affecting: 0,
      additional: 0,
      constant: 0,
      modules: ["", ""],
    });
    setModules(new Array(currentSelected.moduleSlots).fill(""));
  }, [currentSelected.moduleSlots]);

  // ask Guliver for best practice [alt]
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
    if (currentSelected.name !== machineId) {
      changeHandler();
    }
  }, [changeHandler, currentSelected.name, machineId]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "e") {
        enterHandler();
      }
      if (event.key === "b") {
        backHandler();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [backHandler, enterHandler]);

  return (
    <Popup title={"Edit Machine"}>
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
        <Button buttonType={"green"} onClick={enterHandler}>
          [E]nter
        </Button>
        <Button buttonType={"red"} onClick={backHandler}>
          [B]ack
        </Button>
      </MachineFunctions>
    </Popup>
  );
};
