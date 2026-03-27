import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchesRegistryPage } from './searches-registry-page';

describe('SearchesRegistryPage', () => {
  let component: SearchesRegistryPage;
  let fixture: ComponentFixture<SearchesRegistryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchesRegistryPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchesRegistryPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
