import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

describe('HomeScreen Visibility Tests', () => {
    test('should show static text elements as visible', () => {
        render(<HomeScreen />);
        expect(screen.getByTestId('header-title1')).toBeVisible();
        expect(screen.getByTestId('header-title2')).toBeVisible();
        expect(screen.getByText('Welcome to the Home Screen2!')).toBeVisible();
    });

    test('should show conditional text when button pressed', () => {
        render(<HomeScreen />);
        expect(screen.queryByTestId('conditional-text')).toBeNull(); // Not rendered initially

        fireEvent.press(screen.getByText('Show Text'));
        expect(screen.getByTestId('conditional-text')).toBeVisible();
    });

    test('should display modal text after clicking button', () => {
        render(<HomeScreen />);
        expect(screen.queryByTestId('modal-text')).toBeNull(); // Modal not shown yet

        fireEvent.press(screen.getByText('Show Modal'));
        expect(screen.getByTestId('modal-text')).toBeVisible(); // Modal text should appear
    });

    test('should hide image after clicking hide button', () => {
        render(<HomeScreen />);
        expect(screen.getByTestId('profile-image')).toBeVisible(); // Image is visible initially

        fireEvent.press(screen.getByText('Hide Image'));
        expect(screen.queryByTestId('profile-image')).toBeNull(); // Should not be in DOM
    });
});

describe('Home Screen', () => {
    test("test1", () => {
        render(<HomeScreen />)
        let data = screen.getByTestId('testing')
        expect(data).toHaveLength(2)
    })
    it('test2', () => {
        render(<HomeScreen />)
        expect(screen.getByTestId('testing')).toBeTruthy()
    })
    test("test3", () => {
        render(<HomeScreen />)
        let data2 = screen.getByLabelText('testing')
        expect(data2).toBeTruthy()
    })
})

describe("Home Screen", () => {
    beforeEach(() => {
        render(<HomeScreen />)
    })
    afterEach(() => {
        render(<HomeScreen />)
    })
    beforeAll(() => {
        render(<HomeScreen />)
    })
    afterAll(() => {
        render(<HomeScreen />)
    })
    test("testing", () => {
        expect(screen.getByTestId('testing')).toHaveTextContent('testing')
    })
})
