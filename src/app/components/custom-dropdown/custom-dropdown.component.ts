import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss'],
})
export class CustomDropdownComponent implements AfterViewInit {
  @Input() options: any;
  @Input() selected: any;

  @Output() reachedBottom: EventEmitter<any> = new EventEmitter<any>();
  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() filteredData: EventEmitter<any> = new EventEmitter<any>();


  isTypeAhead: boolean = false;
  searchQuery = '';
  filteredItems: string[] = [];
  showDropdown = false;
  displayedItems = 10; // Number of initially displayed items


  /* The `@HostListener` decorator is used to listen for events on the host element of the component. In
  this case, it is listening for the 'click' event on the document. */
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const allClasses = clickedElement.classList;
    const dropdown = document.getElementById('dropdown-menu-container');
    if (allClasses.contains('focusable-element')) {
      dropdown?.classList.remove('d-none');
    } else dropdown?.classList.add('d-none');;
  }

  ngAfterViewInit(): void {
  }

  /**
   * The function checks if the user has scrolled to the bottom of the target element and emits a value
   * indicating that the bottom has been reached.
   * @param {any} event - The event parameter is an object that represents the scroll event. It contains
   * information about the scroll event, such as the target element that triggered the event, the current
   * scroll position, and the dimensions of the scrollable area.
   */
  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 50) {
      this.reachedBottom.next(true);
    }
  }

  /**
   * The selectOption function updates the selected option in a dropdown menu and emits an event with the
   * selected option.
   * @param {any} index - The index parameter is the index of the option that was selected from the
   * dropdown menu.
   */
  selectOption(index: any) {
    this.showDropdown = false;
    this.options.forEach((element: any) => {
      element.selected = false;
    });
    this.options[index].selected = true;
    this.optionSelected.next(this.options[index]);
  }

  /**
   * The search function updates the filteredData and highlights the search query.
   */
  search() {
    try {
      this.filteredData.next(this.searchQuery);
      this.highlightSearchString();
    } catch (error) {

    }
  }

  /**
   * The function highlights a search query within a list of HTML elements.
   */
  highlightSearchString() {
    try {
      const allLi = document.querySelectorAll('li')
      allLi.forEach((li) => {
        li.innerHTML = li.innerHTML.replace('<mark>', '');
        li.innerHTML = li.innerHTML.replace('</mark>', '');
        if ((li.textContent)?.toLocaleLowerCase()?.includes(this.searchQuery.toLocaleLowerCase())) {
          li.innerHTML = li.innerHTML.replace(this.searchQuery, "<mark>" + this.searchQuery + "</mark>");
        }
      })
    } catch (error) {
      throw error;
    }
  }

}
