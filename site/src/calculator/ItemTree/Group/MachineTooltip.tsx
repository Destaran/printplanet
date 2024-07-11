import styled from "styled-components";
import { Tooltip } from "react-tooltip";
import { getNameById } from "../../../utils/helperFunctions";
import { ModuleIndicator } from "./ModuleIndicator";
import { useDisplayNumber } from "utils/useDisplayNumber";
import { OwnMachine } from "utils/types";

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

interface Props {
  machine: OwnMachine;
}

export function MachineTooltip({ machine }: Props) {
  const { id, craftingSpeed, productivity, modules, beacons } = machine;
  const displayName = getNameById(id);
  const displaySpeed = (craftingSpeed * 100).toFixed(0);
  const displayProd = (productivity * 100).toFixed(0);
  const hasModules = modules.some((module) => module.length > 0);
  const hasProd = modules.some((module) => module.includes("productivity"));
  const beaconAffShow = useDisplayNumber(beacons.affecting);
  return (
    <Tooltip id={machine.id} style={{ opacity: 1 }} delayShow={500} place="top">
      <Container>
        <Title>
          <p>{displayName}</p>
        </Title>
        <Details>
          <p>Crafting Speed: {displaySpeed}%</p>
          {hasProd && <p>Productivity: {displayProd}%</p>}
        </Details>
        {beacons.affecting > 0 && (
          <ModulesContainer>
            <ModulesInner>
              <BeaconIcons>
                {beacons.modules.map((module, key) => (
                  <ModuleIndicator key={key} module={module} />
                ))}
              </BeaconIcons>
              <p>&#x2715;</p>
              <p>{beaconAffShow}</p>
              <ModuleIndicator module={"beacon"} />
            </ModulesInner>
          </ModulesContainer>
        )}
        {hasModules && (
          <ModulesContainer>
            <ModulesInner>
              {modules.map((module, key) => (
                <ModuleIndicator key={key} module={module} />
              ))}
            </ModulesInner>
          </ModulesContainer>
        )}
      </Container>
    </Tooltip>
  );
}
