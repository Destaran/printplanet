import styled from "styled-components";
import { useState, useCallback } from "react";
import { Beacons } from "../MachineEditPopup/Beacons/Beacons.component";
import { Modules } from "../MachineEditPopup/Modules/Modules.component";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModuleConfig = ({ machine, setMachine }) => {
  const [beacons, setBeacons] = useState(machine.beacons);
  const [modules, setModules] = useState(machine.modules);

  useEffect(() => {
    setMachine((prevConfig) => ({ ...prevConfig, beacons, modules }));
  }, [beacons, modules, setMachine]);

  const onBeaconChange = ({ target }) => {
    const { value, alt } = target;
    setBeacons((prevConfig) => ({
      ...prevConfig,
      [alt]: value,
    }));
  };

  const onModuleChange = useCallback(
    (modules, slotIdx, moduleIdx, isBeaconModule) => {
      isBeaconModule
        ? setBeacons((prevModules) => {
            const newModules = structuredClone(prevModules);
            newModules.modules[slotIdx] = modules[moduleIdx];
            return newModules;
          })
        : setModules((prevModules) => {
            const newModules = structuredClone(prevModules);
            newModules[slotIdx] = modules[moduleIdx];
            return newModules;
          });
    },
    [setBeacons, setModules]
  );

  return (
    <Container>
      <Beacons
        beacons={beacons}
        onModuleChange={onModuleChange}
        onBeaconChange={onBeaconChange}
      />
      <Modules modules={modules} onModuleChange={onModuleChange} />
    </Container>
  );
};
