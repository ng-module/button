import { Component, Input } from '@angular/core'
import * as classNames  from 'classnames'

export type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'small' | 'large';

@Component({
    moduleId: module.id,
    selector: 'as-button',
    templateUrl: 'button.html',
    styleUrls: ['button.less']
})
export class AsButton {
    private classes: any

    @Input()
    type: string

    @Input()
    htmlType: string

    @Input()
    icon: string

    @Input()
    shape: ButtonShape

    @Input()
    prefixCls: string

    @Input()
    size: ButtonSize

    @Input()
    loading: boolean

    @Input()
    ghost: boolean

    constructor(){
        this.prefixCls = "as"
    }

    ngOnChanges(){
        const { 
            type,
            htmlType,
            icon,
            shape,
            prefixCls,
            size,
            loading,
            ghost
        } = this

        const sizeCls =  ({
            large: 'lg',
            small: 'sm',
        })[size] || '';
        
        this.classes = classNames(prefixCls,{
            [`${prefixCls}-${type}`]: Boolean(type),
            [`${prefixCls}-${shape}`]: Boolean(shape),
            [`${prefixCls}-${sizeCls}`]: Boolean(sizeCls),
            // [`${prefixCls}-icon-only`]: !children && icon,
            [`${prefixCls}-loading`]: Boolean(loading),
            // [`${prefixCls}-clicked`]: clicked,
            [`${prefixCls}-background-ghost`]: Boolean(ghost),
        })
    }

}