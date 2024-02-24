import styled from "styled-components";
import { ppBlue } from "../../../utils/colors";
import { MachineConfig } from "../MachineConfig/MachineConfig.component";

const Container = styled.div`
  border-top: 1px solid ${ppBlue};
  border-bottom: 1px solid ${ppBlue};
`;

export const DefaultMachineConfig = () => {
  return (
    <Container>
      <MachineConfig />
    </Container>
  );
};
