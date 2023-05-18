import { useState, useContext } from "react";

import { CalculatorContext } from "../../contexts/calculator.context";

import CalculatorFormInput from "../CalculatorFormInput/CalculatorFormInput.component";
import CalculatorFormSelect from "../CalculatorFormSelect/CalculatorFormSelect.component";
import FilteredItemsList from "../FilteredItemsList/FilteredItemsList.component"

import {
    CalculatorItemSelectContainer,
    ItemSelectContainer,
    QuantitySelectContainer,
    UnitSelectContainer,
    ButtonContainer,
    ResetButton,
    BeltContainer,
    BeltButton
} from "./CalculatorItemSelect.styles";

const returnImageUrlById = (id) => {
    return `./item-icons/${id}.png`
};

const beltImages = [
    returnImageUrlById('transport-belt'),
    returnImageUrlById('fast-transport-belt'),
    returnImageUrlById('express-transport-belt')
]

const CalculatorItemSelect = () => {

    const {
        setCurrentItem,
        searchString,
        setSearchString,
        quantity,
        setQuantity,
        unit,
        setUnit,
        addOutputItem
    } = useContext(CalculatorContext);

    const handleSearchChange = ({ target }) => {
        const { value } = target;
        setSearchString(value);
    };

    const handleQuantityChange = ({ target }) => {
        const { value } = target;
        setQuantity(value);
    };

    const handleBeltIconClick = ({ target }) => {
        const value = target.getAttribute('data-value');
        setQuantity(value);
    }

    const handleUnitChange = ({ target }) => {
        const { value } = target;
        setUnit(value);
    };

    const resetButtonClick = () => {
        setSearchString("");
        setCurrentItem("");
        setQuantity(1);
    }

    return (
        <CalculatorItemSelectContainer>
            <ItemSelectContainer>
                <CalculatorFormInput
                    placeholder="Search item"
                    type='text'
                    value={searchString}
                    name='item-search'
                    onChange={handleSearchChange}
                />
                {searchString && <FilteredItemsList />}
            </ItemSelectContainer>
            <QuantitySelectContainer>
                <CalculatorFormInput
                    placeholder="Quantity"
                    type='number'
                    value={quantity}
                    name='quantity'
                    onChange={handleQuantityChange}
                />
                <BeltContainer>
                    <BeltButton src={beltImages[0]} data-value={15} onClick={handleBeltIconClick} />
                    <BeltButton src={beltImages[1]} data-value={30} onClick={handleBeltIconClick} />
                    <BeltButton src={beltImages[2]} data-value={45} onClick={handleBeltIconClick} />
                </BeltContainer>
            </QuantitySelectContainer>
            <UnitSelectContainer>
                <CalculatorFormSelect
                    value={unit}
                    onChange={handleUnitChange}
                />
            </UnitSelectContainer>
            <ButtonContainer>
                <ResetButton onClick={addOutputItem}>Add</ResetButton>
            </ButtonContainer>
            <ButtonContainer>
                <ResetButton onClick={resetButtonClick}>Reset</ResetButton>
            </ButtonContainer>
        </CalculatorItemSelectContainer>
    )
}

export default CalculatorItemSelect;