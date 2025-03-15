import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        router.replace("/(tabs)/Home");
      }
    };
    checkLogin();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", { document, password });
      const { token, account } = response.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("accountId", account.data.id);

      router.replace("/(tabs)/Home");
    } catch (error) {
      Alert.alert("Erro", "Login falhou. Verifique suas credenciais.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-5">
      <Text className="text-2xl font-bold mb-5">Login</Text>
      <TextInput
        className="border border-gray-300 rounded p-3 w-full mb-3"
        placeholder="Documento"
        value={document}
        onChangeText={setDocument}
        keyboardType="numeric"
      />
      <TextInput
        className="border border-gray-300 rounded p-3 w-full mb-3"
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity className="bg-blue-500 p-3 rounded w-full" onPress={handleLogin}>
        <Text className="text-white text-center font-bold">Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
