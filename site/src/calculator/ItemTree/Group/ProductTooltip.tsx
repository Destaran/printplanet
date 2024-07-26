import styled from "styled-components";
import { Tooltip } from "react-tooltip";
import {
  hasMultipleRecipes,
  getNameById,
} from "../../../utils/helperFunctions";
import { OutputItem } from "utils/types";

const Title = styled.p`
  margin: 2px 2px 2px 2px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  font-size: 18px;
  border-bottom: 1px solid #864c00;
`;

const Details = styled.div`
  border-bottom: 1px solid #864c00;
`;

interface Props {
  outputItem: OutputItem;
}

export function ProductTooltip({ outputItem }: Props) {
  const displayName = getNameById(outputItem.id);
  const recipeName = outputItem.recipe
    ? getNameById(outputItem.recipe)
    : "No recipe selected";
  const multipleRecipes = hasMultipleRecipes(outputItem.id);
  const showRecipeName =
    recipeName !== displayName && multipleRecipes ? true : false;

  return (
    <Tooltip
      id={outputItem.uid + ":product"}
      style={{ opacity: 1 }}
      delayShow={500}
      place="top"
    >
      <div>
        <TitleContainer>
          <Title>{displayName}</Title>
        </TitleContainer>
        <Details>
          {showRecipeName && <Title>Recipe: {recipeName}</Title>}
          <Title>Stack size:</Title>
          <Title>Produced with:</Title>
          <Title>Consumed by:</Title>
        </Details>
      </div>
    </Tooltip>
  );
}
