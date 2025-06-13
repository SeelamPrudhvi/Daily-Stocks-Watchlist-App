import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { addStock, deleteStock, getWatchlist } from '../../services/api';
import StockItem from '../../components/StockItem';

export default function HomeScreen() {
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    const data = await getWatchlist();
    setWatchlist(data);
  };

  const handleAdd = async () => {
    if (!symbol || !name) return;
    await addStock(symbol.toUpperCase(), name);
    setSymbol('');
    setName('');
    fetchWatchlist();
  };

  const handleDelete = async (id) => {
    await deleteStock(id);
    fetchWatchlist();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Stock</Text>
      <TextInput placeholder="Symbol" value={symbol} onChangeText={setSymbol} style={styles.input} />
      <TextInput placeholder="Company Name" value={name} onChangeText={setName} style={styles.input} />
      <Button title="Add to Watchlist" onPress={handleAdd} />

      <Text style={styles.header}>Watchlist</Text>
      <FlatList
        data={watchlist}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <StockItem item={item} onDelete={handleDelete} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 50 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  header: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
});
