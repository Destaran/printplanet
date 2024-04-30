import styled from "styled-components";
import { getImageUrlById } from "../../../utils/helperFunctions";
import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { SelectButtonTooltip } from "./SelectButtonTooltip.component";
import { useCallback } from "react";

const Container = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.blue};
  height: 42px;
  width: auto;
  padding: 2px;
  margin: 1px;
  background-color: ${(props) =>
    props.selected ? "orange" : props.theme.colors.grey};
  user-select: none;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: orange;
  }
  &:active {
    transition: all 0.1s;
    background-color: ${({ theme }) => theme.colors.grey};
    img {
      transform: scale(0.9);
    }
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

const ShortcutText = styled.p`
  position: absolute;
  font-size: 14px;
  height: 10px;
  bottom: 7px;
  right: 0;
  margin: 0;
  color: white;
  text-shadow: 0px 1px 1px #000, 0px -1px 1px #000, 1px 0px 1px #000,
    -1px 0px 1px #000;
`;

export const SelectButton = ({
  recipe,
  selectedRecipe,
  setSelectedRecipe,
  handleEnter,
  shortcut,
}) => {
  const [selected, setSelected] = useState(false);
  const { name } = recipe;
  const imgUrl = getImageUrlById(name);

  const handleClick = () => {
    setSelectedRecipe(name);
  };

  const handleShortcut = useCallback(() => {
    setSelectedRecipe(name);
  }, [setSelectedRecipe, name]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === shortcut) {
        handleShortcut();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleEnter, handleShortcut, shortcut]);

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
      <Container
        selected={selected}
        data-tooltip-id={name}
        onClick={handleClick}
      >
        <InnerContainer>
          <ImgContainer>
            <img id={name} src={imgUrl} alt="" />
            <ShortcutText>{`[${shortcut}]`}</ShortcutText>
          </ImgContainer>
        </InnerContainer>
      </Container>
    </>
  );
};
