import styled from "styled-components";
import { returnImageUrlById } from "../../../utils/helperFunctions";
import { Tooltip } from "react-tooltip";
import { useState, useEffect } from "react";
import { SelectRecipePopupButtonTooltip } from "../SelectRecipePopupButtonTooltip/SelectRecipePopupButtonTooltip.component";

const ppDark = "#313131";

const OutterElementContainer = styled.div`
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

const InnerElementContainer = styled.div`
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

export const SelectRecipePopupButton = ({
  recipe,
  selectedRecipe,
  onClick,
}) => {
  const [selected, setSelected] = useState(false);
  const { name } = recipe;
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
      <Tooltip id={name} delayShow={"300"}>
        <SelectRecipePopupButtonTooltip recipe={recipe} />
      </Tooltip>
      <OutterElementContainer
        selected={selected}
        data-tooltip-id={name}
        onClick={onClick}
      >
        <InnerElementContainer>
          <ImgContainer>
            <img id={name} src={imgUrl} alt="" />
          </ImgContainer>
        </InnerElementContainer>
      </OutterElementContainer>
    </>
  );
};
