import { createContext, useState } from "react";

const addItemToOutput = (outputArray, itemToAdd) => {
  const {id, amount} = itemToAdd
  const existingItem = outputArray.find((item) => item.id === id);

  if (existingItem) {
      return outputArray.map((item) =>
          item.id === id
              ? { ...item, amount: Number(item.amount) + Number(amount) }
              : item
      )
  };

  return [...outputArray, { id: id, amount:Number(amount) }];
};

export const CalculatorContext = createContext({
  output: null,
  input: null,
  setInput: () => null,
  machines: null,
  setMachines: () => null,
  addOutputItem: () => null
});

export const CalculatorProvider = ({ children }) => {
  const [output, setOutput] = useState([]);
  const [input, setInput] = useState([]);
  const [machines, setMachines] = useState([]);

  const addOutputItem = (item) => {
      const quantity = item.amount;
      setOutput(addItemToOutput(output, item, quantity));
  };

  const value = {
    output,
    addOutputItem,
    input,
    setInput,
    machines,
    setMachines,
  };

  return <CalculatorContext.Provider value={value}>{children}</CalculatorContext.Provider>
};