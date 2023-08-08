import styled from "styled-components";
import { useState } from "react";
import { Select } from "../MachineEditPopup/Select/Select.component";
import { ModuleConfig } from "./ModuleConfig.component";

const Container = styled.div``;

export const MachineConfig = ({ receivedMachine }) => {
  const [machine, setMachine] = useState(receivedMachine);
  const [currentSelected, setCurrentSelected] = useState(machine.id);
  return (
    <Container>
      <Select
        currentSelected={currentSelected}
        setCurrentSelected={setCurrentSelected}
      />
      <ModuleConfig />
    </Container>
  );
};
