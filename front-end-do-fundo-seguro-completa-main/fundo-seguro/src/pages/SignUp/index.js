import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, DatePickerAndroid, DatePickerIOS, Plataform} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
    const navigation = useNavigation()
    

    const [chosenDate, setChosenDate] = useState(new Date()) 
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        data_nascimento: '',
        password:'',

    });

    const showDatapicker = async () => {
        if (Plataform.OS === 'android') {
            try {
                const {action, year, month, day} = await DatePickerAndroid.open({
                    date: chosenDate
                });
                if (action !== DatePickerAndroid.dismessedAction) {
                    const selectedDate = new Date(year, month, day);
                    setChosenDate(selectedDate)
                }
            } catch ({code, message}) {
                console.warn('Cannot open date picker', message)
            }
        } else {
            setShowDatePicker(true)
        }
    }
    const handleInputChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        })
    }
    const handleSubmit = () => {
        navigation.navigate('Home')
        
        // Configuração de autenticação
    }
    const hideDatePicker = () => {
        setShowDatePicker(false);
    }
    const handleDateChange = (date) => {
        setChosenDate(date);
        hideDatePicker();
    }

    return (
            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                    <TextInput
                    placeholder='Digite um Email ...'
                    style={styles.input}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={formData.email}
                    />

                <Text style={styles.title}>Senha</Text>
                    <TextInput
                    placeholder='Digite sua senha ...'
                    style={styles.input}
                    onChangeText={(value) => handleInputChange('password', value)}
                    secureTextEntry
                    value={formData.password}
                    />

                <TouchableOpacity style={styles.button}
                onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

                <View> 
                    <TouchableOpacity onPress={showDatapicker}>
                        <Text>{chosenDate.toDateString()}</Text>
                    </TouchableOpacity>
                    {showDatapicker && (
                        <DatePickerIOS
                        date={chosenDate}
                        onDateChange={handleDateChange}
                        mode="date"
                        />
                    )}
                </View>
        </Animatable.View>
            
    );
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#38a69d',
    },
    containerHeader: {
        marginTop: '15%',
        marginBottom: '8%',
        paddingStart:'5%'
    },
    message: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold'
    },
    containerForm: {
        backgroundColor: '#fff',
        flex:1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        fontSize: 20,
        marginTop: 20
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16
    },
    button: {
        backgroundColor: '#38a69d',
        width: '100%',
        borderRadius: 25,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems:'center'
    },
    buttonText: {
        color:'#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center'
    },
    registerText: {
        color: '#a1a1a1'
    }

})