import { Component, Input, ViewEncapsulation } from '@angular/core'
import * as classNames from 'classnames'

export type ButtonSize = 'small' | 'large';

@Component({
    moduleId: module.id,
    selector: 'as-button-group',
    templateUrl: 'button-group.html',
    styleUrls: ['style/button.css'],
    encapsulation: ViewEncapsulation.None,
})
export class AsButtonGroup{
    private classes: any

    @Input() size: ButtonSize

    @Input() prefixCls?: string

    constructor(){
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

        this.classes = classNames(prefixCls, {
            [`${prefixCls}-${sizeCls}`]: !!sizeCls,
        });
    }
}