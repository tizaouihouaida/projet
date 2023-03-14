import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoteComponent } from './add-remote.component';

describe('AddRemoteComponent', () => {
  let component: AddRemoteComponent;
  let fixture: ComponentFixture<AddRemoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRemoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
