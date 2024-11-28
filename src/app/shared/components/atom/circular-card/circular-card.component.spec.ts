import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularCardComponent } from './circular-card.component';

describe('CircularCardComponent', () => {
  let component: CircularCardComponent;
  let fixture: ComponentFixture<CircularCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircularCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircularCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
