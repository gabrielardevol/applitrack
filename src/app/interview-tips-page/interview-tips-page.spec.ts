import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewTipsPage } from './interview-tips-page';

describe('InterviewTipsPage', () => {
  let component: InterviewTipsPage;
  let fixture: ComponentFixture<InterviewTipsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewTipsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(InterviewTipsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
