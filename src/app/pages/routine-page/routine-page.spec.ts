import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutinePage } from './routine-page';

describe('RoutinePage', () => {
  let component: RoutinePage;
  let fixture: ComponentFixture<RoutinePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutinePage],
    }).compileComponents();

    fixture = TestBed.createComponent(RoutinePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
