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

  ngAfterViewInit(): void {
    const focusableElements = document.querySelectorAll('.focusable-element');
    const dropdown = document.getElementById('dropdown-menu-container') as HTMLElement;
    focusableElements.forEach(element => {
      element.addEventListener('focus', () => {
        const styles = window.getComputedStyle(dropdown)
        if (styles.display == 'none') dropdown.style.display = 'block'
        // else dropdown.style.display = 'none'
      });

      // element.addEventListener('blur', () => {
      //   setTimeout(() => {
      //     dropdown.style.display = 'none'
      //   }, 500);
      // });
    })
  }

  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 50) {
      this.reachedBottom.next(true);
    }
  }

  selectOption(index: any) {
    this.showDropdown = false;
    this.options.forEach((element: any) => {
      element.selected = false;
    });
    this.options[index].selected = true;
    this.optionSelected.next(this.options[index]);
  }

  search() {
    try {
      this.filteredData.next(this.searchQuery);
      this.highlightSearchString();
    } catch (error) {

    }
  }

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
