import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDescriptionComponent } from './user-description.component';

describe('UserDescriptionComponent', () => {
  let component: UserDescriptionComponent;
  let fixture: ComponentFixture<UserDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
