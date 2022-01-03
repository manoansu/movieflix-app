
import jwtDecode from 'jwt-decode';
import { getAuthData } from './storage';


export type Role = 'ROLE_VISITOR' | 'ROLE_MEMBER';

export type TokenData = {
    exp: number;
    user_name: string;
    name: string;
    authorities: Role[];
}

 export const getTokenData = () : TokenData | undefined => {
    try{
        console.log('getAuthData access_token == ' + getAuthData().access_token);
        return jwtDecode(getAuthData().access_token);
    }
    catch(error) {
        return undefined;
    }
  }

  // Funçao que verifica se user esta autenicado..
  export const isAuthenticated = () => {
      const tokenData = getTokenData();
      console.log('tokenData == ' + tokenData?.user_name);
      return (tokenData && tokenData.exp * 1000 > Date.now()) ? true : false;
  }

  export const hasAnyRole = (roles: Role[]) : boolean =>{

    if(roles.length === 0){
        return true;
    }

    const tokeData = getTokenData();

    if(tokeData !== undefined){
        return roles.some(role => tokeData.authorities.includes(role));
    }
    return false;
  }

  export const hasEqualId = (bdId: number, urlId: number): boolean =>{

    if (bdId === urlId) {
        console.log(' Match === bdId == ' + bdId + ' UrlId:  ' + urlId);
        return true;
    }else{
        console.log('Not Match &&&& === bdId == ' + bdId + ' UrlId: >>>>> ' + urlId);
        return false;
    }
  }