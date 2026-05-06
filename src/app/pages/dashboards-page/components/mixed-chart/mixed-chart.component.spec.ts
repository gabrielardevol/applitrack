import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedChartComponent } from './mixed-chart.component';

describe('MixedChartComponent', () => {
  let component: MixedChartComponent;
  let fixture: ComponentFixture<MixedChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixedChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MixedChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
