import { screen, cleanup } from "@testing-library/react";
import { renderWithProviders } from "@utils/testUtils";
import SubmitButton from "./SubmitButton";

afterEach(() => {
  cleanup();
});

test("Login component renders correctly", () => {
  const btnTextString = "Submit button test";
  renderWithProviders(<SubmitButton text={btnTextString} />);
  const submitButtonComponent = screen.getByTestId("submitButtonTestAttribute");
  expect(submitButtonComponent).toBeInTheDocument();
  expect(submitButtonComponent).toHaveTextContent(btnTextString);
});
