import { useSelector } from "react-redux";
const locationUpdate = ({handleLocationChange,prevStep,nextStep}) => {
  const { credentials } = useSelector(
    (state) => state.auth
  );
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h2>

            {/* Location */}
            <h2 className="text-xl font-semibold mb-4">Location Details</h2>

            {/* City */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="City"
                value={credentials.location.City}
                onChange={handleLocationChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your City"
              />
            </div>

            {/* State/Province */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
              <input
                type="text"
                name="State"
                value={credentials.location.State}
                onChange={handleLocationChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your State/Province"
              />
            </div>

            {/* Postal Code/ZIP Code */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code/ZIP Code</label>
              <input
                type="text"
                name="Code"
                value={credentials.location.Code}
                onChange={handleLocationChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Postal Code/ZIP Code"
              />
            </div>

            {/* Country */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                name="Country"
                value={credentials.location.Country}
                onChange={handleLocationChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Country"
              />
            </div>

            {/* Contact Phone */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="contactPhone">
                Contact Phone
              </label>
              <input
                type="tel"
                id="Phone"
                name="Phone"
                value={credentials.location.Phone}
                onChange={handleLocationChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your phone number"
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
    );
}
export default locationUpdate;