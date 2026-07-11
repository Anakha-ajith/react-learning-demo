function createFormStateManager() {
  let previousValues = [];
  let submissionCount = 0;

  return {
    submitForm(userData) {
      if (!userData || typeof userData !== "object") {
        return {
          success: false,
          error: "Invalid input",
        };
      }

      if (
        typeof userData.name !== "string" ||
        userData.name.trim().length < 3
      ) {
        return {
          success: false,
          error: "Name too short",
        };
      }

      if (
        typeof userData.email !== "string" ||
        userData.email.trim().length < 5 ||
        !userData.email.includes("@")
      ) {
        return {
          success: false,
          error: "Email too short",
        };
      }
      const duplicate = previousValues.some(
        (user) => user.name === userData.name && user.email === userData.email,
      );

      if (duplicate) {
        return {
          success: false,
          error: "Duplicate submission",
        };
      }

      submissionCount++;

      previousValues.push({ ...userData });

      return {
        success: true,
        submissionCount,
        data: {...userData},
      };
    },

    getSubmissionCount() {
      return submissionCount;
    },

    resetState() {
      previousValues = [];
      submissionCount = 0;
    },
  };
}

const manager = createFormStateManager();

try {
    const res1 = manager.submitForm({
        name: "john",
        email: "j@gmail.com"
    });

    console.log(res1);

    const res2 = manager.submitForm({
        name: "joe",
        email: "j@.com"
    });

      const res3 = manager.submitForm({
        name: "joe",
        email: "j@.com"
    });
    console.log(res3);

} catch (err) {
    console.log(err.message);
}