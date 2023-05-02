import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRideComponent } from './select-ride.component';

describe('SelectRideComponent', () => {
  let component: SelectRideComponent;
  let fixture: ComponentFixture<SelectRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectRideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
