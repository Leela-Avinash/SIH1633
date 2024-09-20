import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateCredentials } from '../redux/slices/authSlice';
import ProfileUpdate from '../components/Profile Customization/profileUpdate.jsx';
import CareerUpdate from '../components/Profile Customization/careerUpdate.jsx';
import ProfessionalUpdate from '../components/Profile Customization/professionalUpdate.jsx';
import LocationUpdate from '../components/Profile Customization/locationUpdate.jsx';
import SocialUpdate from '../components/Profile Customization/socialUpdate.jsx';

const ProfileCompletionForm = () => {

  const [step, setStep] = useState(1); // Step tracker
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { credentials } = useSelector(
    (state) => state.auth
  );
  const [profileImage, setProfileImage] = useState(null);
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleExperienceChange = (index, event) => {
    const { name, value } = event.target;
    dispatch(updateCredentials({
      name: "experiences", value: credentials.experiences.map((experience, i) =>
        i === index ? { ...experience, [name]: value } : experience
      )
    }))
  };

  const addExperience = () => {

    dispatch(updateCredentials({ name: "experiences", value: [...credentials.experiences, { JobTitle: '', CompanyName: '', Location: '', StartDate: '', EndDate: '' }] }))
  };

  const removeExperience = (index) => {
    dispatch(updateCredentials({ name: "experiences", value: credentials.experiences.filter((_, i) => i !== index) }))
  };

  const handleChange = (e) => {
    dispatch(updateCredentials({ name: e.target.name, value: e.target.value }));

  };
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    const updatedLocation = {
      ...credentials.location,
      [name]: value,
    };
    dispatch(updateCredentials({ name: 'location', value: updatedLocation }));
  };
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    const updatedSocial = {
      ...credentials.Social,
      [name]: value,
    };
    dispatch(updateCredentials({ name: 'Social', value: updatedSocial }));
  };


  const handleDropdownChange = (selectedOptions) => {
    let temp = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      temp.push(selectedOptions[i].value);
    }
    dispatch(updateCredentials({ name: selectedOptions[0].id, value: temp }));

  };
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(credentials);
    const formData = new FormData();
    formData.append('bio', credentials.bio);
    formData.append('skills', credentials.skills);
    formData.append('interests', credentials.interests);
    
    formData.append('fieldOfStudy', credentials.fieldOfStudy);
    formData.append('location', credentials.location);
    formData.append('experiences', credentials.experiences);
    formData.append('Social', credentials.Social);


    // Append skills, interests, and experiences arrays if they exist
    // if (inputs.skills) {
    //   inputs.skills.forEach(skill => formData.append('skills[]', skill));
    // }

    // if (inputs.interests) {
    //   inputs.interests.forEach(interest => formData.append('interests[]', interest));
    // }

    // inputs.experiences.forEach((exp, index) => {
    //   formData.append(experiences[${ index }][JobTitle], exp.JobTitle);
    //   formData.append(experiences[${ index }][CompanyName], exp.CompanyName);
    //   formData.append(experiences[${ index }][Location], exp.Location);
    //   formData.append(experiences[${ index }][StartDate], exp.StartDate);
    //   formData.append(experiences[${ index }][EndDate], exp.EndDate);
    // });

    // Append location object fields if they exist
    // if (inputs.location) {
    //   formData.append('location[City]', inputs.location.City);
    //   formData.append('location[State]', inputs.location.State);
    //   formData.append('location[Code]', inputs.location.Code);
    //   formData.append('location[Country]', inputs.location.Country);
    //   formData.append('location[Phone]', inputs.location.Phone);
    // }

    // formData.append('contactPhone', inputs.contactPhone);
    // formData.append('linkedIn', inputs.linkedIn);

    // Append profile picture if it's a file
    if (profileImage instanceof File) {
      formData.append('profilepic', profileImage);
    }

    const response = await fetch(`http:localhost:5000/api/users/update/${ user.id }`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Complete Your Profile</h1>
      <form className="bg-white shadow-md rounded-lg p-8 w-full md:w-1/2 lg:w-1/3">
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <ProfileUpdate
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            nextStep={nextStep}
          />
        )}

        {/* Step 2: Skills and Interests */}
        {step === 2 && (
          <CareerUpdate
            handleDropdownChange={handleDropdownChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />

        )}

        {/* Step 3: Academic and Professional Details */}
        {step === 3 && (
          <ProfessionalUpdate
            handleExperienceChange={handleExperienceChange}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
            addExperience={addExperience}
            removeExperience={removeExperience}
          />

        )}

        {/* Step 4: Contact Information */}
        {step === 4 && (
          <LocationUpdate
            handleLocationChange={handleLocationChange}
            prevStep={prevStep}
            nextStep={nextStep} />

        )}
        {step === 5 && (
          <SocialUpdate
            handleSocialChange={handleSocialChange}
            prevStep={prevStep}
            handleSubmit={handleSubmit} />
        )}
      </form>
    </div>
  );
};

export default ProfileCompletionForm;
