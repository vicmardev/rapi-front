import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareSkullComponent } from './share-skull.component';

describe('ShareSkullComponent', () => {
  let component: ShareSkullComponent;
  let fixture: ComponentFixture<ShareSkullComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareSkullComponent]
    });
    fixture = TestBed.createComponent(ShareSkullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
