import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationEditFormComponent } from './reservation-edit-form.component';

describe('ReservationEditFormComponent', () => {
  let component: ReservationEditFormComponent;
  let fixture: ComponentFixture<ReservationEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
