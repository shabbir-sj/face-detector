import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
	selector: 'fd-loader',
	template: `
		<ng-template [ngIf]="isVisible | async">
			<span *ngIf="template; else loader">
				<ng-content></ng-content>
			</span>
			<ng-template #loader>
				<div class="loader" *ngIf="!template">
					<div class="lds-spinner">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			</ng-template>
			<div class="overlay" *ngIf="ovrelay"></div>
		</ng-template>
	`,
	styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
	@Input() id: string;
	@Input() template: boolean = false;
	@Input() ovrelay: boolean = true;

	isVisible: BehaviorSubject<boolean>;
	constructor(private _loaderService: LoaderService) {}

	ngOnInit() {
		this.isVisible = this._loaderService.loader;
	}
}
