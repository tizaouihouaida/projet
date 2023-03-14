import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemotComponent } from './remot.component';

describe('RemotComponent', () => {
  let component: RemotComponent;
  let fixture: ComponentFixture<RemotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
