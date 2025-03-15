import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import TransactionItem from "@/components/TransactionItem";

export default function Home() {
  interface Account {
    name: string;
    balance: number;
  }

  interface Transaction {
    id: string;
    attributes: {
      transaction_type: string;
      amount: string;
      created_at: string;
      balance_before: string;
    };
  }

  const [account, setAccount] = useState<Account | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [hideBalance, setHideBalance] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAccount = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const accountId = await AsyncStorage.getItem("accountId");

        if (!token || !accountId) {
          Alert.alert("Erro", "Usuário não autenticado!");
          router.replace("/Login");
          return;
        }

        // Obtendo os dados da conta e transações
        const response = await axios.get(`http://localhost:3001/accounts/${accountId}/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAccount(response.data.account.data.attributes);
        setTransactions(response.data.transactions.data);
      } catch (error) {
        Alert.alert("Erro", "Falha ao buscar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, []);

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      await axios.delete("http://localhost:3001/logout", {
        headers: { Authorization: `Bearer ${token}` },
      });

      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("accountId");

      router.replace("/Login");
    } catch (error) {
      Alert.alert("Erro", "Falha ao sair.");
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      {loading ? (
        <Text className="text-center text-gray-500 mt-5">Carregando...</Text>
      ) : account ? (
        <>
          {/* Header */}
          <View className="bg-blue-600 p-5 rounded-b-3xl shadow-lg">
            <Text className="text-white text-lg font-bold">Olá, {account.name}</Text>
            <TouchableOpacity onPress={() => setHideBalance(!hideBalance)}>
              <Text className="text-white text-2xl font-bold mt-2">
                Saldo: {hideBalance ? "****" : `R$ ${account.balance}`}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Container do histórico para expandir melhor */}
          <View className="flex-1 p-5">
            <Text className="text-lg font-bold text-gray-700 mb-3">Histórico de Transações</Text>

            {/* Lista de Transações Expandida */}
            {transactions.length === 0 ? (
              <Text className="text-center text-gray-500">Nenhuma transação encontrada.</Text>
            ) : (
              <FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TransactionItem
                    type={item.attributes.transaction_type}
                    amount={item.attributes.amount}
                    createdAt={item.attributes.created_at}
                    balanceBefore={item.attributes.balance_before}
                  />
                )}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
              />
            )}
          </View>

          {/* Botão de Logout */}
          <TouchableOpacity className="bg-red-500 p-3 rounded mt-3 mb-5 mx-5" onPress={handleLogout}>
            <Text className="text-white font-bold text-center">Sair</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text className="text-center text-gray-500">Erro ao carregar os dados.</Text>
      )}
    </View>
  );
}
