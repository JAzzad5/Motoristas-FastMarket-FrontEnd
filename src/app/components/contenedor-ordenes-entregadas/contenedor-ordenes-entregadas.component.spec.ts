import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorOrdenesEntregadasComponent } from './contenedor-ordenes-entregadas.component';

describe('ContenedorOrdenesEntregadasComponent', () => {
  let component: ContenedorOrdenesEntregadasComponent;
  let fixture: ComponentFixture<ContenedorOrdenesEntregadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorOrdenesEntregadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorOrdenesEntregadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
