const PersonalDetails = ({
  formData,
  handleChange,
  errors,
}) => {
  return (
    <>
      <h2>Personal Details</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />

      {errors.name && (
        <p className="error">{errors.name}</p>
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      {errors.email && (
        <p className="error">{errors.email}</p>
      )}
    </>
  );
};

export default PersonalDetails;