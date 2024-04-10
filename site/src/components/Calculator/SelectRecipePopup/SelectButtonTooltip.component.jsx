import styled from "styled-components";
import {
  getNameById,
  getMachinesById,
  getModulesByRecipeId,
} from "../../../utils/helperFunctions";
import { TooltipElement } from "./TooltipElement";

const Container = styled.div`
  p {
    margin: 1px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
  border-bottom: 1px solid white;
`;

const DetailContainer = styled.div``;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  width: fit-content;
`;

export const SelectButtonTooltip = ({ recipe }) => {
  const name = getNameById(recipe.name);
  const time = {
    name: "clock",
    amount: recipe.energy,
  };
  const machines = getMachinesById(recipe.name);
  const modules = getModulesByRecipeId(recipe.name);
  return (
    <Container>
      <Title>{name}</Title>
      <DetailContainer>
        <p>Craftable at:</p>
        <ListContainer>
          {machines.map((machine, idx) => (
            <TooltipElement object={machine} key={idx} />
          ))}
        </ListContainer>
      </DetailContainer>
      <DetailContainer>
        <p>Modules:</p>
        <ListContainer>
          {modules.map((ingredient, idx) => (
            <TooltipElement object={ingredient} key={idx} />
          ))}
        </ListContainer>
      </DetailContainer>
      <DetailContainer>
        <p>Base crafting time:</p>
        <TooltipElement object={time} />
      </DetailContainer>
      <DetailContainer>
        <p>Input:</p>
        <ListContainer>
          {recipe.ingredients.map((ingredient, idx) => (
            <TooltipElement object={ingredient} key={idx} />
          ))}
        </ListContainer>
      </DetailContainer>
      <DetailContainer>
        <p>Output:</p>
        <ListContainer>
          {recipe.products.map((ingredient, idx) => (
            <TooltipElement object={ingredient} key={idx} />
          ))}
        </ListContainer>
      </DetailContainer>
    </Container>
  );
};
