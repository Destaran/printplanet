import { SummaryElement } from "../SummaryElement/SummaryElement.component";
import { SummaryInputElement } from "../SummaryInputElement/SummaryInputElement.component";
import {
  SummaryWindowContainer,
  SummaryWindowInner,
  SummaryWindowOutter,
  TitleText,
  SummaryWindowContainerDiv,
} from "./SummaryWindow.styles";

export const SummaryWindow = ({ title, toMap, ...otherProps }) => {
  const { input } = otherProps;
  return (
    <SummaryWindowContainerDiv>
      <SummaryWindowContainer>
        <TitleText>{title}</TitleText>
        <SummaryWindowOutter>
          <SummaryWindowInner>
            {input &&
              toMap.map((obj, idx) => {
                return <SummaryInputElement object={obj} key={idx} />;
              })}
            {!input &&
              toMap.map((obj, idx) => {
                return <SummaryElement object={obj} key={idx} />;
              })}
          </SummaryWindowInner>
        </SummaryWindowOutter>
      </SummaryWindowContainer>
    </SummaryWindowContainerDiv>
  );
};
