import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Home() {
  interface Account {
    name: string;
    balance: number;
  }

  const [account, setAccount] = useState<Account | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAccount = async () => {
      const token = await AsyncStorage.getItem("token");
      const accountId = await AsyncStorage.getItem("accountId");

      try {
        const response = await axios.get(`http://localhost:3001/accounts/${accountId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccount(response.data.account.data.attributes);
      } catch (error) {
        Alert.alert("Erro", "Falha ao buscar os dados.");
      }
    };

    fetchAccount();
  }, []);

  const handleLogout = async () => {
    const token = await AsyncStorage.getItem("token");
    await axios.delete("http://localhost:3001/logout", {
      headers: { Authorization: `Bearer ${token}` },
    });
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("accountId");

    router.replace("../Login");
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-5">
      {account ? (
        <>
          <Text className="text-2xl font-bold">Bem-vindo, {account.name}</Text>
          <Text className="text-lg mt-2">Saldo: R$ {account.balance}</Text>

          <TouchableOpacity className="bg-red-500 p-3 rounded mt-5" onPress={handleLogout}>
            <Text className="text-white font-bold">Sair</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Carregando...</Text>
      )}
    </View>
  );
}
