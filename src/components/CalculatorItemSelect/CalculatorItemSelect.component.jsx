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
    ResetButton
} from "./CalculatorItemSelect.styles";

const CalculatorItemSelect = () => {

    const {
        currentItem,
        setCurrentItem,
        filteredItems,
        searchString,
        setSearchString,
        quantity,
        setQuantity,
        unit,
        setUnit
    } = useContext(CalculatorContext);

    const handleSearchChange = ({ target }) => {
        const { value } = target;
        setSearchString(value);
    };

    const handleQuantityChange = ({ target }) => {
        const { value } = target;
        setQuantity(value);
    };

    const handleUnitChange = ({ target }) => {
        const { value } = target;
        setUnit(value);
    };

    const resetButtonClick = () => {
        setSearchString("");
        setCurrentItem("");
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
                {searchString && !currentItem && <FilteredItemsList />}
            </ItemSelectContainer>
            <QuantitySelectContainer>
                <CalculatorFormInput
                    placeholder="Quantity"
                    type='number'
                    value={quantity}
                    name='quantity'
                    onChange={handleQuantityChange}
                />
            </QuantitySelectContainer>
            <UnitSelectContainer>
                <CalculatorFormSelect
                    value={unit}
                    onChange={handleUnitChange}
                />
            </UnitSelectContainer>
            <ButtonContainer>
                <ResetButton onClick={resetButtonClick}>Reset</ResetButton>
            </ButtonContainer>
            <ButtonContainer>
                <ResetButton>Save</ResetButton>
            </ButtonContainer>
        </CalculatorItemSelectContainer>
    )
}

export default CalculatorItemSelect;