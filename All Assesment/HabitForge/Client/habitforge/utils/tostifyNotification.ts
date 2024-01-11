import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const showToastMessage = (toastType: string, message: string) => {
  const backgroundColor = toastType === "success" ? "#7CFC00" : "#FF5733";
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      borderRadius: "10px 0px 0px 10px",
      background: backgroundColor,
    },
  }).showToast();
};