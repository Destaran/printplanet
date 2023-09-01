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
import { ppOrange } from "../../../../../../../utils/colors";
import { ppGrey } from "../../../../../../../utils/colors";

const OutterContainer = styled.div`
  border: 2px solid ${ppOrange};
  height: 36px;
  width: 36px;
  padding: 2px;
  margin: 1px;
  margin-left: 1px;
  background-color: ${ppGrey};
  user-select: none;
  cursor: pointer;
  transition: all 1s;

  &:hover {
    background-color: orange;
    border: 2px solid #fefefe;
    transition: all 0.3s;
  }
  &:active {
    transition: all 0.1s;
    background-color: ${ppGrey};
    img {
      transform: scale(0.9);
    }
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
  font-size: 14px;
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

export const MachineIcon = ({ outputItem, pid }) => {
  const dispatch = useDispatch();
  const [machineEditId, setMachineEditId] = useState(null);
  const { recipe, machine, uid } = outputItem;
  const { id, amount, modules, beacons } = machine;
  const imgUrl = getImageUrlById(id);
  const displayAmount = formatNumber(Math.ceil(amount));
  const firstModule = modules.find((module) => module.length > 0);
  const moduleUrl = getImageUrlById(firstModule);
  const beaconUrl = getImageUrlById("beacon");

  const handleClick = () => {
    setMachineEditId(id);
  };

  useEffect(() => {
    if (checkModulesForBumping(uid, machine, recipe)) {
      const payload = {
        uid,
        pid,
      };
      dispatch(bumpModules(payload));
    }
  }, [dispatch, machine, pid, recipe, uid]);

  return (
    <>
      <OutterContainer data-tooltip-id={uid} onClick={handleClick}>
        <InnerContainer>
          <ImgContainer>
            <img src={imgUrl} />
            <AmountText>{displayAmount}</AmountText>
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
      <IconTooltip machine={outputItem.machine} uid={uid} />
      {machineEditId && (
        <MachineEditPopup
          machineId={machineEditId}
          setMachineId={setMachineEditId}
          uid={uid}
          pid={pid}
          singleMachine={machine}
        />
      )}
    </>
  );
};
