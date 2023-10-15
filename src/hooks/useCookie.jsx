import { useState } from "react";
import Cookies from 'js-cookie';

export const useCookie = () => {
    const [value, setValue] = useState(null);

    const setCookie = (key, value) => {
        Cookies.set(key, value);
        setValue(value);
    }

    const getCookie = (key) => {
        const tempValue = Cookies.get(key);
        setValue(tempValue);
        return tempValue;
    }

    const removeCookie = (key) => {
        Cookies.remove(key);
        setValue(null);
    }

    return {value, setCookie, getCookie, removeCookie};
}