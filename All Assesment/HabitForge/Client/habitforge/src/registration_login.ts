import { makeRequest } from "../axios/axios";
import { toast } from "../utils/tostifyNotification";
import { toggleClass } from "../utils/toggle";
import { SignupFormData, LoginFormData} from "../interface/formInterface";
import * as yup from 'yup';

const signupUsername: HTMLInputElement = document.querySelector('#signup-username') as HTMLInputElement;
const signupPassword: HTMLInputElement = document.querySelector('#signup-password') as HTMLInputElement;
const signupEmail: HTMLInputElement = document.querySelector('#signup-email') as HTMLInputElement;
const signupForm: HTMLFormElement = document.querySelector('#registration-form') as HTMLFormElement;
const invalidPasswordInput: HTMLElement = document.querySelector('#invalid-password') as HTMLElement;
const invalidConfirmPassword: HTMLElement = document.querySelector('#invalid-confirm-password') as HTMLElement;
const confirmPasswordInput : HTMLElement = document.querySelector('confirm-password') as HTMLElement;

// const validatePassword = (password: string, confirmPassword: string): boolean => {
//   const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

//   if (!passwordPattern.test(password)) {
//     toast("error", "Invalid password format");
//     toggleClass(invalidPasswordInput, { add: "flex", remove: "hidden" });
//     toggleClass(signupPassword, { add: "border-red-700", remove: "border-black" });
//     return false;
//   }

//   if (password !== confirmPassword) {
//     toast("error", "Passwords do not match");
//     toggleClass(invalidConfirmPassword, { add: "flex", remove: "hidden" });
//     toggleClass(confirmPasswordInput, {
//       add: "border-red-700",
//       remove: "border-black",
//     });
//     return false;
//   }

//   return true;
// };

// const handleUserRegistration = async (event: Event) => {
//   event.preventDefault();

//   const email = signupEmail.value;
//   const username = signupUsername.value;
//   const password = signupPassword.value;
//   const confirmPassword = confirmPasswordInput.value;
//   const isValidPassword = validatePassword(password, confirmPassword);

//   if (isValidPassword) {
//     try {
//       const response = await makeRequest.post("/auth/register", {
//         email,
//         username,
//         password,
//       });

//       if (response.status === 200) {
//         toast("success", response.data);
//         window.location.href = `${window.location.origin}/index.html`;
//       }
//     } catch (error) {
//       const errorMessage = (error as any)?.response?.data?.message || "Registration failed";
//       toast("error", errorMessage);
//     }
//   }
// };

// signupForm.addEventListener("submit", handleUserRegistration);

// // Event listeners for focus on password and confirm password inputs
// signupPassword.addEventListener("focusin", () => {
//   toggleClass(invalidPasswordInput, { add: "hidden", remove: "flex" });
//   toggleClass(signupPassword, { remove: "border-red-700", add: "border-black" });
// });

// confirmPasswordInput.addEventListener("focusin", () => {
//   toggleClass(invalidConfirmPassword, { add: "hidden", remove: "flex" });
//   toggleClass(confirmPasswordInput, {
//     remove: "border-red-700",
//     add: "border-black",
//   });
// });


const signupSchema = yup.object().shape<SignupFormData>({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});