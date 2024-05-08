import styled from "styled-components";
import {
  checkIfDefault,
  getDefaultMachine as getDefaultMachine,
  getEmptyMachine,
  getMachineCategories,
} from "../../../utils/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { craftingMachines } from "../../../redux/calculator/calculator.selector";
import {
  swapMachines,
  swapMachine,
} from "../../../redux/calculator/calculator.slice";
import { Button } from "../../Button";
import { useEffect } from "react";
import { Popup } from "../../Popup";
import { MachineConfig } from "../MachineConfig/MachineConfig.component";
import { OwnMachine } from "utils/types";

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

export function MachineEditPopup({
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
