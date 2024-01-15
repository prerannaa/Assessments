import * as bootstrap from "bootstrap";

window.bootstrap = bootstrap;

document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.querySelector(".modal-footer .btn-secondary");
  const diffButtons = document.querySelectorAll(".diff-btn button");
  const selectDropdown = document.getElementById(
    "select-drpdwn"
  ) as HTMLSelectElement;
  const listContainer = document.getElementById(
    "list-container"
  ) as HTMLElement;

  let selectedDifficulty: string = "";
  let selectedRepeats: string = "";
  console.log(selectedDifficulty, selectedRepeats)

  diffButtons.forEach((button) => {
    button.addEventListener("click", function () {
      selectedDifficulty = button.getAttribute("value") || "";

      diffButtons.forEach((btn) => {
        btn.classList.remove("selected");
        (btn as HTMLButtonElement).style.backgroundColor = "";
        (btn as HTMLButtonElement).style.color = "";
      });

      button.classList.add("selected");
      (button as HTMLButtonElement).style.backgroundColor = "#FFEEDD";
      (button as HTMLButtonElement).style.color = "#B8B8FF";
    });
  });

  selectDropdown.addEventListener("change", function () {
    selectedRepeats = selectDropdown.value;
  });

  saveButton?.addEventListener("click", function () {
    const habitTitleInput = document.getElementById(
      "habitTitle"
    ) as HTMLInputElement;
    const habitNotesInput = document.getElementById(
      "habitNotes"
    ) as HTMLTextAreaElement;
    const startDateInput = document.getElementById(
      "startDate"
    ) as HTMLInputElement;
    const intervalInput = document.getElementById(
      "schedule-interval"
    ) as HTMLInputElement;
    const reminderTimeInput = document.querySelector(
      ".habit-reminder-container input[type='time']"
    ) as HTMLInputElement;

    // Create a new list item
    const li = document.createElement("li");
    li.innerHTML = `<strong>${habitTitleInput.value}</strong> -<br> ${habitNotesInput.value}`;
    let span = document.createElement("span");
    span.innerHTML = "x";
    li.appendChild(span);

    // Append the list item to the list container
    listContainer?.appendChild(li);
    listContainer.addEventListener("click", (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === "LI") {
        (e.target as HTMLElement).classList.toggle("checked");
        saveData();
      }
      else if((e.target as HTMLElement).tagName == "SPAN"){
        (e.target as HTMLElement).parentElement?.remove();
        saveData();
      }
    });

    // Save data to localStorage
    saveData();

    // Reset input values and selected variables
    habitTitleInput.value = "";
    habitNotesInput.value = "";
    startDateInput.value = "";
    intervalInput.value = "";
    reminderTimeInput.value = "";
    selectedDifficulty = "";
    selectedRepeats = "";

    // Remove 'selected' class and reset background color and text color for all buttons
    diffButtons.forEach((btn) => {
      btn.classList.remove("selected");
      (btn as HTMLButtonElement).style.backgroundColor = "";
      (btn as HTMLButtonElement).style.color = "";
    });
  });

  function saveData() {
    if (listContainer) {
      localStorage.setItem("habitData", listContainer.innerHTML);
    }
  }

  function showData() {
    const savedData = localStorage.getItem("habitData");
    if (savedData && listContainer) {
      listContainer.innerHTML = savedData;
    }
  }

  // Add event listeners for filter options
  const allLink = document.getElementById("content-all") as HTMLUListElement;
  const completedLink = document.getElementById(
    "content-completed"
  ) as HTMLUListElement;
  const remainingLink = document.getElementById(
    "content-remaining"
  ) as HTMLUListElement;

  allLink.addEventListener("click", function () {
    filterList("all");
  });
  completedLink.addEventListener("click", function () {
    filterList("completed");
  });

  remainingLink.addEventListener("click", function () {
    filterList("remaining");
  });

  /**
   * Filter the habit list based on the selected filter type.
   * @param filterType - The type of filter to apply ("all", "completed", or "remaining").
   * @returns void
   */

  function filterList(filterType: string): void {
    const listItems = listContainer?.getElementsByTagName("li") || [];

    for (let i = 0; i < listItems.length; i++) {
      const listItem = listItems[i];
      const isChecked = listItem.classList.contains("checked");

      switch (filterType) {
        case "all":
          listItem.style.display = "block";
          break;
        case "completed":
          listItem.style.display = isChecked ? "block" : "none";
          break;
        case "remaining":
          listItem.style.display = isChecked ? "none" : "block";
          break;
        default:
          break;
      }
    }
  }

  // Load saved data on page load
  window.addEventListener("load", showData);
});



  // async function saveHabitData(habitData: any) {
  //   try {
  //     const response = await makeRequest.post("/dashboard/habits", habitData);
  //     if (response.status === 200) {
  //       console.log("Habit data successfully sent to the API");
  //       showToastMessage("success", "Habit data successfully sent to the API")
  //     } else {
  //       console.error("Failed to send habit data to the API");
  //       showToastMessage("error", "Failed to send habit data to the API");
  //     }
  //   } catch (error) {
  //     console.error("Error sending habit data to the API", error);
  //     // Handle error as needed
  //   }
  // }
 