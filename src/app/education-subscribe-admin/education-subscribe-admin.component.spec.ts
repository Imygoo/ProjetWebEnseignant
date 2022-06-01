import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationSubscribeAdminComponent } from './education-subscribe-admin.component';

describe('EducationSubscribeAdminComponent', () => {
  let component: EducationSubscribeAdminComponent;
  let fixture: ComponentFixture<EducationSubscribeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationSubscribeAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationSubscribeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
