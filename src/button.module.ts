import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsButton, AsButtonDirective } from './button.component'
import { AsButtonGroup, AsButtonGroupDirective } from './button-group.component'

@NgModule({
    imports: [ CommonModule ],
    exports: [ AsButton, AsButtonDirective, AsButtonGroup, AsButtonGroupDirective ],
    declarations: [ AsButton, AsButtonDirective,  AsButtonGroup, AsButtonGroupDirective ]
})

export class AsButtonModule {}
