import styled from "styled-components";
import { getImageUrlById } from "../../../../../../../utils/helperFunctions";

const Container = styled.div`
  height: 28px;
  width: 28px;
  margin: 1px;
  border: 1px solid #864c00;
  background-color: ${({ theme }) => theme.colors.blue};

  img {
    height: 28px;
    width: 28px;
    margin: 0;
    border: none;
    background-color: ${({ theme }) => theme.colors.blue};
    :hover {
      cursor: pointer;
      background-color: orange;
    }

    :active {
      background-color: ${({ theme }) => theme.colors.blue};
    }
  }
`;

export const ModuleIndicator = ({ module }) => {
  const imgUrl = getImageUrlById(module);
  return (
    <Container>{module.length > 0 && <img src={imgUrl} alt="" />}</Container>
  );
};
