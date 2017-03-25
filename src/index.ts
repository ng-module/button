import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsButton } from './button'

@NgModule({
    imports: [ CommonModule ],
    exports: [ AsButton],
    declarations: [ AsButton ]
})

export class AsButtonModule {}