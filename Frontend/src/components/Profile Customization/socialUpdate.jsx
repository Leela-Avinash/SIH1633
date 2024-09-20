import { useSelector } from "react-redux";
const socialUpdate = ({handleSocialChange,prevStep,handleSubmit}) => {
    const { credentials } = useSelector(
        (state) => state.auth
      );
    return (
        <div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Social Links</h2>
                {/* LinkedIn */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="linkedin">
                        LinkedIn URL
                    </label>
                    <input
                        type="url"
                        id="linkedinProfile"
                        name="linkedinProfile"
                        value={credentials.Social.linkedinProfile}
                        onChange={handleSocialChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="Enter your LinkedIn profile URL"
                    />
                </div>

                {/* GitHub */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="github">
                        GitHub URL
                    </label>
                    <input
                        type="url"
                        id="githubProfile"
                        name="githubProfile"
                        value={credentials.Social.githubProfile}
                        onChange={handleSocialChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="Enter your GitHub profile URL"
                    />
                </div>

                {/* Website */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="website">
                        Website URL
                    </label>
                    <input
                        type="url"
                        id="websiteURL"
                        name="websiteURL"
                        value={credentials.Social.websiteURL}
                        onChange={handleSocialChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="Enter your personal website URL"
                    />
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-700"
                >
                    Previous
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}
export default socialUpdate;