import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  showToast: boolean = true;
  toastMessage: string = 'asdasd';
  toastType: 'error' | 'warning' | 'success' = 'success';

  openToast(toastMessage: string, toastType: 'error' | 'warning' | 'success' = 'success') {
    this.toastMessage = toastMessage
    this.toastType = toastType;
    this.showToast = true;
    document.getElementById('custom-toast')?.classList.add('show');
    setTimeout(() => {
      document.getElementById('custom-toast')?.classList.remove('show');
    }, 1000);
  }

  closeToast() {
    this.showToast = false;
  }
}
