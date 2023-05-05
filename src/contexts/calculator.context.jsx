import data from '../utils/recipes/recipes.dictionary.json';

import { createContext, useEffect, useState } from "react";

const items = Object.values(data);

const returnImageUrlById = (id) => {
  return `./item.icons/${id}.png`
}

export const CalculatorContext = createContext({
    currentItem: null,
    setCurrentItem: () => null,
    filteredItems: null,
    searchString: null,
    setSearchString: () => null,
    quantity: null,
    setQuantity: () => null,
    unit: null,
    setUnit: () => null,
    robi: () => null
});

export const CalculatorProvider = ({ children }) => {
    const [currentItem, setCurrentItem] = useState('');
    const [output, setOutput] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [unit, setUnit] = useState(1);

    useEffect(() => {
        let itemsFiltered = items.filter((item) => {
          return item.name.toLowerCase().includes(searchString);
        })
        setFilteredItems(itemsFiltered);
      }, [searchString]);

      const robi = (id) => {
        return items.filter(item => { return item.id === id; } )[0];
      }

    const value = {
        currentItem,
        setCurrentItem,
        filteredItems,
        searchString,
        setSearchString,
        quantity,
        setQuantity,
        unit,
        setUnit,
        robi
    };

    return <CalculatorContext.Provider value={value}>{children}</CalculatorContext.Provider>
};