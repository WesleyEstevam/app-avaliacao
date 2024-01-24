import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import io from "socket.io-client";
import axios from "axios";

const ListaAvaliacoes = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);

  useEffect(() => {
    // Função para buscar todas as avaliações
    const fetchAvaliacoes = async () => {
      try {
        const response = await axios.get(
          "https://back-app-avaliacao.onrender.com/avaliacoes"
        );
        setAvaliacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
      }
    };

    // Chama a função para buscar avaliações ao montar o componente
    fetchAvaliacoes();

    // Conectar-se ao servidor usando WebSocket
    const socket = io("https://back-app-avaliacao.onrender.com");

    // Escutar o evento "nova-avaliacao" e atualizar a tabela
    socket.on("nova-avaliacao", (novaAvaliacao) => {
      // Atualizar o estado localmente
      setAvaliacoes((prevAvaliacoes) => [...prevAvaliacoes, novaAvaliacao]);
    });

    // Limpar o socket ao desmontar o componente
    return () => {
      socket.disconnect();
    };
  }, []); // O array de dependências vazio garante que o efeito é executado apenas uma vez no montagem

  return (
    <ChakraProvider>
      <Container mt={10}>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr bgColor="#171923">
              <Th color="white">Quantidade de Estrelas</Th>
              <Th color="white">Comentários</Th>
            </Tr>
          </Thead>
          <Tbody>
            {avaliacoes.map((avaliacao) => (
              <Tr key={avaliacao.id_rating}>
                <Td>{avaliacao.rating}</Td>
                <Td>{avaliacao.comment}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </ChakraProvider>
  );
};

export default ListaAvaliacoes;
