import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { getStockQuote } from "../services/api";

export default function StockItem({ item, onDelete }) {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getStockQuote(item.symbol);
      setQuote(data);
    };
    fetch();
  }, []);

  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.symbol}>
          {item.symbol} - {item.name}
        </Text>
        {quote ? (
          <>
            <Text>Price: ₹{parseFloat(quote["05. price"]).toFixed(2)}</Text>
            <Text>Change: {quote["10. change percent"]}</Text>
          </>
        ) : (
          <Text>Loading quote...</Text>
        )}
      </View>
      <Button title="❌" onPress={() => onDelete(item._id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  symbol: { fontWeight: "bold", fontSize: 16 },
});
