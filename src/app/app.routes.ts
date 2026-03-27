import { Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';

export const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
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
