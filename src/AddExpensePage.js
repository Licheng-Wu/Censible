import React, { Component } from 'react';
import { Container, Header, Content, InputGroup, Input, Title, Button } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';

export default class AddExpensePage extends Component {
    render() {
        return (      
            <Container>
                <Header></Header>
                <Content contentContainerStyle={styles.container}>
                    <InputGroup borderType='underline' >
                        <Input style={styles.Inputs} placeholder='Item Name' />
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
    Inputs: {
        width:20,
    },
    AddButton: {
        width:100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});