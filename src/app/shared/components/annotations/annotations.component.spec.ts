import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('AnnotationsComponent', () => {
  let component: AnnotationsComponent;
  let fixture: ComponentFixture<AnnotationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnotationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnnotationsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
