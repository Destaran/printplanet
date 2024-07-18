import styled from "styled-components";
import { Tooltip } from "react-tooltip";
import { getNameById } from "../../../utils/helperFunctions";
import { OutputItem } from "utils/types";

const Line = styled.p`
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

  return (
    <Tooltip
      id={outputItem.uid + ":product"}
      style={{ opacity: 1 }}
      delayShow={500}
      place="top"
    >
      <div>
        <TitleContainer>
          <Line>{displayName}</Line>
          {outputItem.recipe && <Line>produced with</Line>}
          <Line>{recipeName}</Line>
        </TitleContainer>
        <Details>
          <Line>attribute:</Line>
        </Details>
      </div>
    </Tooltip>
  );
}
