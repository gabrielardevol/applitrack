import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyDetail } from './vacancy-detail';

describe('VacancyDetail', () => {
  let component: VacancyDetail;
  let fixture: ComponentFixture<VacancyDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacancyDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(VacancyDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
