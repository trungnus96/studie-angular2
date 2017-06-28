import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserMgmtAcademicDetailComponent } from './admin-user-mgmt-academic-detail.component';

describe('AdminUserMgmtAcademicDetailComponent', () => {
  let component: AdminUserMgmtAcademicDetailComponent;
  let fixture: ComponentFixture<AdminUserMgmtAcademicDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserMgmtAcademicDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserMgmtAcademicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
