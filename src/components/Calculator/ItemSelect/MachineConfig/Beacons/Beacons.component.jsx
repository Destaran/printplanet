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
    width: 15px;
    margin: 0 5px 0 0;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const BeaconImgContainer = styled.div`
  border: 2px;
  padding: 0;
  margin: 0;
  display: flex;

  img {
    border: 2px solid black;
    margin-right: 5px;
    height: 28px;
    width: 28px;
    background-color: #313131;
  }
`;

const Input = styled.input``;

const beaconModules = getBeaconModules();

export const Beacons = ({ beacons, onModuleChange, onBeaconChange }) => {
  const handleInputFocus = ({ target }) => {
    target.select();
  };

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
      <Input
        type="number"
        value={beacons.affecting}
        min={0}
        max={20}
        alt="affecting"
        onChange={onBeaconChange}
        onFocus={handleInputFocus}
      />
      <BeaconImgContainer>
        <img src={getImageUrlById("beacon")} alt="Beacon" />
      </BeaconImgContainer>
      <Input
        type="number"
        value={beacons.constant}
        min={0}
        max={20}
        alt="constant"
        onChange={onBeaconChange}
        onFocus={handleInputFocus}
      />
      <Input
        type="number"
        value={beacons.additional}
        min={0}
        max={20}
        alt="additional"
        onChange={onBeaconChange}
        onFocus={handleInputFocus}
      />
    </BeaconsContainer>
  );
};
