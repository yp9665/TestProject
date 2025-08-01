// components/AppTextContent.tsx
import React from 'react';
import {
    Text,
    Button,
    View,
    Alert,
    StyleSheet,
    GestureResponderEvent,
} from 'react-native';

type Variant = 'heading' | 'button' | 'alert' | 'status';

interface Props {
    variant: Variant;
    text: string;
    onPress?: (event: GestureResponderEvent) => void; // Only for button
    alertTitle?: string; // For alert box title
    alertMessage?: string; // For alert message body
}

const TextComponent: React.FC<Props> = ({
    variant,
    text,
    onPress,
    alertTitle = 'Alert',
    alertMessage = '',
}) => {
    if (variant === 'alert') {
        Alert.alert(alertTitle, alertMessage || text);
        return null;
    }

    if (variant === 'button') {
        return <Button testID='btn-testId' title={text} onPress={onPress || (() => { Alert.alert(alertTitle, alertMessage || text); })} />;
    }

    return (
        <View style={styles.wrapper}>
            <Text testID='heading-testId' style={{
                color: 'black',
                fontSize: 12,
                fontWeight: 'bold',
                textAlign: 'center'
            }}>{text}</Text>
        </View>
    );
};

export default TextComponent;

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 4,
    },
    base: {
        color: '#000',
        textAlign: 'left',
    },
});

const variantStyles: Record<string, any> = {
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 14,
        color: 'green',
        fontWeight: '500',
    },
};
