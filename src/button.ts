import { Component, Input, Output, EventEmitter, SimpleChange } from '@angular/core'
import * as classNames  from 'classnames'

export type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'small' | 'large';

@Component({
    moduleId: module.id,
    selector: 'as-button',
    templateUrl: 'button.html',
    styleUrls: ['style/button.css']
})
export class AsButton {
    private classes: any;
    private _loading: boolean;
    private clicked: boolean;
    timeout: any;
    delayTimeout: any;

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

    @Output()
    onClick = new EventEmitter<Event>();

    constructor(){
        this.prefixCls = "as-btn";
        this.clicked = false;
        this.ghost = false;
        this._loading = false;
    }

    ngOnInit(){
        const { 
            type,
            htmlType,
            icon,
            shape,
            prefixCls,
            size,
            ghost
        } = this

        const sizeCls =  ({
            large: 'lg',
            small: 'sm',
        })[size] || '';
        
        this.classes = classNames(prefixCls, {
            [`${prefixCls}-${type}`]: Boolean(type),
            [`${prefixCls}-${shape}`]: Boolean(shape),
            [`${prefixCls}-${sizeCls}`]: Boolean(sizeCls),
            // [`${prefixCls}-icon-only`]: !children && icon,
            [`${prefixCls}-loading`]: Boolean(this._loading),
            [`${prefixCls}-clicked`]: Boolean(this.clicked),
            [`${prefixCls}-background-ghost`]: Boolean(ghost),
        })
    }

    ngOnChange(changes: {[propKey: string]: SimpleChange}){
        const currentLoading = this.loading
        const loading = changes.loading;

        if (currentLoading) {
            clearTimeout(this.delayTimeout);
        }

        if (loading){
            this.delayTimeout = setTimeout(() => {
                this._loading = !!loading
            })
        } else {
            this._loading = !!loading
        }
    }

    handleClick(e: Event){
        this.clicked = true;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.clicked = false, 500);
        
        const onClick = this.onClick;
        if (onClick) {
            onClick.emit(e)
        }
    }

    handleMouseUp(e: Event) {
        
    }
}