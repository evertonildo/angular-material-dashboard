import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgMensagemComponent } from './dlg-mensagem.component';

describe('DlgMensagemComponent', () => {
  let component: DlgMensagemComponent;
  let fixture: ComponentFixture<DlgMensagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgMensagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
