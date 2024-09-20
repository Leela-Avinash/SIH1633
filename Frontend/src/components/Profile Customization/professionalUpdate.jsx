import { useSelector } from "react-redux";
import { fields, jobs } from "../../../../Backend/db/sample";
const professionalUpdate = ({handleChange,handleExperienceChange,prevStep,nextStep,addExperience,removeExperience}) => {
  const { credentials } = useSelector(
    (state) => state.auth
  );
    return(
        <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Academic and Professional Details</h2>

            {/* Field of Study */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="fieldOfStudy">
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
              <h2 className="text-xl font-semibold mb-4">Experience Details</h2>
              {credentials.experiences.map((experience, index) => (
                <div key={index} className="mb-4 border p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Experience {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Job Title */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <select
                      id="JobTitle"
                      name="JobTitle"
                      value={credentials.experiences[index].JobTitle}
                      onChange={(event) => handleExperienceChange(index, event)}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select your skills</option>
                      {jobs().map((skill, index) => (
                        <option key={index} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Company Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input
                      type="text"
                      name="CompanyName"
                      value={credentials.experiences[index].CompanyName}
                      onChange={(event) => handleExperienceChange(index, event)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Company Name"
                    />
                  </div>

                  {/* Location */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="Location"
                      value={credentials.experiences[index].Location}
                      onChange={(event) => handleExperienceChange(index, event)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Job Location"
                    />
                  </div>

                  {/* Start Date */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      name="StartDate"
                      value={credentials.experiences[index].StartDate}
                      onChange={(event) => handleExperienceChange(index, event)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* End Date */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      name="EndDate"
                      value={credentials.experiences[index].EndDate}
                      onChange={(event) => handleExperienceChange(index, event)}
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
    )
}
export default professionalUpdate;