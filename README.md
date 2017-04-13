Angular 2 bootstrap table
-------------------------

### Install
```bash
npm i -S ng2-bs-table
```
### SystemJS usage
```javascript
paths: {
    // paths serve as alias
    'npm:': 'node_modules/',},
map:{
    'ng2-bs-pagination' : 'npm:ng2-bs-pagination',
    'ng2-bs-table' : 'npm:ng2-bs-table'
},
packages: {
    'ng2-bs-pagination': {
        main: './index.js',
        defaultExtension: 'js'
    },
    'ng2-bs-table': {
        main: './index.js',
        defaultExtension: 'js'
    }
}
```

### Table Selector
- `<table-view></table-view>`

You can create table with any data in a cell. For cell can be used data or any components. To import components you can  
use [imports] and any modules (ExampleModule, check bellow). For filter can be used default input or can be implemented any other
custom filters. Component has many useful events for data management.

### Table Settings   
  * `[collection]` _- Array<any> - (Default: `[]`)_- 
    Data collection of objects
  * `[columns]` _- Array<TableColumnInterface>_ -
    Array of all columns to be displayed and how to format them for ordering    
  * `[filters]` _- Array<TableFilterInterface> - (Default: `[]`)_ -
    Filters for each column. You can implement own filter if you need or use exists.
  * `[actions]` _- TableActionInterface - (Default: `[]`)_ -
    Table actions: For example: view, delete, etc.
  * `[transformers]` _- Array<TableTransformerInterface> - (Default: `[]`)_ -
    Transformers for data.   
  * `[sorting]` _- TableViewSorting_ -
    Which column to sort on and which direction (ascending or descending)    
  * `[imports]` _- Array<any> - (Default: `[]`)_ -
    Any additional Modules for imports.        
  * `[autoPipe]` _- Boolean - (Default: `true`)_ -
    If you set false then all pipes(transformers) will be disabled.        

### TableView Example
```javascript
import {Component, OnInit} from "@angular/core";
import {
    TableViewSorting,
    TableDataColumn,
    TableInputFilter,
    FilterEvent,
    OrderEvent,
    ActionClickEvent,
    TableFilterInterface,
    TableViewComponent,
    TableEmptyAction,
    TableViewAction,
    TableColumnInterface,
    TableActionInterface
} from "ng2-bs-table";
import {StatusColumn} from "./status-column";

@Component({
    moduleId: module.id,
    selector: 'table',
    templateUrl: 'table.component.html'
})
export class TableComponent {
    collection: Array<{}>;

    columns: Array<TableColumnInterface> = [
        new TableDataColumn('Name', 'name', 'text', true),
        new StatusColumn('Type', 'type', true) // Check bellow
    ];

    filters: TableFilterInterface[] = [
        new TableInputFilter('name'),
        new TableInputFilter('type')
    ];

    sorting: TableViewSorting = new TableViewSorting('name', false);

    actions: Array<TableActionInterface> = [
        new TableViewAction('view', 'Edit', null, 'glyphicon glyphicon-pencil'),
        new TableEmptyAction('link', 'Link', null, 'glyphicon glyphicon-remove')
    ];

    onActionClick(event: ActionClickEvent) {
        switch (event.action.name) {
            case 'view':
                break;
            case 'link':
                break;
        }
    }
    
    onCellChange(event: any){
        console.log(event);
    }
    
    onOrder(event: OrderEvent) {
        console.log(event);
    }

    onFilter(event: FilterEvent) {
        console.log(event);
    }

    ngOnInit(): void {
        let collection = [];
        for (let i = 0; i < 1000; i++) {
            collection.push({
                name: i,
                type: 'type ' + i
            });
        }
        this.collection = collection;
    }
}
```

```html
<table-view
        [columns]="columns"
        [filters]="filters"
        [collection]="collection"
        [sorting]="sorting"
        [actions]="actions"
        (order)="onOrder($event)"
        (filter)="onFilter($event)"
        (cellChange)="onCellChange($event)"
        (actionClick)="onActionClick($event)">
    Loading table...
</table-view>
```

### Events (Check dir events with all events objects)
- order
- filter
- cellChange
- actionClick
- pageChange

### Actions
You can use actions:
- TableViewAction _- On click will be called to route_- 
- TableEmptyAction _- On click will be called event_- 
- TableVerifyAction _- On click will be called to route with confirm_- 

### Custom column
You can use any component if you need. For example '<test-component></test-component>'. You should add to "table-view"
in input "imports" some module "SharedModule" with component "TestComponent".

```javascript
import {TableHtmlColumn} from "ng2-bs-table";

export class StatusColumn extends TableHtmlColumn {
    template(data: Object): string {
        // Or set some component "<test-component></test-component>"
        return '<a routerLink="/admin/templates" routerLinkActive="active">{{data.name}} - {{data.type}}</a>';
    }
}
```

### For custom filter you can Use input filter for example. You need implementing:
- TableFilterInterface
- TableFilterInterfacePipe
- TableFilterInterfaceComponent

### ExampleModule
```javascript
import {AnyModule} from 'some-folder';

@NgModule({
    declarations: [ 
        AnyComponent 
    ],
    exports: [
        AnyComponent
    ],
    providers: [
    ]
})
export class ExampleModule {
}
```
```javascript
@Component({
    moduleId: module.id,
    selector: 'test',
    templateUrl: 'test.component.html',
    providers: [PaginationPipe]
})
export class TestComponent{
    ...
    imports = [ ExampleModule ]
    ...
}
```
```html
// Template example
<table-view
        ...
        [imports]="imports"
        ...        
    Loading table...
</table-view>

```

### Todo
- Implement webpack. It does not work yet. 
- DropDown filter.