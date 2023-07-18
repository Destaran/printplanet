import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  getImageUrlById,
  getNameById,
} from "../../../../utils/helperFunctions";

const ppBlue = "#14213d";

const Slot = styled.div`
  height: 28px;
  width: 28px;
  margin: 1px;
  border: 2px solid black;
  background-color: ${ppBlue};
  :hover {
    cursor: pointer;
    background-color: orange;
  }

  :active {
    background-color: ${ppBlue};
  }

  img {
    height: 28px;
    width: 28px;
    margin: 0;
    border: none;
    background-color: ${ppBlue};
    :hover {
      cursor: pointer;
      background-color: orange;
    }

    :active {
      background-color: ${ppBlue};
    }
  }
`;

export const ModuleSlot = ({
  slotIdx,
  modules,
  module,
  onModuleChange,
  beaconModule,
}) => {
  const [moduleIdx, setModuleIdx] = useState(modules.indexOf(module));

  useEffect(() => {
    if (module === "") {
      setModuleIdx(0);
    }
  }, [module]);

  useEffect(() => {
    onModuleChange(modules, slotIdx, moduleIdx, beaconModule);
  }, [onModuleChange, modules, slotIdx, moduleIdx, beaconModule]);

  const handleClick = (event) => {
    let direction = event.shiftKey && event.button === 0 ? -1 : 1;
    setModuleIdx((moduleIdx + direction + modules.length) % modules.length);
  };

  return (
    <Slot onClick={handleClick}>
      {module.length > 0 && (
        <img src={getImageUrlById(module)} alt={getNameById(module)} />
      )}
    </Slot>
  );
};
