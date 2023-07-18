import styled from "styled-components";
import {
  getImageUrlById,
  getNameById,
  craftingMachines,
  compareObjects,
} from "../../../../utils/helperFunctions";

const Container = styled.div`
  width: 320px;
  position: relative;
  margin-bottom: 15px;
`;

const SelectedContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid black;
  width: 100%;
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

import { useState } from "react";

export const Select = ({ currentSelected, setCurrentSelected }) => {
  const [showList, setShowList] = useState(false);
  const displayName = getNameById(currentSelected.name);
  const imgUrl = getImageUrlById(currentSelected.name);
  const availableMachines = craftingMachines.filter((machine) => {
    if (compareObjects(currentSelected.categories, machine.categories)) {
      return machine;
    }
  });

  const liClick = (machine) => {
    setCurrentSelected(machine);
    setShowList(false);
  };

  const selectClick = () => {
    if (availableMachines.length > 1) {
      setShowList(!showList);
    }
  };

  return (
    <Container>
      <SelectedContainer onClick={selectClick}>
        <img src={imgUrl} alt={displayName} />
        {displayName}
      </SelectedContainer>
      <UnorderedList>
        {showList &&
          availableMachines.map((machine, idx) => {
            const displayName = getNameById(machine.name);
            const imgUrl = getImageUrlById(machine.name);
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
    </Container>
  );
};
