import React, { useState, useEffect } from 'react';
import ModalWrapper from './ModalWrapper';
import '../components/CSS/UserModal.css';
import { FaTimes } from 'react-icons/fa';
import { apiService } from '../Services/Services';

const UserDetailsModal = ({ isOpen, onClose, user, userDetails }) => {
  const [localProfiles, setLocalProfiles] = useState(userDetails?.out_user_profile_ids || []);

  useEffect(() => {
    console.log('userDetails', user);
    
    if (userDetails?.user_profile_ids) {
      setLocalProfiles(userDetails.user_profile_ids);
    }
  }, [userDetails, user]);

  const handleDeleteProfile = async (profileId) => {
    try {
      const response = await apiService.removeUserProfile(user.username, profileId);

      if (response.status === 'success' || response.status === 200) {
        console.log('Profile correctly eliminated:', profileId);

        const updatedProfiles = localProfiles.filter((id) => id !== profileId);
        setLocalProfiles(updatedProfiles); 

        alert('Profile properly removed');
      } else {
        console.error('Error eliminating the profile:', response.data);
        alert('Error eliminating the profile');
      }
    } catch (error) {
      console.error('Error eliminating the profile:', error);
      alert('Error eliminating the profile');
    }
  };

  const handleCreateUserProfile = async (event) => {
    const profileId = event.target.value; 
    if (!profileId) return; 

    try {
      const response = await apiService.createUserProfile(user.username, profileId);

      if (response.status === 'success' || response.status === 200) {
        console.log('Profile assigned correctly:', profileId);

        setLocalProfiles([...localProfiles, parseInt(profileId, 10)]); 

        alert('Profile assigned correctly');
      } else {
        console.error('Error al asignar el perfil:', response.data);
        alert('Error when assigning the profile');
      }
    } catch (error) {
      console.error('Error when assigning the profile:', error);
      alert('Error when assigning the profile');
    }
  };

  const profiles = {
    1: 'student',
    2: 'teacher',
    3: 'librarian',
    4: 'admin',
    5: 'superadmin',
    6: 'developer',
  };

  const availableProfiles = Object.keys(profiles)
    .map((id) => parseInt(id, 10)) 
    .filter((id) => !localProfiles.includes(id)); 

  return (
    <ModalWrapper
      isOpen={isOpen}
      title="User Details"
      onClose={onClose}
    >
      <div className="user-details-container">
         {/*First block of details (name, surname, email, username) */}        
         <div className="user-details-column">
          <p><strong>Name:</strong> {userDetails?.user_first_name}</p>
          <p><strong>Last Name:</strong> {userDetails?.user_last_name}</p>
          <p><strong>Email:</strong> {userDetails?.user_email}</p>
          <p><strong>Username:</strong> {userDetails?.user_username}</p>
        </div>

         {/*Second block of details (country, document type, document number) */}        
         <div className="user-details-column">
          <p><strong>Country:</strong> {userDetails?.user_document_country}</p>
          <p><strong>Document Type:</strong> {userDetails?.user_document_type}</p>
          <p><strong>Document Number:</strong> {userDetails?.user_document_number}</p>
        </div>
      </div>

        {/*Profile block */}      
      <div className="profiles-container">
        <div className='profiles-header'>
          <h3>Profiles</h3>
          <select onChange={handleCreateUserProfile} defaultValue="">
            <option value="" disabled>Select Profile</option>
            {availableProfiles.map((profileId) => (
              <option key={profileId} value={profileId}>
                {profiles[profileId]}
              </option>
            ))}
          </select>
        </div>

        <div className="profiles-list">
          {localProfiles.map((profileId, index) => {
            const profileName = profiles[profileId] || `Perfil desconocido (ID: ${profileId})`;
            console.log(profileName, 'profileName');

            return (
              <div key={index} className="profile-item">
                {profileName}
                <FaTimes
                  className="delete-icon"
                  onClick={() => handleDeleteProfile(profileId)} 
                />
              </div>
            );
          })}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default UserDetailsModal;