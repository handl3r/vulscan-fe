import axios from "axios";

export const getUser = () => {
    const userStr = sessionStorage.getItem('user')
    if (userStr) return JSON.parse(userStr)
    else return null;
}

export const getToken = () => {
    const token = sessionStorage.getItem('token');
    if (token) return token
    else return null
}

export const setTokenAndUser = (token, user) => {
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('user', JSON.stringify(user))
}

export const removeUserAndToken = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
}