import styled from "styled-components";
import { getBeaconModules, getImageUrlById } from "../../utils/helperFunctions";
import { ModuleSlot } from "./ModuleSlot";
import { Beacons as BeaconsType } from "../../utils/types";

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
      appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;
  }

  img {
    height: 28px;
    width: 28px;
    background-color: ${({ theme }) => theme.colors.grey};
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
  }
`;

interface Props {
  beacons: BeaconsType;
  onModuleChange: (
    modules: string[],
    slotIdx: number,
    moduleIdx: number,
    beaconModule?: boolean
  ) => void;
  onBeaconChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const beaconModules = getBeaconModules();

export function Beacons({ beacons, onModuleChange, onBeaconChange }: Props) {
  const handleInputFocus = ({ target }: React.FocusEvent<HTMLInputElement>) => {
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
      <input
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
      <input
        type="number"
        value={beacons.constant}
        min={0}
        max={20}
        alt="constant"
        onChange={onBeaconChange}
        onFocus={handleInputFocus}
      />
      <input
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
}
