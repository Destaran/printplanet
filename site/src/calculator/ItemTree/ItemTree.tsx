import { useSelector } from "react-redux";
import { calculatedOutput } from "../../redux/calculator/calculator.selector";
import { TreeDiv } from "./TreeDiv";

export function ItemTree() {
  const output = useSelector(calculatedOutput);

  return (
    <div>
      <p>Tree Overview</p>
      {output.map((outputItem, idx) => (
        <TreeDiv outputItem={outputItem} key={idx} />
      ))}
    </div>
  );
}
