import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface TransactionProps {
  type: string;
  amount: string;
  createdAt: string;
  balanceBefore: string;
}

export default function TransactionItem({ type, amount, createdAt, balanceBefore }: TransactionProps) {
  const isCredit = type === "credit";

  const formattedDate = new Date(createdAt).toLocaleDateString("pt-BR");
  const formattedTime = new Date(createdAt).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View
      className={`bg-white p-4 rounded-lg shadow mb-3 flex-row justify-between`}
    >
      {/* Esquerda: Ícone + Tipo */}
      <View className="flex-row items-center">
        <FontAwesome5
          name={isCredit ? "arrow-down" : "arrow-up"}
          size={16}
          color={isCredit ? "green" : "red"}
        />
        <Text className="ml-2 font-bold text-gray-700">
          {isCredit ? "Depósito" : "Saque"}
        </Text>
      </View>

      {/* Centro: Valor */}
      <Text className={`font-bold text-lg ${isCredit ? "text-green-500" : "text-red-500"}`}>
        {isCredit ? "+ R$" : "- R$"} {amount}
      </Text>

      {/* Direita: Data e Saldo Anterior */}
      <View className="items-end">
        <Text className="text-gray-500 text-xs">{formattedDate} às {formattedTime}</Text>
        <Text className="text-gray-600 text-xs">Saldo antes: R$ {balanceBefore}</Text>
      </View>
    </View>
  );
}
