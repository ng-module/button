import { Component, Directive, HostListener, Input, Output, EventEmitter, SimpleChange, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core'
import * as classNames  from 'classnames'

export type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'small' | 'large';

@Directive({
    selector: "button[as-button]"
})
export class AsButtonDirective {
    private _loading: boolean;
    private clicked: boolean;
    private oldClicked: boolean;
    timeout: any;
    delayTimeout: any;

    constructor(private el: ElementRef) {
        this.prefixCls = "as-btn";
        this.clicked = false;
        this.ghost = false;
        this._loading = false;
    }

    @Input() type: string;

    @Input() htmlType: string;

    @Input() icon: string;

    @Input() shape: ButtonShape;

    @Input() prefixCls: string;

    @Input() size: ButtonSize;

    @Input() loading: boolean;

    @Input() ghost: boolean;

    @Output() onClick = new EventEmitter<Event>();

    @Output() onMouseUp = new EventEmitter<Event>();

    ngOnInit(){
        this.updateClass()
    }
    
    ngOnChange(changes: {[propKey: string]: SimpleChange}){
        const currentLoading = this.loading
        const loading = changes["loading"];

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

    ngDoCheck() {
        if (this.clicked !== this.oldClicked) {
            this.updateClass()
            this.oldClicked = this.clicked
        }
    }

    @HostListener('click') handleClick = (e: Event) => {
        this.clicked = true;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.clicked = false, 500);
        
        const onClick = this.onClick;
        if (onClick) {
            onClick.emit(e)
        }
    }

    @HostListener('mouseup') handleMouseUp = (e: Event) => {
        this.el.nativeElement.blur();
        if (this.onMouseUp) {
            this.onMouseUp.emit(e)
        }
    }

    private updateClass = () =>{
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
        
        this.el.nativeElement.className = classNames(prefixCls, {
            [`${prefixCls}-${type}`]: !!type,
            [`${prefixCls}-${shape}`]: !!shape,
            [`${prefixCls}-${sizeCls}`]: !!sizeCls,
            // [`${prefixCls}-icon-only`]: !children && icon,
            [`${prefixCls}-loading`]: !!this._loading,
            [`${prefixCls}-clicked`]: !!this.clicked,
            [`${prefixCls}-background-ghost`]: !!ghost,
        })
    }
}

@Component({
    moduleId: module.id,
    selector: 'button[as-button]',
    templateUrl: 'button.html',
    styleUrls: ['style/button.css'],
    encapsulation: ViewEncapsulation.None
})
export class AsButton {}
