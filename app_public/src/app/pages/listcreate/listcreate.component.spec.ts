import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcreateComponent } from './listcreate.component';

describe('ListcreateComponent', () => {
  let component: ListcreateComponent;
  let fixture: ComponentFixture<ListcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListcreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
