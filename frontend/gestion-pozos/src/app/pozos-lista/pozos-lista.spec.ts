import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PozosLista } from './pozos-lista.component';

describe('PozosLista', () => {
  let component: PozosLista;
  let fixture: ComponentFixture<PozosLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PozosLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PozosLista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
