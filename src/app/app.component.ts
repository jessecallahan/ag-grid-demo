import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry, SelectEditorModule, ValidationModule } from 'ag-grid-community';

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
  ValidationModule /* Development Only */,]);
@Component({
  selector: 'app-root',
  imports: [AgGridAngular],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      headerName: "Select Editor",
      field: "government",
      cellRenderer: (p: any) => {

        return `(${p.data.language.mcag}) hello`;
      },
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: languages,
        cellRenderer: (p: any) => {
          console.log(p);
          return `hello`;
        },

      },
    },
  ];
  public defaultColDef: ColDef = {
    width: 200,
    editable: true,
  };
  public rowData: any[] | null = new Array(100)
    .fill(null)
    .map(() => ({ language: languages[getRandomNumber(0, 2)] }));
}

const languages = [{mcag: '1200'}, {mcag: '1300'}];
function getRandomNumber(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

