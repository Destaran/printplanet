import { useState, useEffect } from "react";
import { items } from "../../utils/helperFunctions";

import { useDispatch } from "react-redux";
import { addToOutput } from "../../reduxStore/calculator/calculator.slice";

import { returnImageUrlById } from "../../utils/helperFunctions";

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

const beltImages = [
    returnImageUrlById('transport-belt'),
    returnImageUrlById('fast-transport-belt'),
    returnImageUrlById('express-transport-belt')
]

const CalculatorItemSelect = () => {

    const dispatch = useDispatch();
    
    const [currentItem, setCurrentItem] = useState({});
    const [searchString, setSearchString] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState(1);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        let itemsFiltered = items.filter((item) => {
            return item.name.toLowerCase().includes(searchString);
        })
        setFilteredItems(itemsFiltered);
    }, [searchString]);

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
    };

    const handleUnitChange = ({ target }) => {
        const { value } = target;
        setUnit(value);
    };

    const resetHandler = () => {
        setSearchString("");
        setCurrentItem("");
        setQuantity(1);
    };

    const addItemHandler = () => {
        const itemToAdd = {
            id: currentItem.id,
            amount: quantity
        }
        dispatch(addToOutput(itemToAdd));
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
                {searchString && 
                    <FilteredItemsList 
                        setCurrentItem={setCurrentItem} 
                        setSearchString={setSearchString} 
                        filteredItems={filteredItems} 
                    />}
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
                <ResetButton onClick={addItemHandler}>Add</ResetButton>
            </ButtonContainer>
            <ButtonContainer>
                <ResetButton onClick={resetHandler}>Reset</ResetButton>
            </ButtonContainer>
        </CalculatorItemSelectContainer>
    )
}

export default CalculatorItemSelect;