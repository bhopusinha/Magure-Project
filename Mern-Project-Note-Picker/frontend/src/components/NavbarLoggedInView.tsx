import { User } from '../types/user'
import { LogoutUser } from '../hooks/api/user'
import { Button, Navbar } from 'react-bootstrap'

interface NavbarLoggedInProps{
    user:User,
    onLogoutSuccessful :()=>void
}

const NavbarLoggedInView = ({onLogoutSuccessful,user}:NavbarLoggedInProps) => {


    async function userLogout(){
            await LogoutUser();
            onLogoutSuccessful()
       
    }

  return (
    <>
      <Navbar.Text className='me-2' >
        Signed in as: {user.username}
      </Navbar.Text>
      <Button onClick={userLogout} >Log Out</Button>
    </>
  )
}

export default NavbarLoggedInView
