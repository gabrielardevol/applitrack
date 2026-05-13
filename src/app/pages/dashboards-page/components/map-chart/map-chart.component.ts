import { AfterViewInit, Component, inject } from '@angular/core';
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
      height: 400px;
      width: 100%;
      display: block;
    }
.leaflet-marker-shadow ,.leaflet-zoom-animated {
  display: none!important; opacity: 0!important;
}
  `]
}
)
export class MapChartComponent {

  vacancyId?: string;
  private map!: L.Map;

  private vacanciesService = inject(VacanciesService)

  ngOnInit(): void {
    console.log('?', document.getElementById('map')?.clientHeight);
    console.log('??', this.map);
    setTimeout(() => {
      this.map = L.map('map').setView([41.053, 0.489], 13);

      // L.Icon.Default.mergeOptions({
      //   iconUrl: 'favicon.ico',
      //   iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      //   shadowUrl: 'assets/leaflet/marker-shadow.png'
      // });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(this.map);

      this.vacanciesService.$listValue().forEach(
        i => {
          console.log('holaaa', i.geolocation?.lat, i.geolocation?.lon)
          if (!i.geolocation?.lat || !i.geolocation?.lon) { return null; }
          let marker = L.marker([i.geolocation?.lat, i.geolocation?.lon]) // lat, lng
            .addTo(this.map)
            .bindPopup(`${i.title} at ${i.company}&nbsp; <button (onClick)="openDetail('${i.id}')" >button</button>   <br> <b>${i.location}</b>`)
          // .openPopup();

          marker.on('click', () => {
            this.vacancyId = i.id
            //aqui hauria de poder fer new ClassName() i que automàticament això mostrés un popup
          })
          return null;
        }
      )

      this.map.invalidateSize();
    }, 100);

  }

  onMarkerClick(id: string) {
    console.log(id);
  }
}
