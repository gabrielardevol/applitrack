import { Component, computed, inject, signal } from '@angular/core';
import { AlertsService } from './alerts.service';

@Component({
  selector: 'app-alerts',
  imports: [],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss',
})
export class AlertsComponent {
  alertsService = inject(AlertsService)
  $alerts = computed(() => this.alertsService.$alerts().filter(a => !a.removedAt))
  closeDialog(alertId: string) {
    let dialog = document.querySelector(`#dialog${alertId}`) as HTMLDialogElement;
    dialog.close()
  }
}
