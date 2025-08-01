import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    ActivityIndicator,
    Switch,
    FlatList,
    Modal,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

// 🔹 Types
type Profile = {
    name: string;
    age: string;
    city: string;
};

type GreetingCardProps = {
    name: string;
};

// 🔹 Child component for props testing
const GreetingCard: React.FC<GreetingCardProps> = ({ name }) => (
    <View style={styles.card}>
        <Text>Hello, {name}!</Text>
    </View>
);

const TestingPracticeScreen: React.FC = () => {
    // 🔹 State variables
    const [name, setName] = useState<string>('');
    const [clickCount, setClickCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [users, setUsers] = useState<string[]>(['Yogesh', 'Ajay', 'Meera']);

    const [profile, setProfile] = useState<Profile>({
        name: '',
        age: '',
        city: '',
    });

    // 🔹 useEffect
    useEffect(() => {
        console.log('TestingPracticeScreen mounted');
        setShowMessage(true);
    }, []);

    // 🔹 Simulated fetch
    const handleFetch = (): void => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={{
                    // opacity: 1,
                    // display: 'none'
                }} testID='screen-title'>Testing Practice</Text>
                <Text style={{
                    opacity: 1,
                    // display: 'none'
                }}>Multiple Text</Text>
                <Text style={{
                    opacity: 1,
                    // display: 'none'
                }}>Multiple Text</Text>
                {/* <Text testID='non-visible' style={{
                    opacity: 0,
                    display: 'none'
                }}>Multiple Texting</Text> */}

                {/* Checking Text method - queryByText() & findByText() */}
                <Text style={{
                    opacity: 1,
                    // display: 'none'
                }}>Query Text</Text>

                {/* 🔹 useEffect text */}
                {showMessage && <Text style={styles.text}>Component Loaded!</Text>}

                {/* 🔹 Controlled TextInput */}
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter name"
                />

                {/* 🔹 Disabled Button */}
                <Button
                    title="Greet"
                    onPress={() => Alert.alert(`Hello, ${name}`)}
                    disabled={name.trim() === ''}
                />

                {/* 🔹 Click counter */}
                <Button title="Click Me" onPress={() => setClickCount(prev => prev + 1)} />
                <Text>You clicked {clickCount} times</Text>

                {/* 🔹 Simulate API */}
                <Button title="Simulate API Call" onPress={handleFetch} />
                {isLoading && <ActivityIndicator size="large" color="blue" />}

                {/* 🔹 Switch */}
                <View style={styles.row}>
                    <Text>Dark Mode:</Text>
                    <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
                </View>

                {/* 🔹 Modal */}
                <Button title="Open Modal" onPress={() => setModalVisible(true)} />
                <Modal visible={modalVisible} transparent animationType="fade">
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                        <View style={styles.modalOverlay}>
                            <TouchableWithoutFeedback>
                                <View style={styles.modalContent}>
                                    <Text>This is a modal window!</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                {/* 🔹 FlatList */}
                <Text style={styles.text}>User List:</Text>
                <FlatList
                    data={users}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Text style={styles.userItem}>{item}</Text>
                    )}
                    ListEmptyComponent={<Text>No users found</Text>}
                />

                {/* 🔹 Object Input Fields */}
                <Text style={styles.text}>Profile Form:</Text>
                <TextInput
                    style={styles.input}
                    value={profile.name}
                    onChangeText={text =>
                        setProfile(prev => ({ ...prev, name: text }))
                    }
                    placeholder="Profile Name"
                />
                <TextInput
                    style={styles.input}
                    value={profile.age}
                    onChangeText={text =>
                        setProfile(prev => ({ ...prev, age: text }))
                    }
                    placeholder="Age"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    value={profile.city}
                    onChangeText={text =>
                        setProfile(prev => ({ ...prev, city: text }))
                    }
                    placeholder="City"
                />
                <Text>
                    Profile: {profile.name}, {profile.age}, {profile.city}
                </Text>

                {/* 🔹 Reusable component with props */}
                <GreetingCard name={profile.name || 'Guest'} />

            </View>
        </TouchableWithoutFeedback>
    );
};

export default TestingPracticeScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    text: { fontSize: 18, fontWeight: '600', marginVertical: 6 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 6,
        marginVertical: 8,
    },
    userItem: {
        fontSize: 16,
        paddingVertical: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        gap: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        minWidth: '70%',
        alignItems: 'center',
    },
    card: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#eef',
        borderRadius: 8,
        alignItems: 'center',
    },
});
