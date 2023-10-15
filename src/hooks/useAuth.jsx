import { useEffect } from "react";
import {useUser} from './useUser';
import { useLocalStorage } from "./useLocalStorage";
import { useToken } from "./useToken";

export const useAuth = () => {
    const {user, addUser, removeUser} = useUser();
    const {addToken, removeToken} = useToken();
    const {getItem} = useLocalStorage();

    useEffect(() => {
        const tempUser = getItem("user");
        if (tempUser){
            addUser(JSON.parse(tempUser));
        }
    }, []);

    const login = (response) => {
        const {id, email, name, token, refresh} = response;
        addUser({id, email, name});
        addToken({token, refresh});
    }

    const logout = () => {
        removeUser();
        removeToken();
    }

    return {user, login, logout};

}