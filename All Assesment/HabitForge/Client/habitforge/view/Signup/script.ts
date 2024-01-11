import { makeRequest } from "../../axios/axios";
import { ISignupData } from "../../interface/formInterface";
import { AxiosError } from "axios";
// import { registrationSchema } from "../../schema/validation";
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

const validateInput = async (data: ISignupData) => {
  try {
    // await registrationSchema.validate(data, { abortEarly: false });
    // if (data.password !== data.confirmPassword) {
    //   console.log("Password does not match");
    //   confirmPasswordInput.classList.add("is-invalid");
    //   confirmPasswordError.innerHTML = "Passwords do not match";
    //   return false;
    // }
    return true;
  } catch (error: any) {
    // Yup validation error handling
    error.inner.forEach((err: yup.ValidationError) => {
      const inputElement = document.getElementById(
        `signup-${err.path}`
      ) as HTMLInputElement;
      if (inputElement) {
        inputElement.classList.add("is-invalid");
        const feedbackElement = inputElement.nextElementSibling as HTMLElement;
        feedbackElement.innerHTML = err.message;
      }
    });
    return false;
  }
};

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Reset validation styles
  usernameInput.classList.remove("is-invalid");
  emailInput.classList.remove("is-invalid");
  passwordInput.classList.remove("is-invalid");
  confirmPasswordInput.classList.remove("is-invalid");
  confirmPasswordError.innerHTML = "";

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
    console.log("Signup success", response.status);
    if (response.status === 200) {
      showToastMessage("success", "Signup success");
      // Wait for 2 seconds before redirecting to login
      setTimeout(() => {
        window.location.href = "../Login/login.html";
      }, 2000);
    } else {
      showToastMessage("error", "Signup failed");
    }
  } catch (error) {
    // console.log({ error });
    if (error instanceof AxiosError) {
      // Handle Axios error
      showToastMessage("error", "An error occurred while signing up");
    }
  }
};
