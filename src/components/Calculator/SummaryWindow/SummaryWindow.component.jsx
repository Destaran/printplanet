import { SummaryElement } from "../SummaryElement/SummaryElement.component";
import {
  SummaryWindowContainer,
  SummaryWindowInner,
  SummaryWindowOutter,
  TitleText,
  SummaryWindowContainerDiv,
} from "./SummaryWindow.styles";

export const SummaryWindow = ({ title, toMap }) => {
  return (
    <SummaryWindowContainerDiv>
      <SummaryWindowContainer>
        <TitleText>{title}</TitleText>
        <SummaryWindowOutter>
          <SummaryWindowInner>
            {toMap.map((obj, idx) => {
              return <SummaryElement object={obj} key={idx} />;
            })}
          </SummaryWindowInner>
        </SummaryWindowOutter>
      </SummaryWindowContainer>
    </SummaryWindowContainerDiv>
  );
};
