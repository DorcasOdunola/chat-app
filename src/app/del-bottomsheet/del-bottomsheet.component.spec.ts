import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelBottomsheetComponent } from './del-bottomsheet.component';

describe('DelBottomsheetComponent', () => {
  let component: DelBottomsheetComponent;
  let fixture: ComponentFixture<DelBottomsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelBottomsheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelBottomsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
