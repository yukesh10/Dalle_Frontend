import {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocalStorage } from './useLocalStorage';
import { User } from '../models/User';

export const useUser = () => {
    const {user, setUser} = useContext(AuthContext);
    const {setItem, removeItem} = useLocalStorage();

    const addUser = (user) => {
        setUser(user);
        setItem("user", JSON.stringify(user));
    }

    const removeUser = () => {
        setUser(User);
        removeItem("user");
    }

    return {user, addUser, removeUser};
}