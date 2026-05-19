import { Component, computed, inject, input, Signal, WritableSignal } from '@angular/core';
import { ResponsesService } from '@app/shared/services/responses/responses-service';
import { Response } from '@app/shared/types';

@Component({
  selector: 'app-response-details',
  imports: [],
  templateUrl: './response-details.html',
  styleUrl: './response-details.scss',
})
export class ResponseDetails {

  private resposesService = inject(ResponsesService)

  public responses: Signal<Response[]> = computed(() => {
    let responses = this.resposesService.getByParams({ vacancyId: this.vacancyId() });
    return responses ? responses : [];
  })
  vacancyId = input<string>('');

}
