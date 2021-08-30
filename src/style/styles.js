import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerMain: {
        backgroundColor: "#F7F6F2",
        justifyContent: "center",
        flex: 1, 
        padding: 15  
    },

    balanceAndTransactions: {
        alignItems: 'center',
        margin: 5,
        marginBottom: 25,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#3d3b3c',
        backgroundColor: '#C8C6C6'

    },

    balanceText: {
        fontSize: 18
    },

    card: {
        textAlign: 'center',
        fontSize: 25
    },
    
    cards: {
        backgroundColor: '#4B6587',
        borderRadius: 5,
        padding: 10,
        margin: 5,
        marginBottom: 10,
        // alignItems: 'stretch'
    },

    textCards: {
        color: '#f0f3f5'

    },




})

export default styles;