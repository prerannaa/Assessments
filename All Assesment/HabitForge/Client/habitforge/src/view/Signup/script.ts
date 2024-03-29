import { makeRequest } from "../../axios/axios";
import { ISignupData } from "../../interface/formInterface";
import { IHTTPError } from "../../interface/errorInterface";
import { registrationSchema } from "../../schema/validation";
import * as yup from "yup";
import { showToastMessage } from "../../utils/tostifyNotification";

const registerForm = document.getElementById(
  "registration-form"
) as HTMLFormElement;
const usernameInput = document.getElementById(
  "signup-username"
) as HTMLInputElement;
const emailInput = document.getElementById("signup-email") as HTMLInputElement;
const passwordInput = document.getElementById(
  "signup-password"
) as HTMLInputElement;
const confirmPasswordInput = document.getElementById(
  "signup-confirm-password"
) as HTMLInputElement;
// const profileUrlInput = document.getElementById("file-input") as HTMLInputElement;
const confirmPasswordError = document.getElementById(
  "invalid-confirm-password"
) as HTMLDivElement;


const clearValidationErrors = () => {
  const errorElements = document.querySelectorAll(".is-invalid");
  errorElements.forEach((element) => {
    element.classList.remove("is-invalid");
  });
};

const validateInput = async (data: ISignupData) => {
  clearValidationErrors();

  try {
    await registrationSchema.validate(data, { abortEarly: false });
    if (data.password !== data.confirmPassword) {
      console.log("Password does not match");
      confirmPasswordInput.classList.add("is-invalid");
      confirmPasswordError.innerHTML = "Passwords do not match";
    }
    return true;
    }
   catch (error: any) {
    // Yup validation error handling
    error.inner.forEach((err: yup.ValidationError) => {
      const inputElement = document.getElementById(
        `signup-${err.path}`
      ) as HTMLInputElement;

      if (inputElement) {
        const feedbackElement = inputElement.nextElementSibling as HTMLElement | null;
        // Check if feedbackElement is not null before setting innerHTML
        if (feedbackElement) {
          inputElement.classList.add("is-invalid");
          feedbackElement.innerHTML = err.message;
        }
      }
    });
    return false;
  }
};

registerForm.addEventListener("input", (event) => {
  const inputElement = event.target as HTMLInputElement;
  const feedbackElement = inputElement.nextElementSibling as HTMLElement;

  // Clear previous validation styles
  inputElement.classList.remove("is-invalid");
  feedbackElement.innerHTML = "";

  // Validate if the input is empty
  if (!inputElement.value.trim()) {
    inputElement.classList.add("is-invalid");
    feedbackElement.innerHTML = "This field is required.";
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  const user = {
    username,
    email,
    password,
    confirmPassword,
  };

  if (await validateInput(user)) {
    const { confirmPassword, ...userWithoutConfirmPassword } = user;
    await register(userWithoutConfirmPassword);
  }
  return;
});

const register = async (user: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await makeRequest.post("/auth/register", user);
    if (response.status === 200) {
      showToastMessage("success", "Signup success");
      // Wait for 2 seconds before redirecting to login
      setTimeout(() => {
        window.location.href = "../Login/login.html";
      }, 1000);
    } else {
      showToastMessage("error", "Signup failed");
    }
  } catch (error) {
    const errorMessage =
    typeof error === "object" && error !== null
      ? (error as IHTTPError)?.response?.data?.message
      : "";

  showToastMessage("failed", errorMessage as string);
  }
};
