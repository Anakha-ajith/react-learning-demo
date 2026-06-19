const ReviewSubmit = ({ formData }) => {
  return (
    <>
      <h2>Review & Submit</h2>

      <p>
        <strong>Name:</strong> {formData.name}
      </p>

      <p>
        <strong>Email:</strong> {formData.email}
      </p>

      <p>
        <strong>Address:</strong> {formData.address}
      </p>

      <p>
        <strong>City:</strong> {formData.city}
      </p>

      <p>
        <strong>State:</strong> {formData.state}
      </p>
    </>
  );
};

export default ReviewSubmit;