import { apiService } from "./Services";


export const loginService = async (username, password, profile = 'null') => {
    
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, profile }),
    });
    
    const data = await response.json();
    console.log(data);
    
    // Manejar el caso específico del error de múltiples perfiles
    if (data.status === 'fail' && data.data?.profile) {
        const profileString = data.data.profile[0];
        const profiles = profileString.match(/between: (.*)/)[1].split(',').map(profile => profile.trim());
        console.log(profiles, "dorito5");
        
        if (profiles.length === 1) {
            sessionStorage.setItem("selectedRoles", JSON.stringify(profiles));
            // Volver a hacer login con el único perfil disponible
            
            return await loginService(username, password, profiles[0]);
        }

        return {
            status: 'multiple_profiles',
            profiles: profiles,
        };
    }

    if (!response.ok) {
        const error = new Error(data);
        error.data = data;      
        throw error.data;
    }

    return data;
};

export const registerService = async (data) => {
    
    try{
        console.log(data.email);
        
        const response = await apiService.signUp(

            data.first_name,
            data.last_name,
            data.username,
            data.password,
            data.email,
            data.document_number,
            data.document_type,
            data.document_country,

        );
        
        if (response.status === 'success' || response.status === 201) {
            console.log('User registered successfully!');
        }
        else{
            console.error('Error registering user:', response);
        }

    }catch(error){
        console.log(error, response);
    }

    return res;
}


export const logoutService = async () => {
    const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
    });
    console.log(1);
    
    const data = await response.json();
    if (!response.ok) {
        const error = new Error(data);
        error.data = data;
        throw error.data;
    }

    return data;
}