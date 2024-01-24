import { useState } from "react";
import {
  ChakraProvider,
  Container,
  Heading,
  Button,
  Textarea,
  Center,
  Box,
  Flex,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import axios from "axios";

const App = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const toast = useToast();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleEnviarResposta = () => {
    // Adicione aqui a lógica para enviar a resposta do cliente e o comentário
    axios
      .post("https://back-app-avaliacao.onrender.com/add-avaliacao", {
        rating,
        comment,
      })
      .then((resposta) => {
        toast({
          title: "Avaliação enviada com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        return resposta.data;
      })
      .catch((error) => {
        console.log(`DEU ERROOOOOOO!!!!!: ${error}`);
        toast({
          title: "Erro ao enviar avaliação.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <ChakraProvider>
      <Center minH="100vh" bg="#171923">
        <Container>
          <Heading mb="50px" fontSize="50px" color="gold" align="center">
            Espetinho <br /> 🍖Gean & Wesley🔥
          </Heading>
          <Box className="form" p={6} rounded="md" bg="whiteAlpha.300">
            <Flex
              direction="column"
              align="center"
              justify="center"
              textAlign="center"
            >
              <Heading mb={4} color="white">
                Nos ajude a melhorar
              </Heading>
              <Heading mb={4} size={2} color="white">
                Avalie nosso serviço
              </Heading>
              <Box>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    as={StarIcon}
                    color={star <= rating ? "yellow.400" : "gray.300"}
                    boxSize={10}
                    mr={1}
                    cursor="pointer"
                    onClick={() => handleRatingChange(star)}
                  />
                ))}
              </Box>
              <Heading color="yellow" size="md" mt={4}>
                {rating} Estrelas
              </Heading>
              <Textarea
                placeholder="Deixe um comentário..."
                mt={4}
                color="white"
                onChange={handleCommentChange}
              />
              <Button colorScheme="teal" mt={4} onClick={handleEnviarResposta}>
                Enviar Resposta
              </Button>
            </Flex>
          </Box>
        </Container>
      </Center>
    </ChakraProvider>
  );
};

export default App;
