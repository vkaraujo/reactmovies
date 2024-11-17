import { render, screen } from "@testing-library/react";
import App from "../App";

// Mock components used in App
vi.mock("../components/Header", () => ({
  Header: () => <header data-testid="header">Mock Header</header>,
}));

vi.mock("../components/Footer", () => ({
  Footer: () => <footer data-testid="footer">Mock Footer</footer>,
}));

vi.mock("../Router", () => ({
  Router: () => <div data-testid="router">Mock Router</div>,
}));

describe("App Component", () => {
  test("renders App without crashing", () => {
    render(<App />);

    // Check for the presence of critical components
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("router")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("contains BrowserRouter", () => {
    render(<App />);
    // Check that the Router component exists
    expect(screen.getByTestId("router")).toBeInTheDocument();
  });
});
