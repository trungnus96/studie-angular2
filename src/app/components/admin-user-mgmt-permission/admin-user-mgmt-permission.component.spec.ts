import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserMgmtPermissionComponent } from './admin-user-mgmt-permission.component';

describe('AdminUserMgmtPermissionComponent', () => {
  let component: AdminUserMgmtPermissionComponent;
  let fixture: ComponentFixture<AdminUserMgmtPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserMgmtPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserMgmtPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
