import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const DEFAULT_LOADER = 'global';

@Injectable()
export class LoaderService {
	private _loader = new BehaviorSubject<boolean>(false);

	get loader() {
		return this._loader;
	}

	show() {
		this._loader.next(true);
	}

	hide(indicatorId: string = DEFAULT_LOADER) {
		this._loader.next(false);
	}
}
