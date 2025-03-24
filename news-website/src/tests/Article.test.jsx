import React from "react"; 
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Article from '../components/Article';

describe('Article Component', () => {
    test("renders title and content", () => {
        render(
            <MemoryRouter>
                <Article id={1} title="Naujas straipsnis 123" content="Straipsnio kontentas 123" />
            </MemoryRouter>
        );
        expect(screen.getByText("Naujas straipsnis 123")).toBeInTheDocument();
        expect(screen.getByText("Straipsnio kontentas 123")).toBeInTheDocument();
    });
});
