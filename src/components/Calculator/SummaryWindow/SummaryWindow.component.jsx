import { SummaryElement } from "../SummaryElement/SummaryElement.component";
import {
  SummaryWindowContainer,
  SummaryWindowInner,
  SummaryWindowOutter,
  TitleText,
  SummaryWindowContainerDiv,
} from "./SummaryWindow.styles";

export const SummaryWindow = ({ title, items, handleClick }) => {
  return (
    <SummaryWindowContainerDiv>
      <SummaryWindowContainer>
        <TitleText>{title}</TitleText>
        <SummaryWindowOutter>
          <SummaryWindowInner>
            {items.map((item, idx) => {
              return (
                <SummaryElement
                  item={item}
                  key={idx}
                  handleClick={handleClick}
                />
              );
            })}
          </SummaryWindowInner>
        </SummaryWindowOutter>
      </SummaryWindowContainer>
    </SummaryWindowContainerDiv>
  );
};
