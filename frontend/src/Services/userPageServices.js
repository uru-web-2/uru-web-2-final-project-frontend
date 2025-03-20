import { APIWrapper } from "@ralvarezdev/uru-web-2-final-project-api-wrapper";

const api = new APIWrapper('/api');

export const createUsers = async (newUser) => {
    console.log(newUser.first_name,"service");
    const response = await api.CreateUser(newUser.first_name,
        newUser.last_name,
        newUser.username,
        newUser.password,
        newUser.email,
        newUser.document_number,
        newUser.document_type,
        newUser.document_country);
    const data = await response.json();
    console.log(data,'user3');
    return data;
}

export const getAllUsers = async () => {
    const response = await api.GetAllUsers();
    const data = await response.json();
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

export const revokeuserProfile = async (username, profileID) => {
    const response = await api.RevokeUserProfile(username, profileID);
    const data = await response.json();
    return data;
}

export const assignuserProfile = async (username, profileID) => {
    const response = await api.AssignUserProfile(username, profileID);
    const data = await response.json();
    return data;
}

