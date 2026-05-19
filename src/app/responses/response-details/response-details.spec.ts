import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseDetails } from './response-details';

describe('ResponseDetails', () => {
  let component: ResponseDetails;
  let fixture: ComponentFixture<ResponseDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ResponseDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
