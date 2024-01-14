import * as bootstrap from "bootstrap";

window.bootstrap = bootstrap;

document.addEventListener("click", (event: Event) => {
  const target = event.target as HTMLElement;

  if (target && target.id === "cust_btn") {
    const myModal = document.getElementById("myModal");

    if (myModal) {
      const bootstrapModal = new bootstrap.Modal(myModal);
      bootstrapModal.toggle();
    }
  }
});

const startDateElement: HTMLInputElement | null = document.getElementById(
  "startDate"
) as HTMLInputElement;
const startDateSelectedElement: HTMLElement | null =
  document.getElementById("startDateSelected");

if (startDateElement && startDateSelectedElement) {
  startDateElement.addEventListener("change", (event: Event) => {
    const startDateVal: string = (event.target as HTMLInputElement).value;
  });
}

/**
 * Adds a click event listener to the "Save" button in the habit creation modal.
 * Retrieves values from various input fields in the modal, such as habit title, notes, start date, interval, etc.
 * Logs the retrieved values to the console. You can customize this part based on your needs.
 *
 */
document.addEventListener("DOMContentLoaded", function () {
  // Get the "Save" button in the modal
  const saveButton = document.querySelector(".modal-footer .btn-secondary");
  const diffButtons = document.querySelectorAll(".diff-btn button");
  const selectDropdown = document.getElementById(
    "select-drpdwn"
  ) as HTMLSelectElement;

  let selectedDifficulty: string = ""; // Variable to store the selected difficulty
  let selectedRepeats: string = ""; // Variable to store the selected repeats value

  // Add click event listeners to each difficulty button
  diffButtons.forEach((button) => {
    button.addEventListener("click", function () {
      selectedDifficulty = button.getAttribute("value") || "";

      // Remove 'selected' class from all buttons
      diffButtons.forEach((btn) => {
        btn.classList.remove("selected");
        (btn as HTMLButtonElement).style.backgroundColor = ""; // Reset background color
        (btn as HTMLButtonElement).style.color = ""; // Reset text color
      });

      // Add 'selected' class to the clicked button
      button.classList.add("selected");
      (button as HTMLButtonElement).style.backgroundColor = "#FFEEDD";
      (button as HTMLButtonElement).style.color = "#B8B8FF";
    });
  });

  // Add change event listener to the dropdown
  selectDropdown.addEventListener("change", function () {
    selectedRepeats = selectDropdown.value;
    // console.log('Selected Repeats:', selectedRepeats);
  });

  // Add a click event listener to the "Save" button
  saveButton?.addEventListener("click", function () {
    // Retrieve values from the input fields
    const habitTitle = (
      document.getElementById("habitTitle") as HTMLInputElement
    )?.value;
    const habitNotes = (
      document.getElementById("habitNotes") as HTMLTextAreaElement
    )?.value;
    const startDate = (document.getElementById("startDate") as HTMLInputElement)
      ?.value;
    const interval = (
      document.getElementById("schedule-interval") as HTMLInputElement
    )?.value;

    // Get the selected reminder time
    const reminderTime = (
      document.querySelector(
        ".habit-reminder-container input[type='time']"
      ) as HTMLInputElement
    )?.value;

    // Now you can use or store these values as needed
    console.log("Habit Title:", habitTitle);
    console.log("Habit Notes:", habitNotes);
    console.log("Start Date:", startDate);
    console.log("Selected Difficulty:", selectedDifficulty);
    console.log("Selected Repeats:", selectedRepeats);
    console.log("Interval:", interval);
    console.log("Reminder Time:", reminderTime);
  });

  //Reset values of the modal
  saveButton?.addEventListener("click", function () {
    // Retrieve values from the input fields
    const habitTitleInput = document.getElementById("habitTitle") as HTMLInputElement;
    const habitNotesInput = document.getElementById("habitNotes") as HTMLTextAreaElement;
    const startDateInput = document.getElementById("startDate") as HTMLInputElement;
    const intervalInput = document.getElementById("schedule-interval") as HTMLInputElement;

    // Get the selected reminder time
    const reminderTimeInput = document.querySelector(".habit-reminder-container input[type='time']") as HTMLInputElement;

    // Clear values of the input fields
    habitTitleInput.value = "";
    habitNotesInput.value = "";
    startDateInput.value = "";
    intervalInput.value = "";
    reminderTimeInput.value = "";

    // Reset the selectedDifficulty and selectedRepeats variables
    selectedDifficulty = "";
    selectedRepeats = "";

    // Remove 'selected' class and reset background color and text color for all buttons
    diffButtons.forEach((btn) => {
      btn.classList.remove("selected");
      (btn as HTMLButtonElement).style.backgroundColor = ""; // Reset background color
      (btn as HTMLButtonElement).style.color = ""; // Reset text color
    });
  });
});
