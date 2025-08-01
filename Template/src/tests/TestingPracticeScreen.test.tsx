import { cleanup, render, screen } from "@testing-library/react-native"
import TestingPracticeScreen from "../screens/TestingPracticeScreen"

test("checking test pratice screen title", () => {
    render(<TestingPracticeScreen />)
    let data = screen.getByText('Testing Practice')
    expect(data).toHaveTextContent('Testing Practice')
})

test("checking test pratice screen title visible or not by id", () => {
    render(<TestingPracticeScreen />)
    let title = screen.getByTestId('screen-title')
    //Checks if an element is visible (i.e., not hidden via CSS like display: none, visibility: hidden, or opacity: 0).
    expect(title).toBeVisible()
})

describe('Checking test practice screen multiple text ', () => {
    beforeAll(() => {
        render(<TestingPracticeScreen />)
    })
    test('Multiple tobeVisible and toHaveTextContent Testing', () => {
        //Array Data - MultipleText
        let MultipleText = screen.getAllByText('Multiple Text')

        // not getting non visible text or element in DOM
        // let MultipleText2 = screen.getByTestId('non-visible')

        // ✅ Check visibility
        expect(MultipleText[0]).toBeVisible()
        expect(MultipleText[1]).toBeVisible()
        expect(MultipleText[2]).toBeVisible()
        //non visible not working in react native  also not getting non visible text or element in DOM
        // expect(MultipleText2).not.toBeVisible()

        //Partial match, useful for substring check
        expect(MultipleText[0]).toHaveTextContent('Multiple', { exact: false })
        //Case-insensitive and flexible
        expect(MultipleText[1]).toHaveTextContent(/multiple text/i)
        //Exact match
        expect(MultipleText[1]).toHaveTextContent('Multiple Text')
    })
})


describe('Checking Text method - queryByText() & findByText()', () => {
    beforeAll(() => {
        render(<TestingPracticeScreen />)
    })
    test("queryByText()", () => {
        let data = screen.queryByText('Query Text')
        expect(data).toHaveTextContent('Query Text')
    })
    afterAll(() => {
        cleanup()
    })
})

describe("UNIT TESTING COMPONENT", () => {
    test('testing', () => {

    })
})