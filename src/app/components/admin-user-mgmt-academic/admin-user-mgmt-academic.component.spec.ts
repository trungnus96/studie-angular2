import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserMgmtAcademicComponent } from './admin-user-mgmt-academic.component';

describe('AdminUserMgmtAcademicComponent', () => {
  let component: AdminUserMgmtAcademicComponent;
  let fixture: ComponentFixture<AdminUserMgmtAcademicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserMgmtAcademicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserMgmtAcademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
