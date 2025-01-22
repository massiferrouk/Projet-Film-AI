import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseIaComponent } from './response-ia.component';

describe('ResponseIaComponent', () => {
  let component: ResponseIaComponent;
  let fixture: ComponentFixture<ResponseIaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseIaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
