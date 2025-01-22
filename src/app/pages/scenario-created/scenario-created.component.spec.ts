import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioCreatedComponent } from './scenario-created.component';

describe('ScenarioCreatedComponent', () => {
  let component: ScenarioCreatedComponent;
  let fixture: ComponentFixture<ScenarioCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioCreatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
