import { APIWrapper } from "@ralvarezdev/uru-web-2-final-project-api-wrapper";

class ApiService {
    constructor() {
        this.api = new APIWrapper('/api');
        this.isLoading = false;
    }

    // Método para envolver cualquier función asíncrona con la lógica de carga
    async wrapWithLoading(asyncFunction) {
        this.dispatchLoading(true); // Activar el estado de carga
        
        // Retraso artificial antes de la solicitud (2 segundos)
        await new Promise(resolve => setTimeout(resolve, 4000));
        
        try {
            const result = await asyncFunction(); // Ejecutar la función asíncrona
            
            // Retraso artificial después de la solicitud (2 segundos)
            await new Promise(resolve => setTimeout(resolve, 0));
            
            return result;
        } catch (error) {
            console.error('Error en la solicitud:', error);
            
            // Retraso artificial incluso en caso de error
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            throw error; // Propagar el error
        } finally {
            this.dispatchLoading(false); // Desactivar el estado de carga
        }
    }

    // Disparar evento personalizado para notificar el cambio de estado de carga
    dispatchLoading(isLoading) {
        this.isLoading = isLoading;
        const event = new CustomEvent('globalLoading', {
            detail: { isLoading }
        });
        document.dispatchEvent(event);
    }

    // Métodos de la API envueltos con wrapWithLoading
    async getAllProfiles() {
        return this.wrapWithLoading(async () => {
            const response = await this.api.Execute(['Security'], 'Profile', 'GetAllProfiles');
            const data = await response.json();
            console.log(data);
            
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
            console.log(response,"p");
            
            const data = await response.json();
            console.log(data);
            
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
            console.log(data,"lol");
            
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

    async createTopic(categoryData) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.CreateTopic(categoryData.name, categoryData.description);
            const data = await response.json();
            return data;
        });
    }

    async removeTopic(topicID) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.RemoveTopic(topicID);
            const data = await response.json();
            return data;
        });
    }

    async updateTopic(topicID, categoryData) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.UpdateTopic(topicID, categoryData.name, categoryData.description);
            const data = await response.json();
            return data;
        });
    }

    async getAllTopics() {
        return this.wrapWithLoading(async () => {
            const response = await this.api.GetAllTopics();
            const data = await response.json();
            return data;
        });
    }
    
    async searchTopicByName(name) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.SearchTopicByName(name);
            const data = await response.json();
            return data;
        });
    }

    async getAllPublishers(){
        return this.wrapWithLoading(async () => {
            const response = await this.api.GetAllPublishers();
            const data = await response.json();
            return data;
        });
    }

    async createPublisher(publisherData) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.CreatePublisher(publisherData.name, publisherData.description);
            const data = await response.json();
            return data;
        });
    }

    async removePublisher(publisherID) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.RemovePublisher(publisherID);
            const data = await response.json();
            return data;
        });
    }

    async updatePublisher(publisherID, publisherData) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.UpdatePublisher(publisherID, publisherData.name, publisherData.description);
            const data = await response.json();
            return data;
        });
    }

    async searchPublisherByName(name) {
        return this.wrapWithLoading(async () => {
            const response = await this.api.SearchPublisherByName(name);
            const data = await response.json();
            return data;
        });
    }
}

export const apiService = new ApiService();