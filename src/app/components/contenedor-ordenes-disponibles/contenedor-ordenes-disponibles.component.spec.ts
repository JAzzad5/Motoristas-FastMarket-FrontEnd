import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorOrdenesDisponiblesComponent } from './contenedor-ordenes-disponibles.component';

describe('ContenedorOrdenesDisponiblesComponent', () => {
  let component: ContenedorOrdenesDisponiblesComponent;
  let fixture: ComponentFixture<ContenedorOrdenesDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorOrdenesDisponiblesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorOrdenesDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
