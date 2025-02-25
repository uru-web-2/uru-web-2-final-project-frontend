export const loginService = async (username, password, profile = 'null') => {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, profile }),
    });
    
    const data = await response.json();
    
    // Manejar el caso específico del error de múltiples perfiles
    if (data.status === 'fail' && data.data?.profile) {
        const profileString = data.data.profile[0];
        const profiles = profileString.match(/between: (.*)/)[1].split(',').map(profile => profile.trim());
        
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