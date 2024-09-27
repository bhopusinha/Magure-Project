import { Button } from 'react-bootstrap'


interface NavbarloggedOutProps{
    onSignUpClicked:()=>void,
    onLoginClicked:()=>void
}

const NavbarLoggedOut = ({onSignUpClicked,onLoginClicked}:NavbarloggedOutProps) => {
  return (
    <>
      <Button onClick={onSignUpClicked}>Sign Up</Button>
      <Button onClick={onLoginClicked}>Log In</Button>
    </>
  )
}

export default NavbarLoggedOut
