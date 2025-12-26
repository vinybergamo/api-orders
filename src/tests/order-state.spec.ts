import { describe, it, expect } from "vitest";
import { OrderState } from "../types/order.type";

function advanceOrder(state: OrderState) {
  const flow = {
    CREATED: OrderState.ANALYSIS,
    ANALYSIS: OrderState.COMPLETED,
  } as const;

  const next = flow[state as keyof typeof flow];

  if (!next) {
    throw new Error("Invalid order state");
  }

  return next;
}

describe("Order state transition", () => {
  it("should advance correctly", () => {
    expect(advanceOrder(OrderState.CREATED)).toBe(OrderState.ANALYSIS);
    expect(advanceOrder(OrderState.ANALYSIS)).toBe(OrderState.COMPLETED);
  });

  it("should block invalid transition", () => {
    expect(() => advanceOrder(OrderState.COMPLETED)).toThrow();
  });
});
