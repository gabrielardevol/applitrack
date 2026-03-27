import { Routes } from '@angular/router';
import { BasePageComponent } from './base-page/base-page.component';
import { ContactsPage } from './contacts-page/contacts-page';
import { DashboardsPage } from './dashboards-page/dashboards-page';
import { OffersPage } from './offers-page/offers-page';
import { TipsPage } from './tips-page/tips-page';
import { RoutinePage } from './routine-page/routine-page';

export const routes: Routes = [
    {
        path: '',
        component: BasePageComponent,
        children: [
            {
                path: 'contacts',
                component: ContactsPage
            },
            {
                path: 'dashboard',
                component: DashboardsPage
            },
            {
                path: 'offers',
                component: OffersPage
            },
            {
                path: 'tips',
                component: TipsPage
            },
            {
                path: 'routine',
                component: RoutinePage
            }
        ]
    }
];
