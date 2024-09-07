import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSkullComponent } from './create-skull.component';

describe('CreateSkullComponent', () => {
  let component: CreateSkullComponent;
  let fixture: ComponentFixture<CreateSkullComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSkullComponent]
    });
    fixture = TestBed.createComponent(CreateSkullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
