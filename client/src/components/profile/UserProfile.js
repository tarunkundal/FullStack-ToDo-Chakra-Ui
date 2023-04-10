import { EmailIcon, InfoIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
  WrapItem,
  Flex,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import EditUserProfile from "./EditUserProfile";
import Modal from "../../ui/Modal";
import { useTaskStore } from "../../store/tasks/TaskProvider";
import { useStore } from "../../store/authStore/AuthContextProvider";
import useFetchActiveTasks from "../../hook/useFetchActiveTasks";
import useFetchCompletedTasks from "../../hook/useFetchCompletedTasks";
import useFetchOverdueTasks from "../../hook/useFetchOverdueTasks";
import { useHistory } from "react-router-dom";

const UserProfile = () => {
  const { user } = useStore();
  const { tasks } = useTaskStore();
  const { activeTasks } = useFetchActiveTasks();
  const { completedTasks } = useFetchCompletedTasks();
  const { OverDueTasks } = useFetchOverdueTasks();

  const [editProfile, setEditProfile] = useState(false);
  const history = useHistory();

  const openEditProfile = () => {
    setEditProfile(true);
  };
  const closeEditProfile = useCallback(() => {
    setEditProfile(false);
  }, []);

  return (
    <>
      {editProfile && (
        <Modal onClose={closeEditProfile}>
          <EditUserProfile onClose={closeEditProfile} />
        </Modal>
      )}
      <Center py={3} mb="10">
        <Stack
          maxW={"350px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"2xl"}
          rounded={"xl"}
          p={6}
          textAlign={"center"}
          spacing={5}
        >
          <WrapItem display={"flex"} justifyContent={"center"}>
            <Avatar
              size={"xl"}
              name={user.name}
              _after={{
                content: '""',
                w: 4,
                h: 4,
                bg: "green.300",
                border: "2px solid white",
                rounded: "full",
                pos: "absolute",
                bottom: 0,
                right: 3,
              }}
            />
          </WrapItem>

          <Text fontWeight={600} color={"gray.500"}>
            <EmailIcon /> {user.email}
          </Text>

          <Stack
            direction="column"
            w="60%"
            px="1"
            fontSize="14px"
            textAlign="left"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            <Text fontWeight={"medium"}>
              <Flex alignItems="center">
                <i
                  className="fa-solid fa-user"
                  style={{ marginRight: "9px" }}
                />
                {user.name}
              </Flex>
            </Text>

            <Text>
              <Flex alignItems="center">
                <InfoIcon mr="2" />
                {user.bio}
              </Flex>
            </Text>

            <Text>
              <Flex alignItems="center">
                <PhoneIcon mr="2" />
                {user.phonenumber}
              </Flex>
            </Text>
          </Stack>

          <Flex direction={"column"}>
            <Text fontWeight={"bold"}>Your Tasks</Text>
            <Stack
              fontSize="14px"
              fontWeight={"medium"}
              color={useColorModeValue("gray.600", "gray.400")}
              px={3}
              direction={"row"}
              textAlign={"left"}
              justifyContent={"space-around"}
            >
              <Box>
                <Text>Total Tasks : {tasks.length} </Text>
                <Text>Active Tasks : {activeTasks.length} </Text>
              </Box>
              <Box>
                <Text>Completed Tasks : {completedTasks.length} </Text>
                <Text>Over Due Tasks : {OverDueTasks.length} </Text>
              </Box>
            </Stack>
          </Flex>

          <Stack mt={8} direction={"row"} spacing={4}>
            <Button
              fontSize={"sm"}
              rounded={"full"}
              colorScheme="red"
              boxShadow={"0px 1px 8px -2px rgb(238,221,130)"}
              w="50%"
              onClick={() => history.push("/")}
            >
              Back To Home
            </Button>
            <Button
              w="50%"
              fontSize={"sm"}
              rounded={"full"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              colorScheme="twitter"
              onClick={openEditProfile}
            >
              Edit Profile
            </Button>
          </Stack>
        </Stack>
      </Center>
    </>
  );
};

export default UserProfile;
