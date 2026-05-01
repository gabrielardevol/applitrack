import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

class Alert {
  id: string;
  message: string;
  acceptButtonText: string;
  cancelButtonText: string;
  createdAt: Date;
  removedAt?: Date;
  constructor(message: string, acceptButtonText: string = 'Accept', cancelButtonText: string = 'Cancel') {
    this.id = uuidv4();
    this.message = message;
    this.acceptButtonText = acceptButtonText;
    this.cancelButtonText = cancelButtonText;
    this.createdAt = new Date()
  }

  accept() {
    //emit event
  }

  cancel() {
    //emit event
  }
}

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AlertsService {
  $alerts: WritableSignal<Alert[]> = signal([]);
  createAlert(message: string, acceptButtonText: string | undefined, cancelButtonText: string | undefined) {
    let alert = new Alert(message, acceptButtonText, cancelButtonText)
    this.$alerts.update((alerts) => [...alerts, alert])
    console.log(this.$alerts())
    return alert;
  }
}
