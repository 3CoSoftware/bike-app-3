import React from 'react'
import NavBar from '../NavBar'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'

afterEach(() => {
    cleanup();
});

test("NavBar will render with correct text", () => {
    const component = render(<NavBar />, { wrapper: MemoryRouter });
    const header = component.getByTestId("navbar");

    expect(header.textContent).toBe("BikeApp");
})