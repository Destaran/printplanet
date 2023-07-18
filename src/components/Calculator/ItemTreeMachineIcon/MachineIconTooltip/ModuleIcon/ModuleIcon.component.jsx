import styled from "styled-components";
import { getImageUrlById } from "../../../../../utils/helperFunctions";

const ppBlue = "#14213d";

const Container = styled.div`
  height: 28px;
  width: 28px;
  margin: 1px;
  border: 1px solid #864c00;
  background-color: ${ppBlue};

  img {
    height: 28px;
    width: 28px;
    margin: 0;
    border: none;
    background-color: ${ppBlue};
    :hover {
      cursor: pointer;
      background-color: orange;
    }

    :active {
      background-color: ${ppBlue};
    }
  }
`;

export const ModuleIcon = ({ module }) => {
  const imgUrl = getImageUrlById(module);
  return (
    <Container>{module.length > 0 && <img src={imgUrl} alt="" />}</Container>
  );
};
