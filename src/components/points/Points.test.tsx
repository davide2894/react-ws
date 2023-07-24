import { screen, cleanup } from "@testing-library/react";
import { renderWithProviders } from "@utils/testUtils";
import Points from "./Points";

afterEach(() => {
  cleanup();
});

test("Login component renders correctly", () => {
  renderWithProviders(<Points />);
  const PointsComponent = screen.getByTestId("pointsTestAttribute");
  expect(PointsComponent).toBeInTheDocument();
  expect(PointsComponent).toHaveTextContent("0");
});
