interface ClassToggleOptions {
    add?: string;
    remove?: string;
  }
  
  function toggleClass(element: HTMLElement, options: ClassToggleOptions): void {
    if (options.remove) {
      element.classList.remove(options.remove);
    }
    if (options.add) {
      element.classList.add(options.add);
    }
  }
  
  export { toggleClass };
  export type { ClassToggleOptions };