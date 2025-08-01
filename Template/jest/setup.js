// jest/setup.js

// Mock for react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
    const View = require('react-native/Libraries/Components/View/View');

    return {
        Swipeable: View,
        DrawerLayout: View,
        State: {},
        PanGestureHandler: View,
        TapGestureHandler: View,
        LongPressGestureHandler: View,
        NativeViewGestureHandler: View,
        FlingGestureHandler: View,
        GestureHandlerRootView: View,
        Directions: {},
    };
});
