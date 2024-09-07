import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmVoteComponent } from './confirm-vote.component';

describe('ConfirmVoteComponent', () => {
  let component: ConfirmVoteComponent;
  let fixture: ComponentFixture<ConfirmVoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmVoteComponent]
    });
    fixture = TestBed.createComponent(ConfirmVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
