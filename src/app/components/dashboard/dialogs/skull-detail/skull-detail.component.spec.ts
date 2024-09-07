import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkullDetailComponent } from './skull-detail.component';

describe('SkullDetailComponent', () => {
  let component: SkullDetailComponent;
  let fixture: ComponentFixture<SkullDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkullDetailComponent]
    });
    fixture = TestBed.createComponent(SkullDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
