import { Component } from '@angular/core';
import { RouterOutlet } from "../../../node_modules/@angular/router/types/_router_module-chunk";

@Component({
  selector: 'app-base',
  imports: [RouterOutlet],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent { }
