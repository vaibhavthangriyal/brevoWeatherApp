import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss'],
})
export class CustomDropdownComponent {
  @Input() options: any;
  @Input() selected: any;

  @Output() reachedBottom: EventEmitter<any> = new EventEmitter<any>();
  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('customDropdown') myDiv: ElementRef | any;

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.myDiv.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }

  searchQuery = '';
  filteredItems: string[] = [];
  showDropdown = false;
  displayedItems = 10; // Number of initially displayed items

  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
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
}
