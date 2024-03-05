/*import { createContext, useState } from "react";
export const User = createContext({});

export function userprovider({childern}){
  const [userinfo, setuserinfo] = useState({});

   return(
     <>
       <User.Provider value={{userinfo,setuserinfo}}>
       {childern}
       </User.Provider>
     </>
   )
}*/

import { atom } from "recoil";

export const userinfo = atom({
  key: "userinfo",
  default: null,
});