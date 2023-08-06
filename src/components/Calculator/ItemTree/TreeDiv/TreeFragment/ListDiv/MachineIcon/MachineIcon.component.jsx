import styled from "styled-components";
import {
  getImageUrlById,
  checkModulesForBumping,
  formatNumber,
} from "../../../../../../../utils/helperFunctions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bumpModules } from "../../../../../../../reduxStore/calculator/calculator.slice";
import { IconTooltip } from "./IconTooltip.component";
import { useState } from "react";
import { MachineEditPopup } from "../../../../../MachineEditPopup/MachineEditPopup.component";

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
`;

const AmountText = styled.p`
  position: absolute;
  font-size: ${({ fontSize }) => fontSize}px;
  bottom: -3px;
  right: -1px;
  margin: 0;
  color: white;
  text-shadow: 0px 1px 1px #000, 0px -1px 1px #000, 1px 0px 1px #000,
    -1px 0px 1px #000;
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

export const MachineIcon = ({ outputItem }) => {
  const dispatch = useDispatch();
  const [machineEditId, setMachineEditId] = useState(null);
  const { recipe, machine, uid } = outputItem;
  const { id, amount, modules, uid: machineUid, beacons } = machine;
  const imgUrl = getImageUrlById(id);
  const displayAmount = formatNumber(Math.ceil(amount));
  const fontSize = 14;
  const firstModule = modules.find((module) => module.length > 0);
  const moduleUrl = getImageUrlById(firstModule);
  const beaconUrl = getImageUrlById("beacon");
  const lengthExceedsLimit = JSON.stringify(displayAmount).length > 5;

  const handleClick = () => {
    setMachineEditId(id);
  };

  useEffect(() => {
    if (checkModulesForBumping(uid, machine, recipe)) {
      dispatch(bumpModules(uid));
    }
  }, [dispatch, machine, recipe, uid]);

  return (
    <>
      <OutterContainer data-tooltip-id={machineUid} onClick={handleClick}>
        <InnerContainer>
          <ImgContainer>
            <img src={imgUrl} />
            <AmountText
              lengthExceedsLimit={lengthExceedsLimit}
              fontSize={fontSize}
            >
              {displayAmount}
            </AmountText>
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
      <IconTooltip machine={outputItem.machine} />
      {machineEditId && (
        <MachineEditPopup
          machineId={machineEditId}
          setMachineId={setMachineEditId}
          uid={uid}
        />
      )}
    </>
  );
};
