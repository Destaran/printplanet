import styled from "styled-components";
import { Tooltip } from "react-tooltip";
import { getNameById } from "../../../utils/helperFunctions";
import { OutputItem } from "utils/types";

const Container = styled.div`
  display: block;
  p {
    margin: 2px 2px 2px 2px;
  }
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  return (
    <Tooltip
      id={outputItem.id}
      style={{ opacity: 1 }}
      delayShow={500}
      place="top"
    >
      <Container>
        <Title>
          <p>{displayName}</p>
        </Title>
        <Details>
          <p>attribute:</p>
        </Details>
      </Container>
    </Tooltip>
  );
}
