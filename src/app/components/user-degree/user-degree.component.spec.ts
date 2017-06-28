import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDegreeComponent } from './user-degree.component';

describe('UserDegreeComponent', () => {
  let component: UserDegreeComponent;
  let fixture: ComponentFixture<UserDegreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDegreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
