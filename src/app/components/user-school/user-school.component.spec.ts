import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSchoolComponent } from './user-school.component';

describe('UserSchoolComponent', () => {
  let component: UserSchoolComponent;
  let fixture: ComponentFixture<UserSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
