import { Component, inject } from '@angular/core';
import { Alert, AlertService } from '@app/shared/services/alert-service';

@Component({
  selector: 'appli-alerts',
  imports: [],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss',
})
export class AlertsComponent {

  private alertsService = inject(AlertService)
  public alerts = this.alertsService.$listValue

  public createDummyAlert() {
    let dummyAlert: Alert = {
      id: '', //tech debt; base-service creation type does not need this property
      message: 'Lorem ipsum',
      createdAt: new Date() //tech debt; base-service creation type does not need this property
    }
    this.alertsService.create(dummyAlert)
  }
}
