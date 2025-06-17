import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  show = false;
  message = '';
  type: 'success' | 'danger' | 'info' = 'info';

  showToast(msg: string, type: 'success' | 'danger' | 'info' = 'info') {
    this.message = msg;
    this.type = type;
    this.show = true;

    setTimeout(() => {
      this.show = false;
    }, 4000);
  }
}
