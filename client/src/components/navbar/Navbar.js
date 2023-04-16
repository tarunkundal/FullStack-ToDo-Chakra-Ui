import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  WrapItem,
  useColorMode,
  Text,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
  AddIcon,
} from "@chakra-ui/icons";

import { NavLink } from "react-router-dom";
import { useStore } from "../../store/authStore/AuthContextProvider";
import NavbarMenuList from "./NavbarMenuList";
import Logo from "../../assets/logo_transparent.png";

const Navbar = () => {
  const { user } = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        position={"sticky"}
        top={"0"}
        left="0"
        w="full"
        zIndex={"10"}
      >
        <Flex h={14} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            colorScheme="gray"
            size={"sm"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Text
              display={{ base: "flex" }}
              fontSize="2xl"
              fontFamily="monospace"
              fontWeight="bold"
              textAlign={"center"}
            >
              <Image
                src={Logo}
                display={{ base: "none", md: "block" }}
                rounded="xl"
                boxSize={50}
              />
            </Text>

            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Box p="3px" _hover={{ color: "gray.500" }}>
                <NavLink to={"/"}>
                  <i className="fa-solid fa-house" />
                </NavLink>
              </Box>
              <Box p="3px" _hover={{ color: "gray.500" }}>
                <NavLink to="/tasks">
                  <i className="fa-solid fa-list-check" />
                </NavLink>
              </Box>
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Menu>
              <Button
                onClick={toggleColorMode}
                rounded={"full"}
                size={"sm"}
                mx={"5px"}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <MenuButton
                as={Button}
                rounded={"full"}
                cursor={"pointer"}
                minW={0}
              >
                <WrapItem display={"flex"} alignItems={"center"}>
                  <Avatar name={user.name} size={"sm"} />
                  <ChevronDownIcon />
                </WrapItem>
              </MenuButton>

              <NavbarMenuList />
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <NavLink to={"/"}>Home</NavLink>

              <NavLink to="/tasks">Tasks</NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
