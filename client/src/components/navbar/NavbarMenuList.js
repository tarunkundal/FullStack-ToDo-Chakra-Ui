import {
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../../logout/Logout";

const NavbarMenuList = () => {
  const [isLogout, setIsLogout] = useState(false);

  const onOpenLogoutHandler = () => {
    setIsLogout(true);
  };
  const onCloseLogoutHandler = () => {
    setIsLogout(false);
  };

  return (
    <>
      {isLogout && <Logout onClose={onCloseLogoutHandler} />}
      <MenuList
        bg={useColorModeValue("white", "gray.900")}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <MenuItem color="blue.400">
          <Link to="/user/profile">
            <i className="fa-solid fa-user" />
            <Text as="span" ml="2">
              Profile
            </Text>
          </Link>
        </MenuItem>

        <MenuItem color="teal">
          <Link to="/tasks">
            <i className="fa-solid fa-list-check" />
            <Text as="span" ml="2">
              Tasks
            </Text>
          </Link>
        </MenuItem>

        <MenuDivider />

        <MenuItem color="red" onClick={onOpenLogoutHandler}>
          <i className="fa-solid fa-right-to-bracket red" />
          <Text as="span" ml="2">
            Sign Out
          </Text>
        </MenuItem>
      </MenuList>
    </>
  );
};

export default NavbarMenuList;
