import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  WrapItem,
  Select,
  Text,
  Textarea,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useStore } from "../../store/authStore/AuthContextProvider";
import { useState } from "react";
import axios from "axios";

const EditUserProfile = (props) => {
  const { user, updateUser } = useStore();
  const [enteredUserName, setEnteredUserName] = useState(user.name);
  const [enteredBio, setEnteredBio] = useState(user.bio || "");
  const [enteredPhonenumber, setEnteredPhonenumber] = useState(
    user.phonenumber || ""
  );
  const [selectedGender, setSelectedGender] = useState(user.gender || "");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // name, bio, phonenumber, gender, updated_at, email

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const profileUpdatedData = {
        name: enteredUserName,
        bio: enteredBio,
        phonenumber: enteredPhonenumber,
        gender: selectedGender,
        updated_at: new Date().toDateString(),
        email: user.email,
      };

      setIsLoading(true);
      updateUser(profileUpdatedData);

      const res = await axios.put(
        "/api/users/profile/update",
        profileUpdatedData
      );
      setIsLoading(false);

      if (res.status === 202) {
        props.onClose();
        toast({
          description: res.data,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          description: res.data,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      spacing={{ base: "1.5", sm: "2" }}
      maxW={"md"}
      bg={useColorModeValue("white", "gray.700")}
      rounded={"xl"}
      boxShadow={"lg"}
      p={4}
      margin={"auto"}
    >
      <Stack direction={["column", "row"]} spacing={2}>
        <Center>
          <WrapItem>
            <Avatar size={{ base: "sm", md: "lg" }} name={user.name} />
          </WrapItem>
        </Center>
        <Center>
          <Text fontWeight="medium">{user.email}</Text>
        </Center>
      </Stack>

      <form onSubmit={updateProfileHandler}>
        <FormControl id="userName">
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={enteredUserName}
            onChange={(e) => setEnteredUserName(e.target.value)}
          />
        </FormControl>

        <FormControl id="text">
          <FormLabel>Bio</FormLabel>
          <Textarea
            placeholder="Your Bio... (max-150) "
            _placeholder={{ color: "gray.500" }}
            type="textarea"
            maxLength="150"
            value={enteredBio}
            onChange={(e) => setEnteredBio(e.target.value)}
          />
        </FormControl>

        <Stack direction="row">
          <FormControl id="phone_number">
            <FormLabel>Phone Number</FormLabel>
            <Input
              placeholder="Phone Number"
              _placeholder={{ color: "gray.500" }}
              type="number"
              value={enteredPhonenumber}
              onChange={(e) => setEnteredPhonenumber(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel> Select Gender</FormLabel>

            <Select
              _placeholder={{ color: "gray.500" }}
              onChange={(e) =>
                setSelectedGender(e.target.options[e.target.selectedIndex].text)
              }
            >
              <option value="option1">Male</option>
              <option value="option2">Female</option>
              <option value="option3">Custom</option>
            </Select>
          </FormControl>
        </Stack>

        <Stack
          mt="3"
          spacing={{ base: "3", sm: 6 }}
          direction={["column", "row"]}
        >
          <Button w={{ sm: "50%" }} colorScheme="red" onClick={props.onClose}>
            Cancel
          </Button>
          <Button w={{ sm: "50%" }} type="submit" colorScheme="twitter">
            {isLoading ? <Spinner /> : "Update"}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default EditUserProfile;
