import styled from "styled-components";
import { getImageUrlById } from "../../../utils/helperFunctions";
import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { SelectButtonTooltip } from "./SelectButtonTooltip.component";

const ppDark = "#313131";

const Container = styled.div`
  border: 2px solid #b47500;
  height: 42px;
  width: auto;
  padding: 2px;
  margin: 1px;
  background-color: ${(props) => (props.selected ? "orange" : ppDark)};
  user-select: none;

  &:hover {
    cursor: pointer;
    background-color: orange;
  }
  &:active {
    background-color: #313131;
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

// refactor
export const SelectButton = ({ recipe, selectedRecipe, onClick }) => {
  const [selected, setSelected] = useState(false);
  const { name } = recipe;
  const imgUrl = getImageUrlById(name);

  useEffect(() => {
    if (selectedRecipe === name) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [name, selectedRecipe]);

  return (
    <>
      <Tooltip id={name} delayShow={"300"}>
        <SelectButtonTooltip recipe={recipe} />
      </Tooltip>
      <Container selected={selected} data-tooltip-id={name} onClick={onClick}>
        <InnerContainer>
          <ImgContainer>
            <img id={name} src={imgUrl} alt="" />
          </ImgContainer>
        </InnerContainer>
      </Container>
    </>
  );
};
