import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicOverviewComponent } from './academic-overview.component';

describe('AcademicOverviewComponent', () => {
  let component: AcademicOverviewComponent;
  let fixture: ComponentFixture<AcademicOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
