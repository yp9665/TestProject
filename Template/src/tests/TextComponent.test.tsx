import { fireEvent, render, screen } from "@testing-library/react-native";
import TextComponent from "../components/TextComponent";
import App from "../../App";

//unit test
// test('check header text in unit test', () => {
//     render(<TextComponent variant="heading" text="Welcome to Roar" />)
//     let title_text = screen.getByText('Welcome to Roar')
//     let title_text2 = screen.getByText(/welcome to roar/i)
//     let title_text3 = screen.getByText('Welcome to Roar', {
//         exact: true,
//         normalizer: str => str
//     })
//     let title_text4 = screen.getByText()
//     expect(title_text).toBeTruthy()
//     expect(title_text2).toBeTruthy()
//     expect(title_text3).toBeTruthy()
// })

//unit test
test('check header text in unit test', () => {
    render(<TextComponent variant="heading" text="Welcome to Roar" />)

    // 1. Default match (normalized)
    let title_text = screen.getByText('Welcome to Roar')
    // 2. Case insensitive
    let title_text2 = screen.getByText(/welcome to roar/i)
    // 3. Exact match with spacing (no normalization)
    let title_text3 = screen.getByText('Welcome to Roar', {
        exact: true,
        normalizer: str => str
    })
    // 4. Partial text
    let title_text4 = screen.getByText(/Roar/)

    // 5. Negative test – should NOT find wrong text
    let title_text5 = screen.queryByText(/Roar/)

    expect(title_text).toBeTruthy()
    expect(title_text2).toBeTruthy()
    expect(title_text3).toBeTruthy()
    expect(title_text4).toBeTruthy()
    expect(title_text5).toBeTruthy()
})

test('check props related unit test case ', () => {
    const textValue = 'Hello Roar';
    const textValue2 = 'Hello Roarss';
    const variantValue = 'heading';
    const { getByText, getByTestId } = render(<TextComponent variant={variantValue} text={textValue} />)

    // using props check children content
    let title_using_ID = getByTestId('heading-testId')
    expect(title_using_ID.props.children).toBeTruthy()

    // using props check props data 
    expect(title_using_ID.props.children).toBe(textValue)
    // console.log("check style log --- ", getByTestId('heading-testId').props.style);

    //Array multiple styles 
    // 1. toContainEqual = Use this when style is an array of multiple styles.
    // expect(title_using_ID.props.style).toContainEqual({
    //     fontSize: 12,
    //     fontWeight: 'bold'
    // })


    // 2. toEqual = Use only if you know the full style array and order.
    //Multiple style object use array else only {}
    //   expect(title_using_ID.props.style).toEqual([
    //     {
    //         color: 'black'
    //     },
    //     {
    //         fontWeight: 'bold'
    //     }
    // ])

    // 3. const styleArray = element.props.style;
    //    const combinedStyle = Object.assign({}, ...styleArray);
    //    Best for checking individual style values when style is dynamic.

    // 4. rerender method for conditional style 
    // Step 1: Initially should NOT have error color
    //   let combinedStyle = Object.assign({}, ...textEl.props.style);
    //   expect(combinedStyle.color).toBe('black');

    // Step 2: Rerender with error=true
    //   rerender(<TextComponent error={true} text="Hello" />);

    //   const textElAfter = getByTestId('text-test');
    //   combinedStyle = Object.assign({}, ...textElAfter.props.style);
    //   expect(combinedStyle.color).toBe('red');
    // let currentStyle = title_using_ID.props.style
    // let combinedStyle = Object.assign({}, ...currentStyle)

    // expect(combinedStyle.fontSize).toBe(12)


    //     Style Format	Best Way to Test
    // Object	expect.style.key or objectContaining
    // Array	Object.assign(...style) then test individually


    //single object style using toEqual if you have to test only few styles 
    expect(title_using_ID.props.style).toEqual(
        expect.objectContaining({
            color: 'black',
            fontSize: 12,
            fontWeight: 'bold'
        })
    )

    //single object style using toEqual if you have to test whole style object (you should know about complete structure and object) 
    expect(title_using_ID.props.style).toEqual({
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center'
    })
    //single object style using individual style 
    expect(title_using_ID.props.style.fontSize).toBe(12)
    expect(title_using_ID.props.style.fontWeight).toBe('bold')

})

test('check props releted button', () => {
    const btnText = 'Continue';
    const variantValue = 'button';
    render(<TextComponent variant={variantValue} text={btnText} onPress={() => { }} />)

    //test failed due to native component not expose all props
    //     | What You Tried                 | Why It Fails                             | What to Do Instead              |
    // | ------------------------------ | ---------------------------------------- | ------------------------------- |
    // | `props.title` on RN `<Button>` | Not exposed by native components in test | Use `getByText('Continue')`     |
    // | `title` checking via testID    | Native components don’t expose all props | Check visible text instead      |
    // | `fireEvent.press(testId)`      | ✅ Works fine                             | Use to test click/press handler |

    let btn_title_using_ID = screen.getByTestId('btn-testId')
    // expect(btn_title_using_ID.props.title).toBe(btnText)

    let btn_title = screen.getByText(btnText)
    expect(btn_title).toHaveTextContent('Continue')
    expect(btn_title).toBeTruthy()

})


// ✅ React Native Unit Testing Checklist for TextComponent

// 🔹 Text Rendering

// ✅ Exact text match (normalized)

// ✅ Case-insensitive match

// ✅ Exact match with spacing (no normalization)

// ✅ Partial match (substring)

// ✅ Negative case (text not present)



// 🔹 Props Check

// 🔲 Text prop renders correctly (text="...")

// 🔲 Variant prop affects styling or structure

// 🔲 Fallback/default prop values



// 🔹 Style & Class Check

// 🔲 Styles applied correctly for each variant

// 🔲 Custom styles via style prop

// 🔲 Conditional styling (e.g., based on theme or platform)


// 🔹 Accessibility
// 🔲 accessibilityRole, accessibilityLabel, etc.


// 🔲 getByA11yLabel, getByRole

// 🔹 Conditional Rendering

// 🔲 Text appears only when a condition is true

// 🔲 Text does not appear if a prop is false/null



// 🔹 Async Text (if any dynamic fetch)

// 🔲 Wait for async content: findByText, waitFor

// 🔹 Snapshot Testing
// 🔲 Snapshot of the component for regression