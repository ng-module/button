import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsButton, AsButtonStyle } from './button'
import { AsButtonGroup } from './button-group'

@NgModule({
    imports: [ CommonModule ],
    exports: [ AsButton, AsButtonStyle, AsButtonGroup ],
    declarations: [ AsButton, AsButtonStyle,  AsButtonGroup,  ]
})

export class AsButtonModule {}