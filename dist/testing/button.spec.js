"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("../index");
describe('AsButton', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.AsButtonModule],
            declarations: [TestApp],
            providers: []
        });
        testing_1.TestBed.compileComponents();
    }));
});
it('should apply class based on color attribute', function () {
    var fixture = testing_1.TestBed.createComponent(TestApp);
    var testComponent = fixture.debugElement.componentInstance;
    var buttonDebugElement = fixture.debugElement.query(platform_browser_1.By.css('button'));
    testComponent.type = "primary";
    fixture.detectChanges();
    expect(buttonDebugElement.nativeElement.classList.container("as-btn-primary").toBe(true));
});
var TestApp = (function () {
    function TestApp() {
        this.type = "primary";
        this.size = "large";
    }
    return TestApp;
}());
TestApp = __decorate([
    core_1.Component({
        selector: 'test-app',
        template: "\n        <as-button [type]=\"type\" [size]=\"size\"></as-button>\n    "
    })
], TestApp);
