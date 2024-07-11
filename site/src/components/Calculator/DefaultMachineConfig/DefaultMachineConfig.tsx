import styled from "styled-components";
import { MachineConfig } from "../MachineConfig/MachineConfig";

const Container = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.blue};
  border-bottom: 1px solid ${({ theme }) => theme.colors.blue};
`;

export function DefaultMachineConfig() {
  return (
    <Container>
      <MachineConfig />
    </Container>
  );
}
