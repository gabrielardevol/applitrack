import { Routes } from '@angular/router';
import { BasePageComponent } from './base-page/base-page.component';
import { ContactsPage } from './pages/contacts-page/contacts-page';
import { DashboardsPage } from './pages/dashboards-page/dashboards-page';
import { OffersPage } from './pages/offers-page/offers-page';
import { TipsPage } from './pages/tips-page/tips-page';
import { RoutinePage } from './pages/routine-page/routine-page';

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
