import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacanciesPage } from './vacancies.page';

describe('VacanciesPage', () => {
  let component: VacanciesPage;
  let fixture: ComponentFixture<VacanciesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacanciesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(VacanciesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
