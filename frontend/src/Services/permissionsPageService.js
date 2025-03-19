import { APIWrapper } from './APIWrapper';

const api = new APIWrapper('/api');

export const getAllProfiles = async () => {
    try {
        const response = await api.Execute(['Security'], 'Profile', 'GetAllProfiles');
        const data = await response.json();
        
        // Ordena los perfiles por profile_id de menor a mayor
        const sortedProfiles = data.data.sort((a, b) => a.profile_id - b.profile_id);
        
        // Devuelve los perfiles ordenados
        return sortedProfiles;
    } catch (error) {
        console.error('Error al obtener los perfiles:', error);
        throw error; // Propaga el error para manejarlo en el lugar donde se llame a esta función
    }
};

export const getModModules = async () => {
    try {
        const response = await api.GetModules();
        const data = await response.json();
        
        return data.data.modules;
    } catch (error) {
        console.error('Error al obtener los módulos:', error);
        throw error;
    }
}

export const getObjectsByModuleID = async (moduleID) => {
    try {
        const response = await api.GetObjectsByModuleID(moduleID);
        const data = await response.json();
        
        return data.data.objects;
    } catch (error) {
        console.error('Error al obtener los objetos:', error);
        throw error;
    }
}

export const getMethodsByObjectID = async (objectID) => {
    try {
        const response = await api.GetMethodsByObjectID(objectID);
        const data = await response.json();
        console.log(data,'methods');
        
        return data.data.methods;
    } catch (error) {
        console.error('Error al obtener los métodos:', error);
        throw error;
    }
}