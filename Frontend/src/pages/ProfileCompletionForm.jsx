import React, { useState } from "react";
import { skills, fields, jobs } from "../../../Backend/db/sample";
import { useSelector, useDispatch } from "react-redux";
import { updateCredentials } from "../redux/slices/authSlice";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const ProfileCompletionForm = () => {
    const [step, setStep] = useState(1); // Step tracker
    const dispatch = useDispatch();
    const { credentials } = useSelector((state) => state.auth);

    // Form data
    const [formData, setFormData] = useState({
        profileImage: null,
        skills: [],
        interests: [],
        fieldOfStudy: "",
        location: {},
        contactPhone: "",
        linkedIn: "",
        experiences: [
            {
                jobTitle: "",
                companyName: "",
                location: "",
                startDate: "",
                endDate: "",
            },
        ],
    });
    const [skillsList, setSkillsList] = useState([]);

    const handleExperienceChange = (index, event) => {
        const { name, value } = event.target;
        const updatedExperiences = formData.experiences.map((experience, i) =>
            i === index ? { ...experience, [name]: value } : experience
        );
        setFormData((prevFormData) => ({
            ...prevFormData,
            experiences: updatedExperiences,
        }));
    };

    const addExperience = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            experiences: [
                ...prevFormData.experiences,
                {
                    jobTitle: "",
                    companyName: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                },
            ],
        }));
    };

    const removeExperience = (index) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            experiences: prevFormData.experiences.filter((_, i) => i !== index),
        }));
    };

    const handleChange = (e) => {
        console.log(e);
        dispatch(
            updateCredentials({ name: e.target.name, value: e.target.value })
        );
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // console.log(e);
        // setFormData((prevFormData) => ({
        //   ...prevFormData,
        //   [e.target.name]: e.target.value,
        // }));
    };
    // const handleDropdownChange = (selectedOptions) => {
    //   const selectedFields = selectedOptions.map(option => option.label);
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     fieldOfStudy: selectedFields,
    //   }));
    // };

    const handleDropdownChange = (selectedOptions) => {
        console.log(selectedOptions);
        let temp = [];
        for (let i = 0; i < selectedOptions.length; i++) {
            temp.push(selectedOptions[i].value);
        }
        dispatch(
            updateCredentials({ name: selectedOptions[0].id, value: temp })
        );
        console.log(credentials);
        // if(selectedOptions[0].id === "skills"){
        //   setFormData((prevFormData) => ({
        //     ...prevFormData,
        //     skills: selectedOptions,
        //   }));
        // }else if(selectedOptions[0].id === "interest"){
        //   setFormData((prevFormData) => ({
        //     ...prevFormData,
        //     interests: selectedOptions,
        //   }));
        // }
    };
    // const handleInterestsChange = (selectedOptions) => {
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     interests: selectedOptions,
    //   }));
    // };

    const handleImageChange = (e) => {
        setFormData({ ...formData, profileImage: e.target.files[0] });
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log(formData);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
                Complete Your Profile
            </h1>

            <form className="bg-white shadow-md rounded-lg p-8 w-full md:w-1/2 lg:w-1/3">
                {/* Step 1: Personal Information */}
                {step === 1 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Personal Information
                        </h2>

                        {/* Full Name */}
                        {/* <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your full name"
              />
            </div> */}

                        {/* Profile Image */}
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="profileImage"
                            >
                                Upload Profile Image
                            </label>
                            <input
                                type="file"
                                id="profileImage"
                                name="profileImage"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={nextStep}
                            className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700"
                        >
                            Next
                        </button>
                    </div>
                )}

                {/* Step 2: Skills and Interests */}
                {step === 2 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Skills and Interests
                        </h2>

                        {/* Skills */}
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="skills"
                            >
                                Skills
                            </label>
                            <CreatableSelect
                                id="skills"
                                name="skills"
                                value={credentials.skills.map((skill) => ({
                                    value: skill,
                                    label: skill,
                                    id: "skills",
                                }))} // Convert skills array to Select options
                                onChange={handleDropdownChange}
                                options={skills().map((skill) => ({
                                    value: skill,
                                    label: skill,
                                    id: "skills",
                                }))} // Convert skills array to Select options
                                isMulti
                                className="w-full"
                                classNamePrefix="select"
                                placeholder="Select your skills"
                            />
                        </div>

                        {/* Interests */}
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="interests"
                            >
                                Interests
                            </label>
                            <CreatableSelect
                                id="interest"
                                name="interest"
                                value={credentials.interests.map(
                                    (interest) => ({
                                        value: interest,
                                        label: interest,
                                        id: "interests",
                                    })
                                )} // Convert skills array to Select options
                                onChange={handleDropdownChange}
                                options={skills().map((interest) => ({
                                    value: interest,
                                    label: interest,
                                    id: "interests",
                                }))} // Convert skills array to Select options
                                isMulti
                                className="w-full"
                                classNamePrefix="select"
                                placeholder="Select your Interests"
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="bg-gray-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-600"
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={nextStep}
                                className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Academic and Professional Details */}
                {step === 3 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Academic and Professional Details
                        </h2>

                        {/* Field of Study */}
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="fieldOfStudy"
                            >
                                Field of Study
                            </label>
                            <select
                                id="fieldOfStudy"
                                name="fieldOfStudy"
                                value={credentials.fieldOfStudy}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            >
                                <option value="">Select your skills</option>
                                {fields().map((skill, index) => (
                                    <option key={index} value={skill}>
                                        {skill}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Experience */}

                        <div>
                            <h2 className="text-xl font-semibold mb-4">
                                Experience Details
                            </h2>
                            {formData.experiences.map((experience, index) => (
                                <div
                                    key={index}
                                    className="mb-4 border p-4 rounded-lg"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-medium">
                                            Experience {index + 1}
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeExperience(index)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    {/* Job Title */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Job Title
                                        </label>
                                        {/* <input
                      type="text"
                      name="jobTitle"
                      value={experience.jobTitle}
                      onChange={(event) => handleExperienceChange(index, event)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your Job Title"
                    /> */}
                                        <select
                                            id="JobTitle"
                                            name="JobTitle"
                                            value={
                                                credentials.experiences[
                                                    credentials.experiences
                                                        .length
                                                ].JobTitle
                                            }
                                            onChange={(event) =>
                                                handleExperienceChange(
                                                    index,
                                                    event
                                                )
                                            }
                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                        >
                                            <option value="">
                                                Select your skills
                                            </option>
                                            {jobs().map((skill, index) => (
                                                <option
                                                    key={index}
                                                    value={skill}
                                                >
                                                    {skill}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Company Name */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={experience.companyName}
                                            onChange={(event) =>
                                                handleExperienceChange(
                                                    index,
                                                    event
                                                )
                                            }
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter Company Name"
                                        />
                                    </div>

                                    {/* Location */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={experience.location}
                                            onChange={(event) =>
                                                handleExperienceChange(
                                                    index,
                                                    event
                                                )
                                            }
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter Job Location"
                                        />
                                    </div>

                                    {/* Start Date */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={experience.startDate}
                                            onChange={(event) =>
                                                handleExperienceChange(
                                                    index,
                                                    event
                                                )
                                            }
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* End Date */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={experience.endDate}
                                            onChange={(event) =>
                                                handleExperienceChange(
                                                    index,
                                                    event
                                                )
                                            }
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addExperience}
                                className="w-full bg-green-600 text-white font-medium py-3 rounded-lg hover:bg-green-700"
                            >
                                Add Experience
                            </button>
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="bg-gray-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-600"
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={nextStep}
                                className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Contact Information */}
                {step === 4 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Contact Information
                        </h2>

                        {/* Location */}
                        <h2 className="text-xl font-semibold mb-4">
                            Location Details
                        </h2>

                        {/* City */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your City"
                            />
                        </div>

                        {/* State/Province */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                State/Province
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your State/Province"
                            />
                        </div>

                        {/* Postal Code/ZIP Code */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Postal Code/ZIP Code
                            </label>
                            <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your Postal Code/ZIP Code"
                            />
                        </div>

                        {/* Country */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Country
                            </label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your Country"
                            />
                        </div>

                        {/* Contact Email */}
                        {/* <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="contactEmail">
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
              />
            </div> */}

                        {/* Contact Phone */}
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="contactPhone"
                            >
                                Contact Phone
                            </label>
                            <input
                                type="tel"
                                id="contactPhone"
                                name="contactPhone"
                                value={formData.contactPhone}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        {/* LinkedIn */}
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="linkedIn"
                            >
                                LinkedIn Profile
                            </label>
                            <input
                                type="url"
                                id="linkedIn"
                                name="linkedIn"
                                value={formData.linkedIn}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="Enter your LinkedIn profile URL"
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="bg-gray-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-600"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ProfileCompletionForm;
