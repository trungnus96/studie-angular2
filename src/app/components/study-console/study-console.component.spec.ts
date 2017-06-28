import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyConsoleComponent } from './study-console.component';

describe('StudyConsoleComponent', () => {
  let component: StudyConsoleComponent;
  let fixture: ComponentFixture<StudyConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
