import styled from "styled-components";
import { useState } from "react";
import {
  machines,
  returnImageUrlById,
  returnNameById,
} from "../../../../../utils/helperFunctions";

import { Button } from "../../../../Button/Button.component";
import { ModuleSlot } from "../ModuleSlot/ModuleSlot.component";

const ppBlue = "#14213d";

const Container = styled.div`
  width: fit-content;
  display: flex;
  border: 1px solid ${ppBlue};
  padding: 10px;
  width: auto;
  input,
  select {
    margin-top: 0;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 15px;
`;

const SelectedContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid black;
  width: 300px;
  margin: 0;
  padding: 5px 0 5px 0;
  :hover {
    cursor: pointer;
    background-color: orange;
  }

  :active {
    background-color: white;
  }

  img {
    height: 31px;
    width: 31px;
    margin: 0 5px 0 5px;
  }
`;

const UnorderedList = styled.ul`
  position: absolute;
  background-color: white;
  margin: 0;
  padding: 0;
  top: 43px;
  left: 0px;
  width: 100%;
  z-index: 50;
`;

const ListElement = styled.li`
  width: 100%;
  list-style: none;
  border: 1px solid black;
  padding: 5px 0 5px 0;
  display: flex;
  align-items: center;
  z-index: 50;

  :hover {
    cursor: pointer;
    background-color: orange;
  }

  :active {
    background-color: white;
  }

  img {
    height: 31px;
    width: 31px;
    margin: 0 5px 0 5px;
  }
`;

const ModulesContainer = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;

const BeaconContainer = styled.div`
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
    width: 30px;
    margin: 0 5px 0 0;
  }

  img {
    height: 28px;
    width: 28px;
    background-color: #313131;
    border: 1px solid black;
  }
`;

const ConfigContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MachineSettings = styled.div``;

const MachineFunctions = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  button {
    margin: 0;
    height: 43px;
    width: 50px;
    border-radius: 0px;
  }

  #second {
    margin-top: 15px;
    height: 30px;
  }
`;

export const Select = () => {
  const [currentSelected, setCurrentSelected] = useState(machines[3]);
  const [showList, setShowList] = useState(false);
  const displayName = returnNameById(currentSelected.name);
  const imgUrl = returnImageUrlById(currentSelected.name);
  const moduleSlots = Array.from(
    { length: currentSelected.moduleSlots },
    (_, index) => <ModuleSlot key={index} />
  );

  const selectClick = () => {
    setShowList(!showList);
  };

  const liClick = (machine) => {
    setCurrentSelected(machine);
    setShowList(false);
  };

  return (
    <Container>
      <MachineSettings>
        <InputContainer>
          <SelectedContainer onClick={selectClick}>
            <img src={imgUrl} alt={displayName} />
            {displayName}
          </SelectedContainer>
          <UnorderedList>
            {showList &&
              machines.map((machine, idx) => {
                const displayName = returnNameById(machine.name);
                const imgUrl = returnImageUrlById(machine.name);
                if (
                  machine.name !== currentSelected.name &&
                  machine.name !== "character"
                )
                  return (
                    <ListElement
                      onClick={() => liClick(machine)}
                      key={idx}
                      machine={machine}
                    >
                      <img src={imgUrl} alt={displayName} /> {displayName}
                    </ListElement>
                  );
              })}
          </UnorderedList>
        </InputContainer>
        <ConfigContainer>
          <BeaconContainer>
            <ModuleSlot />
            <ModuleSlot />
            <p>&#x2715;</p>
            <input defaultValue={0} max={20} min={0} type="number" />
            <img src={returnImageUrlById("beacon")} alt="Beacon" />
          </BeaconContainer>
          <ModulesContainer>{moduleSlots}</ModulesContainer>
        </ConfigContainer>
      </MachineSettings>
      <MachineFunctions>
        <Button buttonType={"green"}>Save</Button>
        <Button id="second" buttonType={"red"}>
          Reset
        </Button>
      </MachineFunctions>
    </Container>
  );
};
