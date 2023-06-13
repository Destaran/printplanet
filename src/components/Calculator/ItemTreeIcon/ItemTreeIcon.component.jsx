import {
  OutterElementContainer,
  InnerElementContainer,
  ImgContainer,
} from "./ItemTreeIcon.styles";

export const ItemTreeIcon = ({ imgUrl, showAmount, handleClick }) => {
  return (
    <OutterElementContainer onClick={handleClick}>
      <InnerElementContainer>
        <ImgContainer>
          <img src={imgUrl} />
          {showAmount && <p>{showAmount}</p>}
        </ImgContainer>
      </InnerElementContainer>
    </OutterElementContainer>
  );
};
