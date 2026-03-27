import { Routes } from '@angular/router';
import { BasePageComponent } from './base-page/base-page.component';

export const routes: Routes = [
    {
        path: '',
        component: BasePageComponent,
        children: [
            // {
            //     path: '',
            //     component: HomeComponent
            // },
            //             {
            //     path: 'contact',
            //     component: ContactComponent
            // }
        ]
    }
];
