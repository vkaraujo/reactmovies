import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "../Router";

vi.mock("../pages/Home", () => ({
  Home: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock("../pages/Filmes", () => ({
  Filmes: () => <div data-testid="filmes-page">Filmes Page</div>,
}));

vi.mock("../pages/Series", () => ({
  Series: () => <div data-testid="series-page">Series Page</div>,
}));

vi.mock("../pages/NotFound", () => ({
  NotFound: () => <div data-testid="not-found-page">Not Found Page</div>,
}));

vi.mock("../pages/Detalhes", () => ({
  Detalhes: () => <div data-testid="detalhes-page">Detalhes Page</div>,
}));

describe("Router Component", () => {
  test("renders Home page for '/' route", () => {
    window.history.pushState({}, "Home Page", "/");
    render(
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    );

    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  test("renders Filmes page for '/filmes' route", () => {
    window.history.pushState({}, "Filmes Page", "/filmes");
    render(
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    );

    expect(screen.getByTestId("filmes-page")).toBeInTheDocument();
  });

  test("renders Series page for '/series' route", () => {
    window.history.pushState({}, "Series Page", "/series");
    render(
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    );

    expect(screen.getByTestId("series-page")).toBeInTheDocument();
  });

  test("renders Detalhes page for '/detalhes/:categoria/:id' route", () => {
    window.history.pushState({}, "Detalhes Page", "/detalhes/filmes/123");
    render(
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    );

    expect(screen.getByTestId("detalhes-page")).toBeInTheDocument();
  });

  test("renders NotFound page for unmatched routes", () => {
    window.history.pushState({}, "Not Found Page", "/random-path");
    render(
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    );

    expect(screen.getByTestId("not-found-page")).toBeInTheDocument();
  });
});
