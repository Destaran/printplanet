import styled from "styled-components";
import { useState } from "react";
import {
  modules,
  returnImageUrlById,
} from "../../../../../utils/helperFunctions";

const ppBlue = "#14213d";

const Slot = styled.div`
  height: 28px;
  width: 28px;
  margin: 1px;
  border: 1px solid black;
  background-color: ${ppBlue};
  :hover {
    cursor: pointer;
    background-color: orange;
  }

  :active {
    background-color: ${ppBlue};
  }

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

export const ModuleSlot = () => {
  const [module, setModule] = useState(0);
  const [empty, setEmpty] = useState(true);

  const handleClick = (event) => {
    if (event.shiftKey && event.button === 0) {
      if (empty) {
        setModule(modules.length - 1);
        setEmpty(false);
      } else if (module === 0) {
        setEmpty(true);
      } else if (module <= modules.length - 1) {
        setModule(module - 1);
      }
    } else {
      if (empty) {
        setEmpty(false);
      } else if (!empty && module == modules.length - 1) {
        setEmpty(true);
        setModule(0);
      } else if (module === modules.length - 1) {
        setModule(0);
      } else {
        setModule(module + 1);
      }
    }
  };

  return (
    <Slot onClick={handleClick}>
      {!empty && <img src={returnImageUrlById(modules[module].name)} alt="" />}
    </Slot>
  );
};
