import {
  Box,
  Container,
  IconButton,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo_transparent.png";

const Footer = () => {
  return (
    <Box
      borderTop={"1px"}
      borderTopColor={"gray"}
      bg={useColorModeValue("gray.50", "gray.700")}
      color={useColorModeValue("gray.700", "gray.200")}
      mt={"5rem"}
      // mb={0}
      width={"100%"}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-around" }}
        align={{ base: "center", md: "center" }}
      >
        <Image src={logo} alt="logo" w="60px" />

        <Text fontWeight="medium">© 2023 Taskify.com All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <IconButton
            size={"sm"}
            as="a"
            href={"https://www.youtube.com"}
            icon={<FaYoutube />}
            target="blank"
          />
          <IconButton
            icon={<FaTwitter />}
            as="a"
            size={"sm"}
            href={"https://www.twitter.com"}
            target="blank"
          />
          <IconButton
            icon={<FaInstagram />}
            size={"sm"}
            as={"a"}
            href={"https://www.instagram.com"}
            target="blank"
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
