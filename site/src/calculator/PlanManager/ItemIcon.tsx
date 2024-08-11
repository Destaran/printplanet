import styled from "styled-components";
import { getImageUrlById } from "utils/helperFunctions";
import { SummaryItem } from "utils/types";

const Container = styled.div``;

const Image = styled.img`
  width: 46px;
  height: 46px;
`;

interface Props {
  item: SummaryItem;
}

export function ItemIcon({ item }: Props) {
  const img = getImageUrlById(item.id);
  return (
    <Container>
      <Image src={img} alt={item.id} />
    </Container>
  );
}
