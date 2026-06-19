import { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import AddressDetails from "./AddressDetails";
import ReviewSubmit from "./ReviewSubmit";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
      ) {
        newErrors.email = "Invalid email format";
      }
    }

    if (step === 2) {
      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
      }

      if (!formData.city.trim()) {
        newErrors.city = "City is required";
      }

      if (!formData.state.trim()) {
        newErrors.state = "State is required";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    alert("Registration Submitted");
    setStep(1);
    setFormData({
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
    });
    setErrors({});
    console.log(formData);
  };

  return (
    <div>
      {step === 1 && (
        <PersonalDetails
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />
      )}

      {step === 2 && (
        <AddressDetails
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />
      )}

      {step === 3 && <ReviewSubmit formData={formData} />}

      <div style={{ marginTop: "20px" }}>
        {step > 1 && <button onClick={previousStep}>Previous</button>}

        {step < 3 ? (
          <button onClick={nextStep}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
