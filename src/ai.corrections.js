import "./style.css";

(function setupFormValidation() {
  const SELECTORS = {
    form: "form",
    email: "#email",
    country: "#country",
    postalCode: "#postal-code",
    password: "#password",
    passwordConfirmation: "#password-confirmation",
    emailValidation: ".email-validation-result",
    countryValidation: ".country-validation-result",
    postalCodeValidation: ".postal-code-validation-result",
    passwordValidation: ".password-validation-result",
    passwordConfirmationValidation: ".password-confirmation-validation-result",
    passwordLength: ".password-length",
    passwordLowercase: ".password-lowercase",
    passwordUppercase: ".password-uppercase",
    passwordNumber: ".password-number",
  };

  const form = document.querySelector(SELECTORS.form);
  const emailInput = document.querySelector(SELECTORS.email);
  const countryInput = document.querySelector(SELECTORS.country);
  const postalCodeInput = document.querySelector(SELECTORS.postalCode);
  const passwordInput = document.querySelector(SELECTORS.password);
  const passwordConfirmationInput = document.querySelector(
    SELECTORS.passwordConfirmation,
  );

  function clearValidationMessage(element) {
    element.textContent = "";
  }

  function showValidationMessage(element, message) {
    element.textContent = message;
  }

  function validateInput(input, validationLabel, validationFn, errorMessages) {
    clearValidationMessage(validationLabel);

    if (input.validity.valueMissing) {
      showValidationMessage(validationLabel, errorMessages.valueMissing);
      return false;
    }

    if (validationFn && !validationFn(input.value)) {
      showValidationMessage(validationLabel, errorMessages.custom);
      return false;
    }

    return true;
  }

  function validateEmail() {
    return validateInput(
      emailInput,
      document.querySelector(SELECTORS.emailValidation),
      null,
      {
        valueMissing: "Please provide an email.",
        custom: "Please provide a valid email address.",
      },
    );
  }

  function validateCountry() {
    return validateInput(
      countryInput,
      document.querySelector(SELECTORS.countryValidation),
      null,
      {
        valueMissing: "Please provide a country.",
      },
    );
  }

  function validatePostalCode() {
    return validateInput(
      postalCodeInput,
      document.querySelector(SELECTORS.postalCodeValidation),
      (value) => {
        return /^[a-zA-Z]\d{4}[a-zA-Z]{3}$/.test(value);
      },
      {
        valueMissing: "Please provide a postal code.",
        custom: "Invalid postal code format, please read indications.",
      },
    );
  }

  function validatePassword() {
    return validateInput(
      passwordInput,
      document.querySelector(SELECTORS.passwordValidation),
      (value) => {
        return /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).{8,20}$/.test(value);
      },
      {
        valueMissing: "A password is required for registration.",
        custom: "Password does not meet the requirements.",
      },
    );
  }

  function validatePasswordConfirmation() {
    return validateInput(
      passwordConfirmationInput,
      document.querySelector(SELECTORS.passwordConfirmationValidation),
      (value) => {
        return value === passwordInput.value;
      },
      {
        valueMissing: "A password confirmation is required for registration.",
        custom: "Passwords do not match.",
      },
    );
  }

  function updatePasswordRequirements() {
    const indicators = {
      length: document.querySelector(SELECTORS.passwordLength),
      lowercase: document.querySelector(SELECTORS.passwordLowercase),
      uppercase: document.querySelector(SELECTORS.passwordUppercase),
      number: document.querySelector(SELECTORS.passwordNumber),
    };

    const password = passwordInput.value;

    indicators.length.classList.toggle("valid", /.{8,20}/.test(password));
    indicators.lowercase.classList.toggle(
      "valid",
      /(?=.*?[a-z])/.test(password),
    );
    indicators.uppercase.classList.toggle(
      "valid",
      /(?=.*?[A-Z])/.test(password),
    );
    indicators.number.classList.toggle("valid", /(?=.*?\d)/.test(password));
  }

  function setupInputValidation(
    input,
    validationLabel,
    validationFn,
    errorMessages,
  ) {
    input.addEventListener("input", () =>
      clearValidationMessage(validationLabel),
    );
    input.addEventListener("focusout", () =>
      validateInput(input, validationLabel, validationFn, errorMessages),
    );
  }

  function validateForm(event) {
    event.preventDefault();

    const validations = [
      validateEmail(),
      validateCountry(),
      validatePostalCode(),
      validatePassword(),
      validatePasswordConfirmation(),
    ];

    if (validations.every((isValid) => isValid)) {
      alert("Registration successful!");
    }
  }

  setupInputValidation(
    emailInput,
    document.querySelector(SELECTORS.emailValidation),
    null,
    {
      valueMissing: "Please provide an email.",
      custom: "Please provide a valid email address.",
    },
  );

  setupInputValidation(
    countryInput,
    document.querySelector(SELECTORS.countryValidation),
    null,
    {
      valueMissing: "Please provide a country.",
    },
  );

  setupInputValidation(
    postalCodeInput,
    document.querySelector(SELECTORS.postalCodeValidation),
    (value) => {
      return /^[a-zA-Z]\d{4}[a-zA-Z]{3}$/.test(value);
    },
    {
      valueMissing: "Please provide a postal code.",
      custom: "Invalid postal code format, please read indications.",
    },
  );

  setupInputValidation(
    passwordInput,
    document.querySelector(SELECTORS.passwordValidation),
    (value) => {
      return /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).{8,20}$/.test(value);
    },
    {
      valueMissing: "A password is required for registration.",
      custom: "Password does not meet the requirements.",
    },
  );

  passwordInput.addEventListener("input", updatePasswordRequirements);

  setupInputValidation(
    passwordConfirmationInput,
    document.querySelector(SELECTORS.passwordConfirmationValidation),
    (value) => {
      return value === passwordInput.value;
    },
    {
      valueMissing: "A password confirmation is required for registration.",
      custom: "Passwords do not match.",
    },
  );

  form.addEventListener("submit", validateForm);
})();
