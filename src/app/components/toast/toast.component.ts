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

  /**
   * The `openToast` function displays a toast message with a specified message and type (error,
   * warning, or success) for a duration of 1 second.
   * @param {string} toastMessage - A string that represents the message to be displayed in the toast
   * notification.
   * @param {'error' | 'warning' | 'success'} [toastType=success] - The `toastType` parameter is a
   * string that specifies the type of toast message. It can have one of three values: 'error',
   * 'warning', or 'success'. The default value is 'success'.
   */
  openToast(toastMessage: string, toastType: 'error' | 'warning' | 'success' = 'success') {
    this.toastMessage = toastMessage
    this.toastType = toastType;
    this.showToast = true;
    document.getElementById('custom-toast')?.classList.add('show');
    setTimeout(() => {
      document.getElementById('custom-toast')?.classList.remove('show');
    }, 1000);
  }

  /**
   * The closeToast function sets the showToast variable to false.
   */
  closeToast() {
    this.showToast = false;
  }
}
