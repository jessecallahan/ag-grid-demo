import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry, SelectEditorModule, ValidationModule } from 'ag-grid-community';
import { AutocompleteSelectCellEditor } from "ag-grid-autocomplete-editor";
import 'ag-grid-autocomplete-editor/dist/main.css';
import { CustomEditorModule } from 'ag-grid-community';

// Row Data Interface
interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SelectEditorModule,
  CustomEditorModule,
  ValidationModule /* Development Only */,]);
@Component({
  selector: 'app-root',
  imports: [AgGridAngular],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  govs = [
    { label: '(1111) Tacoma', value: '1111' },
    { label: '(0000) Seattle', value: '0000' },
    { label: '(5555) Olympia', value: '5555' },
  ]

  dataToChange = [
    { population: 500, gov: '1111' },
    { population: 200, gov: '0000' },
    { population: 3000, gov: '0000' },
  ]
  public columnDefs: ColDef[] = [
    {
      field: 'population'
    },
    {
      headerName: "Government",
      field: "gov",
      cellEditor: AutocompleteSelectCellEditor,
      cellEditorParams: {
        selectData: this.govs,
      },
      valueFormatter: (params) => {
        return this.govs.find(g => g.value === params.value)?.label ?? '';
      },
      valueGetter: params => {
        return params.data.gov;
      },
      valueSetter: params => {
        params.data.gov = params.newValue.value;
        return true;
      },
      editable: true,
    },
    // {
    //   headerName: "Government",
    //   field: "gov",
    //   cellEditor: 'agSelectCellEditor',
    //   cellEditorParams: {
    //     values: this.govs.map((d) => d.label),
    //   },
    //   valueFormatter: (params) => {
    //     return this.govs.find(g => g.value === params.value)?.label ?? '';
    //   },
    //   valueGetter: params => {
    //     return params.data.gov;
    //   },
    //   valueSetter: params => {
    //     console.log(params);
    //     params.data.gov = params.newValue;
    //     return true;
    //   },
    //   editable: true,
    // }
  ];
}



