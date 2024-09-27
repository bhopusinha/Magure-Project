import {
  Container,
  Navbar as Nav,
  NavbarBrand,
  Nav as Nab,
} from "react-bootstrap";
import { User } from "../types/user";
import NavbarLoggedInView from "./NavbarLoggedInView";
import NavbarLoggedOut from "./NavbarLoggedOut";

interface NavbarProps {
  LoggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogOutSuccessful: () => void;
}

const Navbar = ({
  LoggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogOutSuccessful,
}: NavbarProps) => {
  return (
    <Nav bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <NavbarBrand>Cool Notes App</NavbarBrand>
        <Nav.Toggle aria-controls="main-navbar" />
        <Nav.Collapse id="main-navbar">
          <Nab className="ms-auto">
            {LoggedInUser
             ? <NavbarLoggedInView user={LoggedInUser} onLogoutSuccessful={onLogOutSuccessful} /> :
             <NavbarLoggedOut onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
            }
          </Nab>
        </Nav.Collapse>
      </Container>
    </Nav>
  );
};

export default Navbar;
