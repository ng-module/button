import { Component, Directive, Input, ViewEncapsulation, ElementRef } from '@angular/core'
import * as _classNames  from 'classnames';

let classNames = _classNames;

export type ButtonSize = 'small' | 'large';

@Directive({
    selector: '[as-button-group]'
})
export class AsButtonGroupDirective{
    @Input() size: ButtonSize;

    @Input() prefixCls?: string;

    constructor(private el: ElementRef){
        this.prefixCls = "as-btn-group"
    }

    ngOnInit(){
        this.updateClass()
    }

    updateClass = () => {
        const {
            size,
            prefixCls
        } = this;

        const sizeCls = ({
                large: 'lg',
                small: 'sm',
            })[size] || '';

        this.el.nativeElement.className = classNames(prefixCls, {
            [`${prefixCls}-${sizeCls}`]: !!sizeCls,
        });
    }
}

@Component({
    moduleId: module.id,
    selector: '[as-button-group]',
    templateUrl: './button-group.component.html',
    styleUrls: ['./style/button.css'],
    encapsulation: ViewEncapsulation.None,
})
export class AsButtonGroup{}