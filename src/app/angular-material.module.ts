import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';

const materialModules = [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule
  ];

  @NgModule({
    imports: [
      CommonModule,
      ...materialModules,
      
    ],
   
    exports: [
      ...materialModules
    ],
  })
  export class AngularMaterialModule { }