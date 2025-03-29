import { APIWrapper } from "@ralvarezdev/uru-web-2-final-project-api-wrapper";

class ApiService {
    constructor() {
        this.api = new APIWrapper('/api');
        this.isLoading = false;
    }

    // Método para envolver cualquier función asíncrona con la lógica de carga
    async wrapWithLoading(asyncFunction) {
        this.setLoading(true); // Activar el estado de carga
        try {
            const result = await asyncFunction(); // Ejecutar la función asíncrona
            return result;
        } catch (error) {
            console.log('ErrorACA:');    
            
            console.error('ErrorACA ES:', error);
            throw error; // Propagar el error
        } finally {
            this.setLoading(false); // Desactivar el estado de carga
        }
    }

    // Método para cambiar el estado de carga
    setLoading(isLoading) {
        this.isLoading = isLoading;
        if (this.isLoading) {
            console.log('Cargando...');
            // Aquí podrías mostrar un spinner o mensaje de carga
        } else {
            console.log('Carga completada');
            // Aquí podrías ocultar el spinner o mensaje de carga
        }
    }

    // Métodos de la API envueltos con wrapWithLoading
    async getAllProfiles() {
        return this.wrapWithLoading(async () => {
            const response = await this.api.Execute(['Security'], 'Profile', 'GetAllProfiles');
            const data = await response.json();
            return data.data.sort((a, b) => a.profile_id - b.profile_id);
        });
    }

    async getModModules() {
        return this.wrapWithLoading(async () => {
            const response = await this.api.GetModules();
            const data = await response.json();
            return data.data.modules;
        });
    }

    async getObjectsByModuleID(moduleID) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.GetObjectsByModuleID(moduleID);
            const data = await response.json();
            return data.data.objects;
        });
    }

    async getMethodsByObjectID(objectID) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.GetMethodsByObjectID(objectID);
            const data = await response.json();
            return data.data.methods;
        });
    }

    async getMethodsByProfileIDObjectID(profileID, objectID) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.GetMethodsByProfileIDObjectID(profileID, objectID);
            const data = await response.json();
            return data.data.methods;
        });
    }

    async setProfilePermissions(profileID, assignMethodIDs, revokeMethodIDs) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.SetProfilePermissions(profileID, assignMethodIDs, revokeMethodIDs);
            const data = await response.json();
            return data;
        });
    }

    async assignProfilePermissions(methodID, profileID) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.AssignProfilePermission(methodID, profileID);
            const data = await response.json();
            return data;
        });
    }

    async revokeProfilePermissions(methodID, profileID) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.RevokeProfilePermission(methodID, profileID);
            const data = await response.json();
            return data;
        });
    }

    async createUsers(newUser) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.CreateUser(
                newUser.first_name,
                newUser.last_name,
                newUser.username,
                newUser.password,
                newUser.email,
                newUser.document_number,
                newUser.document_type,
                newUser.document_country
            );
            const data = await response.json();
            return data;
        });
    }

    async getAllUsers() {
        return this.wrapWithLoading(async () => {
            const response = await this.api.GetAllUsers();
            const data = await response.json();
            return data;
        });
    }

    async getProfileByName(userName) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.SearchProfileByName(userName);
            const data = await response.json();
            return data;
        });
    }

    async getUserDetailsByUserID(userID) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.GetUserDetailsByUserID(userID);
            const data = await response.json();
            return data;
        });
    }

    async revokeUserProfile(username, profileID) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.RevokeUserProfile(username, profileID);
            const data = await response.json();
            return data;
        });
    }

    async assignUserProfile(username, profileID) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.AssignUserProfile(username, profileID);
            const data = await response.json();
            return data;
        });
    }

    async searchUser(username) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.SearchUserByUsername(username, 10);
            const data = await response.json();
            return data.data;
        });
    }
}

export const apiService = new ApiService();