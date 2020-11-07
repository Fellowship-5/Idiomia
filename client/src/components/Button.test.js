import { fireEvent, render } from "@testing-library/react";
import React from "react";

import Button from "./Button";

describe("Button", () => {
  it("should render a button with text and icon", () => {
    const buttonText = "TestButton";
    const { getByTestId, getByText } = render(
      <Button text={buttonText} icon="faUnlock" />
    );

    getByText(buttonText);
    getByTestId("button-icon");
  });

  it("should not render icon if not passed as prop", () => {
    const buttonText = "TestButton";
    const { queryByTestId } = render(<Button text={buttonText} />);

    expect(queryByTestId("button-icon")).toBeNull();
  });

  it("should trigger onClick when clicked", () => {
    const mockOnClick = jest.fn();
    const { getByTestId } = render(
      <Button text="test" onClick={mockOnClick} data-testid="testButton" />
    );

    const button = getByTestId("testButton");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
