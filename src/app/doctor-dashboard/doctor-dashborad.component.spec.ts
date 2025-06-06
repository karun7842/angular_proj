import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDashboardComponent } from './doctor-dashboard.component';

describe('DoctorDashboradComponent', () => {
  let component: DoctorDashboardComponent;
  let fixture: ComponentFixture<DoctorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
