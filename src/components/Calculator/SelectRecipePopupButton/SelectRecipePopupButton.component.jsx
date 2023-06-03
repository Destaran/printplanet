import styled from "styled-components";
import {
  returnImageUrlById,
  returnNameById,
} from "../../../utils/helperFunctions";
import { Tooltip } from "react-tooltip";
import { useState, useEffect } from "react";

const ppBrown = "#8e5c00";
const ppBlue = "#14213d";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  margin: 1px;
  border: 1px solid black;
  background-color: ${(props) => (props.selected ? "orange" : ppBlue)};

  &:hover {
    cursor: pointer;
    background-color: orange;
  }

  &:active {
    background-color: ${ppBlue};
  }

  img {
    padding: 0;
    margin: 0;
    background-color: white;
  }
`;

export const SelectRecipePopupButton = ({
  recipe,
  selectedRecipe,
  onClick,
}) => {
  const [selected, setSelected] = useState(false);
  const { name } = recipe;
  const stringName = returnNameById(name);
  const imgUrl = returnImageUrlById(name);

  useEffect(() => {
    if (selectedRecipe === name) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [selectedRecipe]);

  return (
    <>
      <Tooltip id={name}>{stringName}</Tooltip>
      <Container selected={selected} data-tooltip-id={name} onClick={onClick}>
        <img id={name} src={imgUrl} alt="" />
      </Container>
    </>
  );
};
