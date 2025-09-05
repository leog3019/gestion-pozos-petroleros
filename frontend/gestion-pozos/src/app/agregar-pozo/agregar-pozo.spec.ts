import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPozo } from './agregar-pozo.component';

describe('AgregarPozo', () => {
  let component: AgregarPozo;
  let fixture: ComponentFixture<AgregarPozo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarPozo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarPozo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
