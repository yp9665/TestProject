// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const HomeScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome to the Home Screen!</Text>
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   text: { fontSize: 22 },
// });


//For testing 

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Modal, Image, ScrollView } from 'react-native';
import TestingPracticeScreen from './TestingPracticeScreen';

const HomeScreen = () => {
  const [showExtraText, setShowExtraText] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showImage, setShowImage] = useState(true);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Always visible */}
        <Text style={styles.text} testID="header-title1">Welcome to the Home Screen!</Text>
        <TestingPracticeScreen />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, marginVertical: 5 },
  modalView: {
    backgroundColor: 'white',
    margin: 50,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
});
