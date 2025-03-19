import { APIWrapper } from "@ralvarezdev/uru-web-2-final-project-api-wrapper";

const api = new APIWrapper('/api');

export const createUsers = async (firstName, lastName, username, password, email, documentNumber, documentType, documentCountry) => {
    const response = await api.SignUp(firstName, lastName, username, password, email, documentNumber, documentType, documentCountry);
    const data = await response.json();
    console.log(data);
    return data;
    
}

export const getAllUsers = async () => {
    const response = await api.GetAllUsers();
    const data = await response.json();
    console.log(data,'llego');
    
    return data;
}

export const getProfileByName = async (userName) => {
    const response = await api.SearchProfileByName(userName);
    const data = await response.json();
    console.log(data);    
    return data;
}

export const GetUserDetailsByUserID = async (userID) => {
    const response = await api.GetUserDetailsByUserID(userID);
    const data = await response.json();
    return data;
}

