import { Button, Text, CloseButton, Flex, Stack } from "@chakra-ui/react";

const Card = (props) => {
  return (
    <Stack
      p={{ base: "3", md: "5" }}
      boxShadow={"lg"}
      spacing={{ base: 3, md: 5 }}
      width={{ base: "70%", md: "35%" }}
      borderRadius={"lg"}
      mt="5"
      mx={"auto"}
    >
      <Flex justifyContent={"space-between"}>
        <Text fontSize={"lg"} fontWeight={"medium"}>
          message
        </Text>
        <CloseButton />
      </Flex>

      <Text>{props.message}</Text>

      <Stack direction={"row"} justifyContent={"right"}>
        <Button width="30%" size={"sm"} colorScheme="linkedin">
          Okay
        </Button>
      </Stack>
    </Stack>
  );
};

export default Card;
