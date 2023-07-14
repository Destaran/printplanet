import styled from "styled-components";
import {
  modules,
  getImageUrlById,
  getNameById,
} from "../../../../../utils/helperFunctions";

const ppBlue = "#14213d";

const Slot = styled.div`
  height: 28px;
  width: 28px;
  margin: 1px;
  border: 1px solid black;
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

import { useState, useEffect } from "react";

const createModuleArray = () => {
  const newModuleArray = [""];
  modules.forEach((module) => {
    newModuleArray.push(module.name);
  });
  return newModuleArray;
};
const allModulesArray = createModuleArray();

export const ModuleSlot = ({ idx, module, setCurrentConfig, beaconModule }) => {
  const [arrayIndex, setArrayIndex] = useState(0);
  let moduleArray = allModulesArray;
  if (beaconModule) {
    moduleArray = allModulesArray.filter(
      (module) => !module.includes("productivity")
    );
  }

  useEffect(() => {
    if (module === "") {
      setArrayIndex(0);
    }
  }, [module]);

  // refactor: this logic could be done in MachineConfig
  useEffect(() => {
    setCurrentConfig((prevConfig) => {
      const newConfig = structuredClone(prevConfig);
      beaconModule
        ? (newConfig.beacons.modules[idx] = moduleArray[arrayIndex])
        : (newConfig.modules[idx] = moduleArray[arrayIndex]);
      return newConfig;
    });
  }, [arrayIndex, beaconModule, idx, setCurrentConfig]);

  const handleClick = (event) => {
    let direction = event.shiftKey && event.button === 0 ? -1 : 1;
    setArrayIndex(
      (arrayIndex + direction + moduleArray.length) % moduleArray.length
    );
  };

  return (
    <Slot onClick={handleClick}>
      {module.length > 0 && (
        <img src={getImageUrlById(module)} alt={getNameById(module)} />
      )}
    </Slot>
  );
};
