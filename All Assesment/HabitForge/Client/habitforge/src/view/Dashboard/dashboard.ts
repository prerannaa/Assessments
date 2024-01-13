import * as bootstrap from 'bootstrap';
import { Dropdown } from 'bootstrap';

window.bootstrap = bootstrap;

document.addEventListener("click", (event: Event) => {
    const target = event.target as HTMLElement;
  
    if (target && target.id === "cust_btn") {
      const myModal = document.getElementById('myModal');
      
      if (myModal) {
        const bootstrapModal = new bootstrap.Modal(myModal);
        bootstrapModal.toggle();
      }
    }
  });

const dropdownElementList: NodeListOf<Element> = document.querySelectorAll('#dropdownMenuButton');
const dropdownList: Dropdown[] = Array.from(dropdownElementList).map((dropdownToggleEl) => new Dropdown(dropdownToggleEl as HTMLElement));
console.log(dropdownList);
// Assuming you have HTML elements with IDs 'startDate', 'endDate', and 'startDateSelected'

const startDateElement: HTMLInputElement | null = document.getElementById('startDate') as HTMLInputElement;
const startDateSelectedElement: HTMLElement | null = document.getElementById('startDateSelected');

if (startDateElement && startDateSelectedElement) {
  startDateElement.addEventListener('change', (event: Event) => {
    const startDateVal: string = (event.target as HTMLInputElement).value;
    startDateSelectedElement.innerText = startDateVal;
  });
}
