import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStylesComponent } from './edit-styles.component';

describe('EditStylesComponent', () => {
  let component: EditStylesComponent;
  let fixture: ComponentFixture<EditStylesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStylesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
