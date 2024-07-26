import styled from "styled-components";
import {
  getImageUrlById,
  checkModulesForBumping,
  getEmptyMachine,
} from "utils/helperFunctions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bumpModules } from "redux/calculator/calculator.slice";
import { MachineTooltip } from "./MachineTooltip";
import { useState } from "react";
import { ModifyMachinePopup } from "../../ModifyMachinePopup";
import { useDisplayNumber } from "utils/useDisplayNumber";
import { OutputItem, OwnMachine } from "utils/types";

const OutterContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.darkOrange};
  height: 48px;
  width: 48px;
  padding: 2px;
  margin: 1px;
  margin-left: 1px;
  background-color: ${({ theme }) => theme.colors.grey};
  user-select: none;
  cursor: pointer;
  transition: all 1s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.orange};
    border: 2px solid ${({ theme }) => theme.colors.lightGrey};
    transition: all 0.3s;
  }
  &:active {
    transition: all 0.1s;
    background-color: ${({ theme }) => theme.colors.grey};
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

interface Props {
  outputItem: OutputItem;
  pid: string;
}

export function MachineIcon({ outputItem, pid }: Props) {
  if (!outputItem.machine) {
    throw new Error("MachineIcon: outputItem.machine is undefined");
  }

  const dispatch = useDispatch();
  const [machineEditId, setMachineEditId] = useState<null | string>(null);

  const { recipe, machine, uid } = outputItem;
  const { id, amount, modules, beacons } = machine as OwnMachine;

  if (!amount || !recipe) {
    throw new Error("MachineIcon: amount or recipe is undefined");
  }

  const imgUrl = getImageUrlById(id);
  const displayAmount = useDisplayNumber(Math.ceil(amount));
  const hasModules = modules.find((module) => module.length > 0);
  const beaconUrl = getImageUrlById("beacon");
  const moduleUrl = hasModules ? getImageUrlById(hasModules) : null;

  const reduxMachine = {
    ...getEmptyMachine(machine.id),
    modules: machine.modules,
    beacons: machine.beacons,
  };

  function handleClick() {
    setMachineEditId(id);
  }

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
            {moduleUrl && (
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
      {machine && <MachineTooltip machine={machine} uid={uid} />}
      {machineEditId && (
        <ModifyMachinePopup
          machineId={machineEditId}
          setMachineId={setMachineEditId}
          uid={uid}
          pid={pid}
          singleMachine={reduxMachine}
        />
      )}
    </>
  );
}
