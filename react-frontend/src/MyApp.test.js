import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyApp from "./MyApp";

test("renders MyApp title", () => {
    render(<MyApp />);
    expect(screen.getByText("ToDo Croo")).toBeInTheDocument();
});

test("renders Sign In Button", () => {
    render(<MyApp />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
});
