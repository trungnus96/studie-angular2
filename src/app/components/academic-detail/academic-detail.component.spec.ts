import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicDetailComponent } from './academic-detail.component';

describe('AcademicDetailComponent', () => {
  let component: AcademicDetailComponent;
  let fixture: ComponentFixture<AcademicDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
