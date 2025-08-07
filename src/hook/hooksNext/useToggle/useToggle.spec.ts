import { act } from "react";

import { renderHook } from "@testing-library/react";

import useToggle from "./useToggle";

describe("useToggle hook", () => {
  it("useToggle response", () => {
    const { result } = renderHook(() => useToggle(false));
    const [show, toggle] = result.current;
    expect(show).toBeFalsy();

    act(() => {
      toggle();
    });
    const [nextState] = result.current;
    expect(nextState).toBeTruthy();
  });
});
