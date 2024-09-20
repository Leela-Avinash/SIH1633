
import { useSelector } from "react-redux";
import { skills } from "../../../../Backend/db/sample";
import CreatableSelect from 'react-select/creatable';
const careerUpdate=({handleDropdownChange,prevStep,nextStep})=>{
  const { credentials } = useSelector(
    (state) => state.auth
  );
    return(
        <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Skills and Interests</h2>

            {/* Skills */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="skills">
                Skills
              </label>
              <CreatableSelect
                id="skills"
                name="skills"
                value={credentials.skills.map((skill) => ({ value: skill, label: skill, id: "skills" }))} // Convert skills array to Select options
                onChange={handleDropdownChange}
                options={skills().map((skill) => ({ value: skill, label: skill, id: "skills" }))} // Convert skills array to Select options
                isMulti
                className="w-full"
                classNamePrefix="select"
                placeholder="Select your skills"
              />
            </div>

            {/* Interests */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="interests">
                Interests
              </label>
              <CreatableSelect
                id="interest"
                name="interest"
                value={credentials.interests.map((interest) => ({ value: interest, label: interest, id: "interests" }))} // Convert skills array to Select options
                onChange={handleDropdownChange}
                options={skills().map((interest) => ({ value: interest, label: interest, id: "interests" }))} // Convert skills array to Select options
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
    )
}

export default careerUpdate;