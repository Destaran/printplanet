import styled from "styled-components";
import { ModuleSlot } from "../ModuleSlot/ModuleSlot.component";
import { getModules } from "../../../../../utils/helperFunctions";

const ModulesContainer = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;

const allModules = getModules();

export const Modules = ({ modules, onModuleChange }) => {
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
};
