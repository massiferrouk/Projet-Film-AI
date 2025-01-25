import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioCreated2Component } from './scenario-created2.component';

describe('ScenarioCreated2Component', () => {
  let component: ScenarioCreated2Component;
  let fixture: ComponentFixture<ScenarioCreated2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioCreated2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioCreated2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
