import styled from "styled-components";
import {
  getBeaconModules,
  getImageUrlById,
} from "../../../../../utils/helperFunctions";
import { ModuleSlot } from "../ModuleSlot/ModuleSlot.component";

const BeaconsContainer = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  height: 30px;
  margin-right: 10px;

  p {
    margin: 0 5px 0 5px;
  }

  input {
    width: 30px;
    margin: 0 5px 0 0;
  }

  img {
    height: 28px;
    width: 28px;
    background-color: #313131;
    border: 1px solid black;
  }
`;

const beaconModules = getBeaconModules();

export const Beacons = ({ beacons, onModuleChange, onBeaconAmountChange }) => {
  return (
    <BeaconsContainer>
      {beacons.modules.map((module, slotIdx) => {
        return (
          <ModuleSlot
            key={slotIdx}
            slotIdx={slotIdx}
            modules={beaconModules}
            module={module}
            onModuleChange={onModuleChange}
            beaconModule={true}
          />
        );
      })}
      <p>&#x2715;</p>
      <input
        type="number"
        value={beacons.amount}
        min={0}
        max={20}
        onChange={onBeaconAmountChange}
      />
      <img src={getImageUrlById("beacon")} alt="Beacon" />
    </BeaconsContainer>
  );
};
