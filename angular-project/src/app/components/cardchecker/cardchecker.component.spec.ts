import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardcheckerComponent } from './cardchecker.component';

describe('CardcheckerComponent', () => {
  let component: CardcheckerComponent;
  let fixture: ComponentFixture<CardcheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardcheckerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardcheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
