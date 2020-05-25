import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Container, Header, Title, Content, List, ListItem } from "native-base";

const TransactionScreen = () => {
  return (
    <Container>
        <Header>
          <Title style={{fontSize: 20}}>Transaction History</Title>
        </Header>
        <Content>
          <List style={{marginTop: 20}}>
            <ListItem itemDivider>
              <Title>25 May</Title>
            </ListItem>                    
            <ListItem style={{flexDirection: 'row', justifyContent: 'space-between', height: 60}}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 20}}>Chicken Rice</Text>
                <Text style={{color: 'grey'}}>Food</Text>
              </View>
              <Text style={{color: 'red', fontSize: 25}}>-3.50</Text>
            </ListItem>
            <ListItem itemDivider>
              <Title>24 May</Title>
            </ListItem>                    
            <ListItem style={{flexDirection: 'row', justifyContent: 'space-between', height: 60}}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 20}}>EZ-Link Top Up</Text>
                <Text style={{color: 'grey'}}>Transport</Text>
              </View>
              <Text style={{color: 'red', fontSize: 25}}>-20.00</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
  )
}

export default TransactionScreen;