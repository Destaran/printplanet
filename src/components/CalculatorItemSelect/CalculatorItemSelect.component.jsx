import { useState, useEffect } from "react";
import { items } from "../../utils/helperFunctions";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectOutput } from "../../reduxStore/calculator/calculator.selector";
import { addToOutput, resetOutput } from "../../reduxStore/calculator/calculator.slice";

import { returnImageUrlById } from "../../utils/helperFunctions";

import CalculatorFormInput from "../CalculatorFormInput/CalculatorFormInput.component";
import CalculatorFormSelect from "../CalculatorFormSelect/CalculatorFormSelect.component";
import FilteredItemsList from "../FilteredItemsList/FilteredItemsList.component"

import {
    CalculatorItemSelectContainer,
    SelectionContainer,
    MachinesContainer,
    OptionsContainer,
    MenusContainer,
    SearchBarContainer,
    CurrentItemContainer,
    QuantitySelectContainer,
    UnitSelectContainer,
    AddButtonContainer,
    ButtonContainer,
    BeltsContainer,
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
    const output = useSelector(selectOutput);

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
        if (currentItem.id) {
            setCurrentItem({});
        }
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
        setCurrentItem({});
        setQuantity(1);
        if (output.length > 0) {
            dispatch(resetOutput());
        }
    };

    const addItemHandler = () => {
        const itemToAdd = {
            id: currentItem.id,
            amount: quantity,
        }
        dispatch(addToOutput(itemToAdd));
        setSearchString("");
        setCurrentItem({});
        setQuantity(1);
    };

    return (
        <CalculatorItemSelectContainer>
            <SelectionContainer>
                <SearchBarContainer>
                    <CalculatorFormInput
                        autoFocus
                        placeholder="Search item"
                        type='text'
                        value={searchString}
                        name='item-search'
                        onChange={handleSearchChange}
                    />
                    {searchString && !currentItem.id &&
                        <FilteredItemsList
                            setCurrentItem={setCurrentItem}
                            setSearchString={setSearchString}
                            filteredItems={filteredItems}
                        />}
                    {currentItem.id ?
                        <CurrentItemContainer>
                            <p>Current Item:</p>
                            <img src={returnImageUrlById(currentItem.id)} alt={currentItem.name} />
                        </CurrentItemContainer> :
                        <CurrentItemContainer>
                            <p>No item selected</p>
                        </CurrentItemContainer>}
                </SearchBarContainer>
                <QuantitySelectContainer>
                    <CalculatorFormInput
                        placeholder="Quantity"
                        type='number'
                        value={quantity}
                        name='quantity'
                        onChange={handleQuantityChange}
                    />
                    <BeltsContainer>
                        <BeltContainer>
                            <BeltButton src={beltImages[0]} data-value={15} onClick={handleBeltIconClick} />
                        </BeltContainer>
                        <BeltContainer>
                            <BeltButton src={beltImages[1]} data-value={30} onClick={handleBeltIconClick} />
                        </BeltContainer>
                        <BeltContainer>
                            <BeltButton src={beltImages[2]} data-value={45} onClick={handleBeltIconClick} />
                        </BeltContainer>
                    </BeltsContainer>
                </QuantitySelectContainer>
                <UnitSelectContainer>
                    <CalculatorFormSelect
                        value={unit}
                        onChange={handleUnitChange}
                    />
                    <AddButtonContainer>
                        <button onClick={addItemHandler}>Add</button>
                    </AddButtonContainer>
                </UnitSelectContainer>
            </SelectionContainer>
            <MachinesContainer>

            </MachinesContainer>
            <OptionsContainer>

            </OptionsContainer>
            <MenusContainer>
                <ButtonContainer>
                    <button onClick={resetHandler}>Reset</button>
                </ButtonContainer>
                <ButtonContainer>
                    <button>Save</button>
                </ButtonContainer>
                <ButtonContainer>
                    <button>Load</button>
                </ButtonContainer>
            </MenusContainer>
        </CalculatorItemSelectContainer>
    )
}

export default CalculatorItemSelect;