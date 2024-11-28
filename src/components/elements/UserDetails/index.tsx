const UserDetails = ({ userDetails, onChange }) => {
  const handleInputChange = (e) => {
    onChange({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Details</h2>
      <div className="mb-4">
        <label className="block">Name:</label>
        <input
          type="text"
          name="name"
          value={userDetails.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block">Address:</label>
        <input
          type="text"
          name="address"
          value={userDetails.address}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block">Rental Property Name:</label>
        <input
          type="text"
          name="propertyName"
          value={userDetails.propertyName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default UserDetails;
