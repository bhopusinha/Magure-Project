import { User } from '../types/user'
import useUser from '../hooks/api/useUser'
import { Button, Navbar } from 'react-bootstrap'

interface NavbarLoggedInProps{
    user:User,
    onLogoutSuccessful :()=>void
}

const NavbarLoggedInView = ({onLogoutSuccessful,user}:NavbarLoggedInProps) => {

  const {LogoutUser}=useUser();
   
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
