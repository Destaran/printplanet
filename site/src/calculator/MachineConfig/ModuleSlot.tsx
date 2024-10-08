import styled from "styled-components";
import { useState, useEffect } from "react";
import { getImageUrlById, getNameById } from "../../utils/helperFunctions";

const Container = styled.div`
  height: 28px;
  width: 28px;
  margin: 1px;
  border: 2px solid black;
  background-color: ${({ theme }) => theme.colors.blue};
  overflow: hidden;
  cursor: pointer;
  transition: all 1s;
  :hover {
    background-color: orange;
    transition: all 200ms;
  }
  :active {
    background-color: ${({ theme }) => theme.colors.blue};
    transition: all 100ms;
    img {
      transition: all 100ms;
      transform: scale(0.9);
    }
  }

  img {
    height: 28px;
    width: 28px;
    margin: 0;
    border: none;
    background-color: none;
    pointer-events: none;
  }
`;

interface Props {
  slotIdx: number;
  modules: string[];
  module: string;
  onModuleChange: (
    modules: string[],
    slotIdx: number,
    moduleIdx: number,
    beaconModule?: boolean
  ) => void;
  beaconModule?: boolean;
}

export function ModuleSlot({
  slotIdx,
  modules,
  module,
  onModuleChange,
  beaconModule,
}: Props) {
  const [moduleIdx, setModuleIdx] = useState(modules.indexOf(module));

  useEffect(() => {
    setModuleIdx(modules.indexOf(module));
  }, [module, modules]);

  useEffect(() => {
    onModuleChange(modules, slotIdx, moduleIdx, beaconModule);
  }, [onModuleChange, modules, slotIdx, moduleIdx, beaconModule]);

  function handleClick(event: React.MouseEvent) {
    const direction = event.shiftKey && event.button === 0 ? -1 : 1;
    setModuleIdx((moduleIdx + direction + modules.length) % modules.length);
  }

  return (
    <Container onClick={handleClick}>
      {module.length > 0 && (
        <img src={getImageUrlById(module)} alt={getNameById(module)} />
      )}
    </Container>
  );
}
