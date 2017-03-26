import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AsButtonModule } from '../index'

describe('AsButton', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AsButtonModule],
            declarations: [TestApp],
            providers:[]
        })

        TestBed.compileComponents();
    }))
})

it('should apply class based on color attribute', () => {
    let fixture = TestBed.createComponent(TestApp);

    let testComponent = fixture.debugElement.componentInstance;
    let buttonDebugElement = fixture.debugElement.query(By.css('button'))

    testComponent.type = "primary";
    fixture.detectChanges();
    expect(buttonDebugElement.nativeElement.classList.container("as-btn-primary").toBe(true))
})

@Component({
    selector: 'test-app',
    template: `
        <as-button [type]="type" [size]="size"></as-button>
    `
})
class TestApp {
    type: string = "primary";
    size: string = "large"
}