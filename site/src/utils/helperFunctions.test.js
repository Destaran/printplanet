import { expect, describe, test } from "vitest";
import { calculateTree } from "./helperFunctions";

describe("calculateTree", () => {
  test("accumulator without modules", () => {
    const ingredients = [
      {
        id: "iron-plate",
      },
      {
        id: "battery",
      },
    ];
    const machine = {
      modules: [],
      beacons: { affecting: 0, modules: [] },
      productivity: 0,
      craftingSpeed: 1,
    };

    calculateTree({
      ingredients,
      recipe: "accumulator",
      id: "accumulator",
      machine,
      amount: 5,
    });

    expect(machine.amount).toBe(50);
    expect(ingredients[0].amount).toBe(10);
    expect(ingredients[1].amount).toBe(25);
  });

  test("accumulator with speed modules", () => {
    const ingredients = [
      {
        id: "iron-plate",
      },
      {
        id: "battery",
      },
    ];
    const machine = {
      modules: ["speed-module-3", "speed-module-3"],
      beacons: { affecting: 0, modules: [] },
      productivity: 0,
      craftingSpeed: 1,
    };

    calculateTree({
      ingredients,
      recipe: "accumulator",
      id: "accumulator",
      machine,
      amount: 5,
    });

    expect(machine.amount).toBe(25);
    expect(ingredients[0].amount).toBe(10);
    expect(ingredients[1].amount).toBe(25);
  });
});
