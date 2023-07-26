import styled from "styled-components";
import { getImageUrlById } from "../../../utils/helperFunctions";
import { MachineIconTooltip } from "./MachineIconTooltip/MachineIconTooltip.component";

const OutterContainer = styled.div`
  border: 2px solid #b47500;
  height: 36px;
  width: 36px;
  padding: 2px;
  margin: 1px;
  margin-left: 1px;
  background-color: #313131;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: orange;
  }
  &:active {
    background-color: #313131;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const ImgContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  object-fit: contain;
  img {
    height: 100%;
    width: auto;
  }
  p {
    position: absolute;
    font-size: 16px;
    height: 16px;
    bottom: 0;
    right: 0;
    margin: 0;
    color: white;
    text-shadow: 0px 1px 1px #000, 0px -1px 1px #000, 1px 0px 1px #000,
      -1px 0px 1px #000;
  }
`;

const ModuleIcons = styled.div`
  position: absolute;
  top: -1px;
  right: -1px;
  margin: 0;

  img {
    width: 16px;
    height: 16px;
  }
`;

const BeaconsIcons = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  margin: 0;
  height: 16px;

  img {
    width: 16px;
    height: 16px;
  }
`;

export const ItemTreeMachineIcon = ({ outputItem }) => {
  const { id, amount, modules, uid, beacons } = outputItem.machine;
  const imgUrl = getImageUrlById(id);
  const showAmount = Math.ceil(amount);
  const firstModule = modules.find((module) => module.length > 0);
  const moduleUrl = getImageUrlById(firstModule);
  const beaconUrl = getImageUrlById("beacon");

  return (
    <>
      <OutterContainer data-tooltip-id={uid}>
        <InnerContainer>
          <ImgContainer>
            <img src={imgUrl} />
            <p>{showAmount}</p>
            {moduleUrl.length > 0 && (
              <ModuleIcons>
                <img src={moduleUrl} alt={modules[0]} />
              </ModuleIcons>
            )}
            {beacons.affecting > 0 && (
              <BeaconsIcons>
                <img src={beaconUrl} alt="beacon" />
              </BeaconsIcons>
            )}
          </ImgContainer>
        </InnerContainer>
      </OutterContainer>
      <MachineIconTooltip machine={outputItem.machine} />
    </>
  );
};
