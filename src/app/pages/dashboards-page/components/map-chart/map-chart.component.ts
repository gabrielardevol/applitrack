import { AfterViewInit, Component, inject, signal, WritableSignal } from '@angular/core';
import { VacanciesService } from '@app/shared/services/vacancies/vacancy-service';
import { VacancyDetail } from '@app/vacancies/components/vacancy-detail/vacancy-detail';
import { LeafletDirective, LeafletLayersControlDirective } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-chart',
  imports: [LeafletDirective, LeafletLayersControlDirective, VacancyDetail],
  templateUrl: './map-chart.component.html',
  styles: [`
    #map {
      height: 100vh;
      width: 100%;
      display: block;
      background: white;
    }
 

  `]
}
)
export class MapChartComponent {

  private map!: L.Map;
  selectedVacancy: WritableSignal<string | undefined> = signal(undefined);
  private vacanciesService = inject(VacanciesService)

  ngOnInit(): void {
    setTimeout(() => {
      this.map = L.map('map').setView([37.600, 11.800], 5.4);

      L.Icon.Default.mergeOptions({
        iconUrl: 'pin.svg',
        // iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
        // shadowUrl: 'assets/leaflet/marker-shadow.png'
      });

      L.tileLayer('https://api.maptiler.com/maps/toner-v2/{z}/{x}/{y}.png?key=1jOv7vouEBSA6GvSet3k', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(this.map);

      this.vacanciesService.$listValue().forEach(
        i => {
          if (!i.geolocation?.lat || !i.geolocation?.lon) { return null; }
          let marker = L.marker([i.geolocation?.lat, i.geolocation?.lon]) // lat, lng
            .addTo(this.map)
          // .bindPopup(`${i.title} at ${i.company}&nbsp; <button (onClick)="openDetail('${i.id}')" >button</button>   <br> <b>${i.location}</b>`)
          //  .openPopup();

          marker.on('click', () => {
            this.selectedVacancy?.set(i.id);
          })
          return null;
        }
      )

      this.map.invalidateSize();
    }, 100);

  }
}
