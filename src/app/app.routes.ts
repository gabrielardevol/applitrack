import { Routes } from '@angular/router';
import { PageLayout } from './page-layout/page-layout';

export const routes: Routes = [
    {
        path: '',
        component: PageLayout,
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
