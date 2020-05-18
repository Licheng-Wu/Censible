import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function HomePage() {
    return null;
}

const MonthlyExpenseGoal = () => {
    return (
        <View style={styles.MonthlyExpenseGoalContainer}>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    MonthlyExpenseGoalContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});