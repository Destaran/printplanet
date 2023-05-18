import data from '../utils/recipes/recipes.dictionary.json';

import { createContext, useEffect, useState } from "react";

const items = Object.values(data);

const addItemToOutput = (output, currentItem, quantity) => {
  const existingItem = output.find((item) => item.id === currentItem.id);

  if (existingItem) {
      return output.map((item) =>
          item.id === currentItem.id
              ? { ...item, amount: Number(item.amount) + Number(quantity) }
              : item
      )
  };

  return [...output, { id: currentItem.id, amount:Number(quantity) }];
};

export const CalculatorContext = createContext({
  currentItem: null,
  setCurrentItem: () => null,
  output: null,
  setOutput: () => null,
  input: null,
  setInput: () => null,
  machines: null,
  setMachines: () => null,
  filteredItems: null,
  searchString: null,
  setSearchString: () => null,
  quantity: null,
  setQuantity: () => null,
  unit: null,
  setUnit: () => null,
  robi: () => null,
  addOutputItem: () => null
});

export const CalculatorProvider = ({ children }) => {
  const [currentItem, setCurrentItem] = useState('');
  const [output, setOutput] = useState([]);
  const [input, setInput] = useState([]);
  const [machines, setMachines] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState(1);

  useEffect(() => {
    let itemsFiltered = items.filter((item) => {
      return item.name.toLowerCase().includes(searchString);
    })
    setFilteredItems(itemsFiltered);
  }, [searchString]);

  const robi = (id) => {
    return items.filter(item => { return item.id === id; })[0];
  };

  const addOutputItem = () => {
    if (currentItem) {
      setOutput(addItemToOutput(output, currentItem, quantity));
      setCurrentItem('');
      setSearchString('');
      setQuantity(1);
    };
  };

  const value = {
    currentItem,
    setCurrentItem,
    output,
    addOutputItem,
    input,
    setInput,
    machines,
    setMachines,
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