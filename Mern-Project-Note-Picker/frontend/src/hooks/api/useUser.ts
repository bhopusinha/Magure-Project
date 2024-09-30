import { useHttpMethodContext } from "../../context/HttpProvider";
import { ApiResponseData } from "../../types/api";
import { userLogin, userRegister } from "../../types/user";


const useUser=()=>{

  const {post}=useHttpMethodContext();

  const getLoggedInUser=async (showLoader=true):Promise<ApiResponseData>=>{
     
    const response = await post(`/api/user/`,{},showLoader)

    return response;

  }
  
  const SignUpcredential=async ( input: userRegister):Promise<ApiResponseData>=>{

    const response = await post(`/api/user/signup`, input,true);

    return response;

  }


  const loginUser = async (input: userLogin,showLoader=true):Promise<ApiResponseData>=>{
    
    const response = await post(`/api/user/login`, input,showLoader);

    return response

  }

  const LogoutUser = async (showLoader=true):Promise<ApiResponseData>=>{
    const response=await post(`/api/user/logout`,{},showLoader);

    return response
  }

  return {
    getLoggedInUser,
    SignUpcredential,
    loginUser,
    LogoutUser
  }

}

export default useUser;