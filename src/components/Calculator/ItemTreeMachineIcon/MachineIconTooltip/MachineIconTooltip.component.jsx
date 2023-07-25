import styled from "styled-components";
import { Tooltip } from "react-tooltip";
import { getNameById } from "../../../../utils/helperFunctions";
import { ModuleIcon } from "./ModuleIcon/ModuleIcon.component";

const Container = styled.div`
  display: block;
  p {
    margin: 2px 2px 2px 2px;
  }
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border-bottom: 1px solid #864c00;
`;

const Details = styled.div`
  border-bottom: 1px solid #864c00;
`;

const ModulesContainer = styled.div`
  border-bottom: 1px solid #864c00;
  margin-bottom: 2px;
  justify-content: center;
`;

const ModulesInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BeaconIcons = styled.div`
  display: flex;
  object-fit: contain;
`;

export const MachineIconTooltip = ({ machine }) => {
  const displayName = getNameById(machine.id);
  const displaySpeed = (machine.craftingSpeed * 100).toFixed(0);
  const displayProd = (machine.productivity * 100).toFixed(0);
  const hasModules = machine.modules.some((module) => module.length > 0);
  const hasProd = machine.modules.some((module) =>
    module.includes("productivity")
  );
  return (
    <Tooltip
      id={machine.uid}
      style={{ opacity: 1 }}
      delayShow={"500"}
      place="top"
    >
      <Container>
        <Title>
          <p>{displayName}</p>
        </Title>
        <Details>
          <p>Crafting Speed: {displaySpeed}%</p>
          {hasProd && <p>Productivity: {displayProd}%</p>}
        </Details>
        {machine.beacons.affecting > 0 && (
          <ModulesContainer>
            <ModulesInner>
              <BeaconIcons>
                {machine.beacons.modules.map((module, key) => (
                  <ModuleIcon key={key} module={module} />
                ))}
              </BeaconIcons>
              <p>&#x2715;</p>
              <p>{machine.beacons.required}</p>
              <ModuleIcon module={"beacon"} />
            </ModulesInner>
          </ModulesContainer>
        )}
        {hasModules && (
          <ModulesContainer>
            <ModulesInner>
              {machine.modules.map((module, key) => (
                <ModuleIcon key={key} module={module} />
              ))}
            </ModulesInner>
          </ModulesContainer>
        )}
      </Container>
    </Tooltip>
  );
};
