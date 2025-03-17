import "./style.css";

(function setupFormvalidation() {
  const form = document.querySelector("form");
  const emailInput = document.querySelector("#email");
  const countryInput = document.querySelector("#country");
  const postalCodeInput = document.querySelector("#postal-code");
  const passwordInput = document.querySelector("#password");
  const passwordConfirmationInput = document.querySelector(
    "#password-confirmation",
  );

  function validateEmailInput() {
    const emailValidationLabel = document.querySelector(
      ".email-validation-result",
    );
    emailValidationLabel.textContent = "";

    if (emailInput.validity.valueMissing) {
      emailValidationLabel.textContent = "Please provide a email.";
      return false;
    } else if (emailInput.validity.typeMismatch) {
      emailValidationLabel.textContent =
        "Please provide a valid email address.";
      return false;
    }
    return true;
  }

  function validateCountry() {
    const countryValidationLabel = document.querySelector(
      ".country-validation-result",
    );

    countryValidationLabel.textContent = "";

    if (countryInput.validity.valueMissing) {
      countryValidationLabel.textContent = "Please provide a country.";
      return false;
    }
    return true;
  }

  function validatePostalCode() {
    const postalCodeValidationLabel = document.querySelector(
      ".postal-code-validation-result",
    );

    postalCodeValidationLabel.textContent = "";

    if (postalCodeInput.validity.valueMissing) {
      postalCodeValidationLabel.textContent = "Please provide a postal code.";
      return false;
    } else if (!/^[a-zA-Z]\d{4}[a-zA-Z]{3}$/.test(postalCodeInput.value)) {
      postalCodeValidationLabel.textContent =
        "Invalid postal code format, please read indications.";
      return false;
    }
    return true;
  }

  function validatePassword() {
    const passwordValidationLabel = document.querySelector(
      ".password-validation-result",
    );

    passwordValidationLabel.textContent = "";

    if (passwordInput.validity.valueMissing) {
      passwordValidationLabel.textContent =
        "A password is required for registration.";
      return false;
    } else if (
      !/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).{8,20}$/.test(passwordInput.value)
    ) {
      passwordValidationLabel.textContent =
        "Password does not meet the requirements.";
      return false;
    }
    return true;
  }

  function updatePasswordRequirements() {
    const lengthIndicator = document.querySelector(".password-length");
    const lowercaseIndicator = document.querySelector(".password-lowercase");
    const uppercaseIndicator = document.querySelector(".password-uppercase");
    const numberIndicator = document.querySelector(".password-number");
    let isValid = true;

    lengthIndicator.classList.remove("invalid", "valid");
    lowercaseIndicator.classList.remove("invalid", "valid");
    uppercaseIndicator.classList.remove("invalid", "valid");
    numberIndicator.classList.remove("invalid", "valid");

    if (/.{8,20}/.test(passwordInput.value)) {
      lengthIndicator.classList.add("valid");
    } else {
      lengthIndicator.classList.add("invalid");
      isValid = false;
    }
    if (/(?=.*?[a-z])/.test(passwordInput.value)) {
      lowercaseIndicator.classList.add("valid");
    } else {
      lowercaseIndicator.classList.add("invalid");
      isValid = false;
    }
    if (/(?=.*?[A-Z])/.test(passwordInput.value)) {
      uppercaseIndicator.classList.add("valid");
    } else {
      uppercaseIndicator.classList.add("invalid");
      isValid = false;
    }
    if (/(?=.*?\d)/.test(passwordInput.value)) {
      numberIndicator.classList.add("valid");
    } else {
      numberIndicator.classList.add("invalid");
      isValid = false;
    }
    return isValid;
  }

  function validatePasswordConfirmation() {
    const passwordConfirmationValidationLabel = document.querySelector(
      ".password-confirmation-validation-result",
    );

    passwordConfirmationValidationLabel.textContent = "";

    if (passwordConfirmationInput.validity.valueMissing) {
      passwordConfirmationValidationLabel.textContent =
        "A password confirmation is required for registration.";
      return false;
    } else if (passwordConfirmationInput.value !== passwordInput.value) {
      passwordConfirmationValidationLabel.textContent =
        "Passwords do not match.";
      return false;
    }
    return true;
  }

  function clearValidationResult(event) {
    const validationResult = event.target.nextElementSibling;
    validationResult.textContent = "";
  }

  function setupInputValidation(input, validator) {
    input.addEventListener("input", clearValidationResult);
    input.addEventListener("focusout", validator);
  }

  function validateForm(event) {
    event.preventDefault();
    if (!validateEmailInput()) {
      emailInput.focus();
      return;
    }
    if (!validateCountry()) {
      countryInput.focus();
      return;
    }
    if (!validatePostalCode()) {
      postalCodeInput.focus();
      return;
    }
    if (!validatePassword()) {
      passwordInput.focus();
      return;
    }
    if (!validatePasswordConfirmation()) {
      passwordConfirmationInput.focus();
      return;
    }

    alert("Registration successful!");
  }

  setupInputValidation(emailInput, validateEmailInput);
  setupInputValidation(countryInput, validateCountry);
  setupInputValidation(postalCodeInput, validatePostalCode);
  setupInputValidation(passwordInput, validatePassword);
  passwordInput.addEventListener("input", updatePasswordRequirements);
  setupInputValidation(passwordConfirmationInput, validatePasswordConfirmation);

  form.addEventListener("submit", validateForm);
})();
