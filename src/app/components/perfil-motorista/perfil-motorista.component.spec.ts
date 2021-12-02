import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMotoristaComponent } from './perfil-motorista.component';

describe('PerfilMotoristaComponent', () => {
  let component: PerfilMotoristaComponent;
  let fixture: ComponentFixture<PerfilMotoristaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilMotoristaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilMotoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
