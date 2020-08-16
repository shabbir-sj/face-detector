import { Component, OnInit } from '@angular/core';
import * as faceapi from 'face-api.js';

import { FaceDetectorService } from './face-detection.service';
import { LoaderService } from './loader';

@Component({
	selector: 'fd-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	matchScore: number;
	faceDescriptor1: any = null;
	faceDescriptor2: any = null;

	constructor(
		private _FaceDetectorService: FaceDetectorService,
		private _loader: LoaderService,
	) {}

	async ngOnInit() {
		try {
			this._loader.show();
			await this._FaceDetectorService.loadFaceDetector();
		} finally {
			this._loader.hide();
		}
	}

	handleImageSelect($event) {
		if ($event && $event.hasOwnProperty('descriptor1'))
			this.faceDescriptor1 = $event.descriptor1;

		if ($event && $event.hasOwnProperty('descriptor2'))
			this.faceDescriptor2 = $event.descriptor2;

		this.updateResult();
	}

	updateResult() {
		if (this.faceDescriptor1 && this.faceDescriptor2) {
			this.matchScore = faceapi.utils.round(
				faceapi.euclideanDistance(
					this.faceDescriptor1.descriptor,
					this.faceDescriptor2.descriptor,
				),
			);
		} else {
			this.matchScore = null;
		}
	}
}
