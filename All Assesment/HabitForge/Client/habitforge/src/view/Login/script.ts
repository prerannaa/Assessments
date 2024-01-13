// script.ts (for login form)
import { makeRequest } from "../../axios/axios";
import { IHTTPError } from "../../interface/errorInterface";
import { showToastMessage } from "../../utils/tostifyNotification";

const loginForm: HTMLElement = document.getElementById(
  "login-form"
) as HTMLFormElement;
const usernameInput: HTMLInputElement = document.getElementById(
  "login-username"
) as HTMLInputElement;
const passwordInput: HTMLInputElement = document.getElementById(
  "login-password"
) as HTMLInputElement;

const clearValidationErrors = () => {
  const errorElements = document.querySelectorAll(".is-invalid");
  errorElements.forEach((element) => {
    element.classList.remove("is-invalid");
  });
};

const validateEmptyField = (inputElement: HTMLInputElement) => {
  const feedbackElement = inputElement.nextElementSibling as HTMLElement;

  // Clear previous validation styles
  inputElement.classList.remove("is-invalid");
  feedbackElement.innerHTML = "";

  // Validate if the input is empty
  if (!inputElement.value.trim()) {
    inputElement.classList.add("is-invalid");
    feedbackElement.innerHTML = "This field is required.";
  }
};

usernameInput.addEventListener("input", () => {
  clearValidationErrors();
  validateEmptyField(usernameInput);
});

passwordInput.addEventListener("input", () => {
  clearValidationErrors();
  validateEmptyField(passwordInput);
});

const handleLogin = async (e: Event) => {
  e.preventDefault();
  validateEmptyField(usernameInput);
  validateEmptyField(passwordInput);

  if (usernameInput.classList.contains("is-invalid") || passwordInput.classList.contains("is-invalid")) {
    // Stop further processing if there are validation errors
    return;
  }

  const username = usernameInput.value;
  const password = passwordInput.value;
  try {
    const res = await makeRequest.post("/auth/login", { username, password });
    if (res.status == 200) {
      console.log("Redirect to dashboard!");
        window.location.href = "../Dashboard/dashboard.html";
    }
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToastMessage("failed", errorMessage as string);
  }
};

loginForm.addEventListener("submit", handleLogin);
