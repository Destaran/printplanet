import styled from "styled-components";
import {
  getImageUrlById,
  getNameById,
  craftingMachines,
} from "../../../../../utils/helperFunctions";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
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
  transition: all 1s;
  cursor: pointer;
  :hover {
    background-color: orange;
    transition: all 0.3s;
  }
  :active {
    background-color: white;
    transition: all 0.1s;
  }
  img {
    height: 30px;
    width: 30px;
    margin: 0 5px 0 5px;
  }
`;

const UnorderedList = styled.ul`
  position: absolute;
  background-color: white;
  margin: 0;
  padding: 0;
  top: 41px;
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
  cursor: pointer;
  transition: all 1s;

  :hover {
    background-color: orange;
    transition: all 0.3s;
  }

  :active {
    transition: all 0.1s;
    background-color: white;
  }

  img {
    height: 30px;
    width: 30px;
    margin: 0 5px 0 5px;
  }
`;

export const Select = ({ currentSelected, setCurrentSelected }) => {
  const [showList, setShowList] = useState(false);
  const displayName = getNameById(currentSelected.name);
  const imgUrl = getImageUrlById(currentSelected.name);

  const liClick = (machine) => {
    setCurrentSelected(machine);
    setShowList(false);
  };

  const selectClick = () => {
    setShowList(!showList);
  };

  return (
    <Container>
      <SelectedContainer onClick={selectClick}>
        <img src={imgUrl} alt={displayName} />
        {displayName}
      </SelectedContainer>
      <UnorderedList>
        {showList &&
          craftingMachines.map((machine, idx) => {
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
