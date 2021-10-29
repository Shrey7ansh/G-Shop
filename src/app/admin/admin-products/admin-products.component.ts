import { Product } from './../../models/Product';
import { OnInit, OnDestroy } from "@angular/core";
import { ProductService } from './../../product.service';
import { Subscription } from "rxjs";
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: "app-admin-products",
	templateUrl: "./admin-products.component.html",
	styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements  OnInit, OnDestroy {
	products: Product[];
	filteredProducts: any[];
	subscription: Subscription;
	displayedColumns: string[] = ['title', 'price','edit'];
    dataSource: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

	constructor(private productService: ProductService) {
		this.subscription = this.productService
			.getAll()
			.subscribe(products => {
				this.filteredProducts = this.products = products
				this.dataSource = new MatTableDataSource(this.filteredProducts);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			});		
	}
 
	ngOnInit(): void {
		
	}
	
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	
		if (this.dataSource.paginator) {
		  this.dataSource.paginator.firstPage();
    	}
    }

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

