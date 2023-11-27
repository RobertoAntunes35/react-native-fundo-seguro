import { FlatList, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import Balance from "../../components/Balance";
import TransactionCard from "../../components/TransactionCard";
import Actions from "../../components/Actions";
import { useNavigation } from "@react-navigation/native";
import { useDebit } from "../../context/accountsContext";
import { useState } from "react";

const Home = () => {
    const navigation = useNavigation()
    const { state, totalCredit, totalDebit, lista_valores } = useDebit();

    const saldo_final = totalCredit - totalDebit
    const renderItem = ({item}) => (
        <TransactionCard
        type={item.type}
        amount={item.amount}
        description={item.description}
        />
    )

    return (
        <View style={styles.container}>
            <Header name="Roberto Antunes"/>
            <Balance saldo={saldo_final} gastos={totalDebit}/>
            <Actions/>
            <Text style={styles.title}>Últimas Movimentação</Text>
            <FlatList
            style={styles.list}
            data={lista_valores}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#F4F4F4'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 14,
        marginLeft: 14,
        marginTop:10
    },
    list: {
        marginStart: 14,
        marginEnd: 14,

    }
})

export default Home;