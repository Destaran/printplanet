import { CalculatorSummaryElementPopupContainer, InnerContainer, Header, InputContainer, ButtonsContainer } from './CalculatorSummaryElementPopup.styles';
import { returnImageUrlById } from '../../utils/helperFunctions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromOutput, modifyOutputElement } from '../../reduxStore/calculator/calculator.slice';

const CalculatorSummaryElementPopup = ({ object, setShowPopup }) => {
    const { id, amount } = object;
    const [newAmount, setNewAmount] = useState(amount);
    const imgUrl = returnImageUrlById(id);
    const dispatch = useDispatch();

    const inputHandler = ({target}) => {
        setNewAmount(target.value);
    };

    const modifyHandler = () => {
        const newItem = {
            id: id,
            amount: newAmount
        };
        setShowPopup(false);
        dispatch(modifyOutputElement(newItem));
    };

    const removeHandler = () => {
        setShowPopup(false);
        dispatch(removeFromOutput(id))
    };

    const cancelHandler = () => {
        setShowPopup(false);
    };

    return (
        <CalculatorSummaryElementPopupContainer>
            <InnerContainer>
                <Header>
                    <p>Modify / Remove Item</p>
                </Header>
                <InputContainer>
                    <img src={imgUrl} alt={id} />
                    <input type="number" autoFocus value={newAmount} onChange={inputHandler}/>
                </InputContainer>
                <ButtonsContainer>
                    <button onClick={modifyHandler}>Modify</button>
                    <button onClick={removeHandler}>Remove</button>
                    <button onClick={cancelHandler}>Cancel</button>
                </ButtonsContainer>
            </InnerContainer>
        </CalculatorSummaryElementPopupContainer>
    )
}

export default CalculatorSummaryElementPopup;