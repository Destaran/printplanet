import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { OwnMachine } from "utils/types";
import { Button } from "components/Button";
import { Popup } from "components/Popup";
import { swapMachine, swapMachines } from "redux/calculator/calculator.slice";
import { MachineConfig } from "./MachineConfig/MachineConfig";
import { craftingMachines } from "redux/calculator/calculator.selector";
import {
  checkIfDefault,
  getDefaultMachine,
  getEmptyMachine,
  getMachineCategories,
} from "utils/helperFunctions";

const MachineFunctions = styled.div`
  display: flex;
  margin: auto;
  width: 70%;
  button {
    margin: 15px 15px 0 15px;
  }
`;

interface Props {
  machineId: string;
  setMachineId: (id: string | null) => void;
  uid?: string;
  pid?: string;
  singleMachine?: OwnMachine;
}

export function ModifyMachinePopup({
  machineId,
  setMachineId,
  uid,
  pid,
  singleMachine,
}: Props) {
  const dispatch = useDispatch();
  const defaultMachines = useSelector(craftingMachines);

  const machine = checkIfDefault(machineId, defaultMachines)
    ? getDefaultMachine(machineId, defaultMachines)
    : getEmptyMachine(machineId);
  const [config, setConfig] = useState(uid ? singleMachine : machine);

  const enterHandler = useCallback(() => {
    if (uid) {
      const payload = {
        uid,
        pid,
        machineConfig: config,
      };
      dispatch(swapMachine(payload));
      setMachineId(null);
    } else {
      const payload = {
        update: machineId,
        categories: getMachineCategories(machineId),
        machineConfig: config,
      };
      dispatch(swapMachines(payload));
      setMachineId(null);
    }
  }, [config, dispatch, machineId, pid, setMachineId, uid]);

  const backHandler = useCallback(() => {
    setMachineId(null);
  }, [setMachineId]);

  // refactor: move to custom hook
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "e") {
        enterHandler();
      }
      if (event.key === "b") {
        backHandler();
      }
    }
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
}
