import styled from "styled-components";
import { ModuleSlot } from "./ModuleSlot";
import { getModules } from "../../utils/helperFunctions";

const ModulesContainer = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;

interface Props {
  modules: string[];
  onModuleChange: (
    modules: string[],
    slotIdx: number,
    moduleIdx: number,
    beaconModule?: boolean
  ) => void;
}

const allModules = getModules();

export function Modules({ modules, onModuleChange }: Props) {
  return (
    <ModulesContainer>
      {modules.map((module, slotIdx) => {
        return (
          <ModuleSlot
            key={slotIdx}
            slotIdx={slotIdx}
            modules={allModules}
            module={module}
            onModuleChange={onModuleChange}
          />
        );
      })}
    </ModulesContainer>
  );
}
