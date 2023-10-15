import { useCookie } from './useCookie';

export const useToken = () => {
    const {setCookie, removeCookie} = useCookie();

    const addToken = (tokens) => {
        const {token, refresh} = tokens;
        setCookie("token", token);
        setCookie("refresh", refresh);
    }

    const removeToken = () => {
        removeCookie("token");
        removeCookie("refresh");
    }

    return {addToken, removeToken};
}