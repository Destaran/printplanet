import styled from "styled-components";
import {
  getNameById,
  getMachinesById,
  getModulesByRecipeId,
} from "../../../utils/helperFunctions";
import { SelectRecipePopupButtonTooltipElement } from "../SelectRecipePopupButtonTooltipElement/SelectRecipePopupButtonTooltipElement.component";

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
const MapContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  width: fit-content;
`;

export const SelectRecipePopupButtonTooltip = ({ recipe }) => {
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
        <MapContainer>
          {machines.map((machine, idx) => (
            <SelectRecipePopupButtonTooltipElement object={machine} key={idx} />
          ))}
        </MapContainer>
      </DetailContainer>
      <DetailContainer>
        <p>Modules:</p>
        <MapContainer>
          {modules.map((ingredient, idx) => (
            <SelectRecipePopupButtonTooltipElement
              object={ingredient}
              key={idx}
            />
          ))}
        </MapContainer>
      </DetailContainer>
      <DetailContainer>
        <p>Base crafting time:</p>
        <SelectRecipePopupButtonTooltipElement object={time} />
      </DetailContainer>
      <DetailContainer>
        <p>Input:</p>
        <MapContainer>
          {recipe.ingredients.map((ingredient, idx) => (
            <SelectRecipePopupButtonTooltipElement
              object={ingredient}
              key={idx}
            />
          ))}
        </MapContainer>
      </DetailContainer>
      <DetailContainer>
        <p>Output:</p>
        <MapContainer>
          {recipe.products.map((ingredient, idx) => (
            <SelectRecipePopupButtonTooltipElement
              object={ingredient}
              key={idx}
            />
          ))}
        </MapContainer>
      </DetailContainer>
    </Container>
  );
};
