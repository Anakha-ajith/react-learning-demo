const AddressDetails = ({
  formData,
  handleChange,
  errors,
}) => {
  return (
    <>
      <h2>Address Details</h2>

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />

      {errors.address && (
        <p className="error">{errors.address}</p>
      )}

      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />

      {errors.city && (
        <p className="error">{errors.city}</p>
      )}

      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
      />

      {errors.state && (
        <p className="error">{errors.state}</p>
      )}
    </>
  );
};

export default AddressDetails;