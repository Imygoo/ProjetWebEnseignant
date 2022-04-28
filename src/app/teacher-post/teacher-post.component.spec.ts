import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPostComponent } from './teacher-post.component';

describe('TeacherPostComponent', () => {
  let component: TeacherPostComponent;
  let fixture: ComponentFixture<TeacherPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
