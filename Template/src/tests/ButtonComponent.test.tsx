import { render, screen } from "@testing-library/react-native"
import ButtonComponent from "../components/ButtonComponent"

describe("button component unit testing", () => {
    test('button render or not ', () => {
        const btnTitle = 'Click'
        render(<ButtonComponent title={btnTitle} onPress={() => { }} disabled />)

        // ✅ Dynamic RegExp from variable — case-insensitive
        let btn_title = screen.getByText(new RegExp(btnTitle, 'i'))
        let btn_id = screen.getByTestId('btn-id')

        //check button title 
        expect(btn_title).toBeTruthy()

        //how many props we are passing 
        expect(Object.keys(btn_title.props).length).toBe(2)
        expect(btn_title.props.children).toBe('Click')
        // //check button props
        // expect(btn_title.props)

    }) 
})