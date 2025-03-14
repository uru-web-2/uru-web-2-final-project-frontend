// API wrapper class that contains all endpoints as simple functions
export class APIWrapper {
    #HOST

    // Sets the host URL of the API
    constructor(host) {
        this.#HOST = host
    }

    async #fetch(relativePath, body) {
        const url = this.#HOST + relativePath; // Construye la URL completa
    
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    // Sign up
    async SignUp(firstName, lastName, username, password, email, documentNumber, documentType, documentCountry) {
        return await this.#fetch('/signup', {
            first_name: firstName,
            last_name: lastName,
            username,
            password,
            email,
            document_number: documentNumber,
            document_type: documentType,
            document_country: documentCountry
        })
    }

    async LogIn(username, password, profile) {

        return await this.#fetch('/login', {
            username,
            password,
            profile
        });
    }

    // Execute a method
    async Execute(modulesNames, objectName, methodName, parameters){
        return await this.#fetch('/execute', {
                modules: modulesNames,
                object: objectName,
                method: methodName,
                parameters
                }
            )
    }

    // Create a profile
    async CreateProfile(name, description){
        return await this.Execute(['Security'], 'Profile', 'CreateProfile', {name,  description})
    }

    // Update a profile
    async UpdateProfile(id, name, description){
        return await this.Execute(['Security'], 'Profile', 'UpdateProfile', {id, name,  description})
    }

    // Delete a profile
    async DeleteProfile(id){
        return await this.Execute(['Security'], 'Profile', 'DeleteProfile', {id})
    }

    // Search profile by name
    async SearchProfileByName(name){
        return await this.Execute(['Security'], 'Profile', 'SearchProfileByName', {name})
    }

    // Get all profiles
    async GetAllProfiles(){
        return await this.Execute(['Security'], 'Profile', 'GetAllProfiles')
    }

    // Assign profile permission
    async AssignProfilePermission(methodID, profileID) {
        return await this.Execute(['Security'], 'Security',
            'AssignProfilePermission', {
            method_id: methodID,
            profile_id: profileID
            })
    }

    // Revoke profile permission
    async RevokeProfilePermission(methodID, profileID) {
        return await this.Execute(['Security'], 'Security',
            'RevokeProfilePermission', {
            method_id: methodID,
            profile_id: profileID
        })
    }

    // Get profile permission methods
    async GetProfilePermissionsMethods(profileID, moduleID, objectID) {
        return await this.Execute(['Security'], 'Security',
            'GetProfilePermissionsMethods', {
            profile_id: profileID,
                module_id:moduleID,
                object_id:objectID
            })
    }

    // Get modules
    async GetModules() {
        return await this.Execute(['Security'], 'Security',
            'GetModules')
    }

    // Get objects by module ID
    async GetObjectsByModuleID(moduleID) {
        return await this.Execute(['Security'], 'Security',
            'GetObjectsByModuleID', {
                module_id:moduleID,
            })
    }

    // Get methods by object ID
    async GetMethodsByObjectID(objectID) {
        return await this.Execute(['Security'], 'Security',
            'GetMethodsByObjectID', {
                object_id:objectID,
            })
    }

    // Assign user profile
    async AssignUserProfile(username, profileID) {
        return await this.Execute(['Security'], 'Security',
            'AssignUserProfile', {
            username,
                profile_id: profileID
            })
    }

    // Revoke user profile
    async RevokeUserProfile(username, profileID) {
        return await this.Execute(['Security'], 'Security',
            'RevokeUserProfile', {
            username,
                profile_id: profileID
            })
    }

    // Search user by username
    async SearchUserByUsername(username) {
        return await this.Execute(['Security'], 'User',
            'SearchUserByUsername', {
            username,
            })
    }

    // Create user
    async CreateUser(firstName, lastName, username, password, email, documentNumber, documentType, documentCountry) {
        return await this.Execute(['Security'], 'User',
            'CreateUser', {
                first_name:firstName,
                last_name:lastName,
                username,
                password,
                email,
                document_number:documentNumber,
                document_type: documentType,
                document_country:documentCountry
            })
    }

    // Get user details by user ID
    async GetUserDetailsByUserID(id) {
        return await this.Execute(['Security'], 'User',
            'GetUserDetailsByUserID', {
            id,
            })
    }
}