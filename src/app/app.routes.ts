import { Routes } from '@angular/router';
import { ContactsPage } from './pages/contacts-page/contacts-page';
import { DashboardsPage } from './pages/dashboards-page/dashboards-page';
import { TipsPage } from './pages/tips-page/tips-page';
import { RoutinePage } from './pages/routine-page/routine-page';
import { BaseLayoutComponent } from './shared/base-page/base-layout.component';
import { VacanciesPage } from './vacancies/vacancies.page';
import { CalendarPage } from './pages/calendar/calendar.page';

export const routes: Routes = [
    {
        path: '',
        component: BaseLayoutComponent,
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
                path: 'vacancies',
                component: VacanciesPage
            },
            {
                path: 'tips',
                component: TipsPage
            },
            {
                path: 'routine',
                component: RoutinePage
            },
            {
                path: 'calendar',
                component: CalendarPage
            }
        ]
    }
];
