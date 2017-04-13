import {
    Component,
    Directive,
    NgModule,
    Input,
    Output,
    ViewContainerRef,
    Compiler,
    ComponentFactory,
    ModuleWithComponentFactories,
    ComponentRef,
    EventEmitter,
    ReflectiveInjector
} from '@angular/core';

import {RouterModule}  from '@angular/router';
import {CommonModule} from '@angular/common';
import {TableSharedModule} from "./table-shared.module";
import {FilterEvent} from "./events/filter-event";


export function createComponentFactory(compiler: Compiler, metadata: Component, imports: any[] = []): Promise<ComponentFactory<any>> {
    const cmpClass = class DynamicComponent {

    };

    const decoratedCmp = Component(metadata)(cmpClass);
    @NgModule({imports: Object.assign([CommonModule, RouterModule], imports), declarations: [decoratedCmp]})
    class DynamicHtmlModule {
    }

    return compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
        .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
            return moduleWithComponentFactory.componentFactories.find(x => x.componentType === decoratedCmp);
        });
}

@Directive({selector: 'table-html-outlet'})
export class TableHtmlOutlet {
    @Input() html: string;
    @Input() data: any;
    @Input() imports: any[] = [];
    @Input() columnName: string;

    @Output() cellChange: EventEmitter<any> = new EventEmitter;

    cmpRef: ComponentRef<any>;

    constructor(private vcRef: ViewContainerRef, private compiler: Compiler) {
    }

    ngOnChanges() {
        const html = this.html;
        if (!html) return;

        if (this.cmpRef) {
            this.cmpRef.destroy();
        }

        const compMetadata = new Component({
            selector: 'dynamic-html',
            template: this.html,
        });

        createComponentFactory(this.compiler, compMetadata, this.imports)
            .then(factory => {
                const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
                this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
            }).then(() => {
            this.cmpRef.instance.data = this.data;
            this.cmpRef.instance.columnName = this.columnName;

            // Change cell event
            this.cmpRef.instance.cellChange = this.cellChange;
            this.cmpRef.instance.onCellChange = this.onCellChange;
        });
    }

    ngOnDestroy() {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    }

    onCellChange(event: any) {
        this.cellChange.emit(event);
    }
}

@Directive({selector: 'table-filter-outlet'})
export class TableFilterOutlet {
    @Input() html: string;
    @Input() imports: any[] = [];
    @Input() collection: any;
    @Input() columnName: string;

    @Output() filter: EventEmitter<any> = new EventEmitter;

    cmpRef: ComponentRef<any>;

    constructor(private vcRef: ViewContainerRef, private compiler: Compiler) {
    }

    ngOnChanges() {
        const html = this.html;
        if (!html) return;

        if (this.cmpRef) {
            this.cmpRef.destroy();
        }

        const compMetadata = new Component({
            selector: 'dynamic-html',
            template: this.html,
        });

        createComponentFactory(this.compiler, compMetadata, this.imports)
            .then(factory => {
                const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
                this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
            }).then(() => {
            this.cmpRef.instance.collection = this.collection;
            this.cmpRef.instance.columnName = this.columnName;

            // Filter event
            this.cmpRef.instance.filter = this.filter;
            this.cmpRef.instance.onFilter = this.onFilter;
        });
    }

    ngOnDestroy() {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    }

    onFilter(event: FilterEvent) {
        this.filter.emit(event);
    }
}