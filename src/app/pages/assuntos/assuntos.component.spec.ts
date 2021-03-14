import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuntosComponent } from './assuntos.component';

describe('ConfiguracaoComponent', () => {
  let component: AssuntosComponent;
  let fixture: ComponentFixture<AssuntosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssuntosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
