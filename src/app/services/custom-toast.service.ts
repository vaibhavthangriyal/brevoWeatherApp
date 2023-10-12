import { Injectable } from '@angular/core';
import Swal, { SweetAlertPosition } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CustomToastService {
  constructor() {}

  openToast(type: 'success' | 'error' | 'info' | 'warning', message: string, timer = 1500, position: SweetAlertPosition = 'top-end') {
    Swal.fire({
      position: position,
      icon: type,
      title: message,
      showConfirmButton: false,
      backdrop: false,
      toast: true,
      timer: timer,
    });
  }
}
