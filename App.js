import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import UserValidation from './src/requests/UserValidation';
import GetCards from './src/requests/GetCards';
import styles from './src/style/styles';
import GetBalance from './src/requests/GetBalance'
import GetTransactions from './src/requests/GetTransactions'
import CardDisable from './src/requests/CardDisable'

const App = () => {

  const [userCardsInfoArray, SetUserCardsInfoArray] = useState(null)
  const [userId, SetUserID] = useState(0);

  useEffect(() => {
    async function getCardsUser() {
      const id = await UserValidation();
      if (id == null)
        return;

      SetUserID(id)

      const cardsArray = await GetCards(id)
      if (cardsArray == null)
        return;

      SetUserCardsInfoArray(cardsArray)
    }

    getCardsUser()
  }, [])

  const getBalance = async () => {
    const userBalance = await GetBalance(userId);
    alert(userBalance)
  }

  const getTransactions = async () => {
    const userTransections = await GetTransactions(userId);
    alert(userTransections)
  }

  const cardDisable = async (idCards) => {
    const result = await CardDisable(userId, idCards);
    if (result == null)
      return;

    SetUserCardsInfoArray(userCardsInfoArray.filter(item => item.id !== idCards))

  }

  return (
    <View style={styles.containerMain}>
      <ScrollView >
        {userCardsInfoArray == null ?
          <Text>Loading...</Text>
          :
          <View>

            <TouchableOpacity style={styles.balanceAndTransactions} onPress={() => getBalance()}>
              <Text style={styles.balanceText}>Show balance</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.balanceAndTransactions} onPress={() => getTransactions()}>
              <Text style={styles.balanceText}>Show transactions</Text>
            </TouchableOpacity>



            <Text style={styles.card}>Cards</Text>
            <View>
              {userCardsInfoArray.map((item) => (
                <TouchableOpacity onPress={() => cardDisable(item.id)} key={item.id} style={styles.cards}>
                  <Text style={styles.textCards}>{item.number}</Text>
                  <Text style={styles.textCards}>{item.status}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        }

      </ScrollView>
    </View>
  );
};


export default App;