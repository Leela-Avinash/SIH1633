import { useSelector } from "react-redux";
const profileUpdate = ({handleImageChange,handleChange,nextStep}) => {
  const { credentials } = useSelector(
    (state) => state.auth
  );
  const defaultProfilePic = "https://via.placeholder.com/150";
  return (
    
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h2>
      {/* Profile Image */}
      {/* <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="profilepic">
          Upload Profile Image
        </label>
        <input
          type="file"
          id="profilepic"
          name="profilepic"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div> */}
      <div className="mb-4 text-center">
          <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
          </label>

          <div className="flex justify-center mb-4">
              <img
                  src={
                      credentials.profilepic instanceof File
                          ? URL.createObjectURL(credentials.profilepic)
                          : credentials.profilepic || defaultProfilePic
                  }
                  alt="Profile Preview"
                  className="h-24 w-24 rounded-full object-cover"
              />
          </div>

          <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md"
          />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="bio">
          Bio/About
        </label>
        <textarea
          id="bio"
          name="bio"
          value={credentials.bio}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Tell us about yourself"
          rows="4"
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
  );
};
export default profileUpdate;