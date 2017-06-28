import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserMgmtProfileComponent } from './admin-user-mgmt-profile.component';

describe('AdminUserMgmtProfileComponent', () => {
  let component: AdminUserMgmtProfileComponent;
  let fixture: ComponentFixture<AdminUserMgmtProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserMgmtProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserMgmtProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
