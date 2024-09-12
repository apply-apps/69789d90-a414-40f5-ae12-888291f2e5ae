// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const TaleList = ({ tales }) => {
    return (
        <View style={styles.taleContainer}>
            {tales ? <Text style={styles.tale}>{tales}</Text> : <Text style={styles.noTale}>No tale generated yet.</Text>}
        </View>
    );
};

export default function App() {
    const [heroes, setHeroes] = useState('');
    const [villains, setVillains] = useState('');
    const [plot, setPlot] = useState('');
    const [loading, setLoading] = useState(false);
    const [tales, setTales] = useState('');

    const generateTales = async () => {
        setLoading(true);

        try {
            const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please provide a fairy tale based on the given characters and plot." },
                    { role: "user", content: `Please create a fairy tale with the following elements. Heroes: ${heroes}, Villains: ${villains}, Plot: ${plot}.` }
                ],
                model: "gpt-4o"
            });

            const { data } = response;
            const resultString = data.response;
            setTales(resultString);
        } catch (error) {
            console.error('Error fetching the tale:', error);
        }

        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Fairy Tale Generator</Text>
            <ScrollView contentContainerStyle={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Heroes"
                    value={heroes}
                    onChangeText={setHeroes}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Villains"
                    value={villains}
                    onChangeText={setVillains}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Plot"
                    value={plot}
                    onChangeText={setPlot}
                />
                <Button title="Generate Tale" onPress={generateTales} />
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
                {!loading && <TaleList tales={tales} />}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    inputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
    },
    taleContainer: {
        marginTop: 20,
    },
    tale: {
        fontSize: 16,
        lineHeight: 24,
        marginVertical: 10,
    },
    noTale: {
        fontSize: 16,
        color: '#CCCCCC',
        fontStyle: 'italic',
        textAlign: 'center',
        marginVertical: 20,
    },
});