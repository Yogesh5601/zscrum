const LocationDetails = ({ locationDetails, onChange }) => {
  const handleInputChange = (e) => {
    onChange({
      ...locationDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Location Details</h2>
      <div className="mb-4">
        <label className="block">City:</label>
        <input
          type="text"
          name="city"
          value={locationDetails.city}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block">State:</label>
        <input
          type="text"
          name="state"
          value={locationDetails.state}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block">ZIP Code:</label>
        <input
          type="text"
          name="zip"
          value={locationDetails.zip}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default LocationDetails;
