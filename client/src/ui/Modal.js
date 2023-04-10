import { Box } from "@chakra-ui/react";

const Modal = (props) => {
  return (
    <>
      <Box
        position={"fixed"}
        top={0}
        left={0}
        w="100%"
        h="100vh"
        zIndex={10}
        backgroundColor={"rgba(0, 0, 0,0.52)"}
        onClick={props.onClose}
      />
      <Box
        position={"fixed"}
        top="10vh"
        left={{ base: "2.5rem", md: "23rem" }}
        boxShadow={"xl"}
        width={{ base: "80%", md: "40%" }}
        zIndex={50}
      >
        {props.children}
      </Box>
    </>
  );
};

export default Modal;
