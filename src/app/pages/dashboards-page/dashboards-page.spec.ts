import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsPage } from './dashboards-page';

describe('DashboardsPage', () => {
  let component: DashboardsPage;
  let fixture: ComponentFixture<DashboardsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
