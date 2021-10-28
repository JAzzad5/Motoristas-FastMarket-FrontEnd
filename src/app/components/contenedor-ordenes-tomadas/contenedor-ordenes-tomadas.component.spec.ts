import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorOrdenesTomadasComponent } from './contenedor-ordenes-tomadas.component';

describe('ContenedorOrdenesTomadasComponent', () => {
  let component: ContenedorOrdenesTomadasComponent;
  let fixture: ComponentFixture<ContenedorOrdenesTomadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorOrdenesTomadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorOrdenesTomadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
