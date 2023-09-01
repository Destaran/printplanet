import styled from "styled-components";
import {
  checkIfDefault,
  getDefaultMachine as getDefaultMachine,
  getEmptyMachine,
  getMachineCategories,
} from "../../../utils/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { craftingMachines } from "../../../reduxStore/calculator/calculator.selector";
import {
  swapMachines,
  swapMachine,
} from "../../../reduxStore/calculator/calculator.slice";
import { Button } from "../../Button/Button.component";
import { useEffect } from "react";
import { Popup } from "../../Popup/Popup.component";
import { MachineConfig } from "../MachineConfig/MachineConfig.component";

const MachineFunctions = styled.div`
  display: flex;
  margin: auto;
  width: 70%;
  button {
    margin: 15px 15px 0 15px;
  }
`;

export const MachineEditPopup = ({
  machineId,
  setMachineId,
  uid,
  pid,
  singleMachine,
}) => {
  const dispatch = useDispatch();
  const defaultMachines = useSelector(craftingMachines);

  const machine = checkIfDefault(machineId, defaultMachines)
    ? getDefaultMachine(machineId, defaultMachines)
    : getEmptyMachine(machineId);
  const [config, setConfig] = useState(uid ? singleMachine : machine);

  const enterHandler = useCallback(() => {
    if (!uid) {
      const payload = {
        update: machineId,
        categories: getMachineCategories(machineId),
        machineConfig: config,
      };
      dispatch(swapMachines(payload));
      setMachineId(null);
    } else {
      const payload = {
        uid,
        pid,
        machineConfig: config,
      };
      dispatch(swapMachine(payload));
      setMachineId(null);
    }
  }, [config, dispatch, machineId, pid, setMachineId, uid]);

  const backHandler = useCallback(() => {
    setMachineId(null);
  }, [setMachineId]);

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
    <Popup title={uid ? "Edit Machine" : "Edit Machines"}>
      <MachineConfig config={config} setConfig={setConfig} edit={true} />
      <MachineFunctions>
        <Button buttonType={"green"} onClick={enterHandler}>
          <u>E</u>nter
        </Button>
        <Button buttonType={"red"} onClick={backHandler}>
          <u>B</u>ack
        </Button>
      </MachineFunctions>
    </Popup>
  );
};
