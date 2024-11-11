import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios'; // Importa o Axios para fazer a requisição HTTP

export default function App() {
  const [data, setData] = useState(null); // Estado para armazenar os dados recebidos
  const [loading, setLoading] = useState(true); // Estado de carregamento

  // Função para fazer a requisição HTTP
  const fetchData = async () => {
    try {
      // Substitua a URL pela URL da API ou site de sua escolha
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setData(response.data); // Armazena os dados recebidos no estado
      setLoading(false); // Define o carregamento como false após a requisição
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setLoading(false); // Mesmo em caso de erro, define carregamento como false
    }
  };

  useEffect(() => {
    fetchData(); // Chama a função de requisição quando o componente for montado
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        data?.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        ))
      )}
      <Button title="Atualizar Dados" onPress={fetchData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
  },
});
