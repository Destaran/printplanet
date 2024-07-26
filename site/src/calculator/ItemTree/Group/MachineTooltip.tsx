import styled from "styled-components";
import { Tooltip } from "react-tooltip";
import { getNameById } from "../../../utils/helperFunctions";
import { ModuleIndicator } from "./ModuleIndicator";
import { useDisplayNumber } from "utils/hooks/useDisplayNumber";
import { OwnMachine } from "utils/types";

const Line = styled.p`
  margin: 2px 2px 2px 2px;
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
  uid: string;
}

export function MachineTooltip({ machine, uid }: Props) {
  const { id, amount, craftingSpeed, productivity, modules, beacons } = machine;
  if (!amount) {
    return null;
  }
  const amountShow = Math.ceil(amount);
  const displayName = getNameById(id);
  const displaySpeed = (craftingSpeed * 100).toFixed(0) + "%";
  const displayProd = (productivity * 100).toFixed(0) + "%";
  const hasModules = modules.some((module) => module.length > 0);
  const hasProd = modules.some((module) => module.includes("productivity"));
  const beaconsAffecting = useDisplayNumber(beacons.affecting);
  return (
    <Tooltip id={uid} style={{ opacity: 1 }} delayShow={500} place="top">
      <div>
        <Title>
          <Line>{displayName}</Line>
        </Title>
        <Details>
          <Line>Quantity: {amountShow}</Line>
          <Line>Crafting Speed: {displaySpeed}</Line>
          {hasProd && <Line>Productivity: {displayProd}</Line>}
        </Details>
        {beacons.affecting > 0 && (
          <ModulesContainer>
            <ModulesInner>
              <BeaconIcons>
                {beacons.modules.map((module, key) => (
                  <ModuleIndicator key={key} module={module} />
                ))}
              </BeaconIcons>
              <Line>&#x2715;</Line>
              <Line>{beaconsAffecting}</Line>
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
      </div>
    </Tooltip>
  );
}
