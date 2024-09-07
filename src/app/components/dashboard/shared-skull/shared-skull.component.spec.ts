import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSkullComponent } from './shared-skull.component';

describe('SharedSkullComponent', () => {
  let component: SharedSkullComponent;
  let fixture: ComponentFixture<SharedSkullComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedSkullComponent]
    });
    fixture = TestBed.createComponent(SharedSkullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
