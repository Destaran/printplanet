import styled from "styled-components";
import { useState, useCallback, useMemo, useEffect } from "react";
import { Beacons } from "./Beacons";
import { Modules } from "./Modules";
import { OwnMachine } from "../../utils/types";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface Props {
  machineConfig: OwnMachine;
  setMachineConfig: React.Dispatch<React.SetStateAction<OwnMachine>>;
}

export function ModuleConfig({ machineConfig, setMachineConfig }: Props) {
  const [beacons, setBeacons] = useState(machineConfig.beacons);
  const [modules, setModules] = useState(machineConfig.modules);

  useEffect(() => {
    setMachineConfig((prevConfig) => ({ ...prevConfig, beacons, modules }));
  }, [beacons, modules]);

  useMemo(() => {
    setBeacons(machineConfig.beacons);
    setModules(machineConfig.modules);
  }, [machineConfig]);

  const onBeaconChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, alt } = target;
    setBeacons((prevConfig) => ({
      ...prevConfig,
      [alt]: Number(value),
    }));
  };

  const onModuleChange = useCallback(
    (
      modules: string[],
      slotIdx: number,
      moduleIdx: number,
      isBeaconModule: boolean | undefined
    ) => {
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
}
