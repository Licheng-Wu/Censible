import React, { Component } from 'react';
import { Container, Header, Content, InputGroup, Input, Title, Button } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';

export default class AddExpensePage extends Component {
    render() {
        return (      
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <InputGroup borderType='underline' >
                        <Input style={styles.TextInputs} placeholder='Item Name' />
                        <Input style={styles.NumberInputs} keyboardType = 'numeric' placeholder='Amount' />
                    </InputGroup>
                    <Button style={styles.AddButton} primary><Text>Add</Text></Button>
                </Content>

            </Container>
               
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // width: 300,
        marginTop: 30,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    TextInputs: {
        flex: 1,
        flexDirection: 'column',
        width:20,
        marginBottom: 30,
    },
    NumberInputs: {
        flex: 1,
        flexDirection: 'column',
        width:20,
        marginBottom: 30,
    },
    AddButton: {
        width:100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});