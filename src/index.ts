import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdButton } from './button'

@NgModule({
    imports: [ CommonModule ],
    exports: [ AdButton],
    declarations: [ AdButton ]
})

export class AdButtonModule {}