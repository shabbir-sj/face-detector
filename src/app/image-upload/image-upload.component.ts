import { Component, Output, EventEmitter } from '@angular/core';
import * as faceapi from 'face-api.js';
import { getFaceDetectorOptions } from '../face-detection.service';
import { LoaderService } from '../loader';

@Component({
	selector: 'img-upload',
	templateUrl: './image-upload.component.html',
	styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent {
	@Output() onImageSelect = new EventEmitter<any>();

	hasImg: boolean = false;
	noFaceDetected: boolean = false;

	constructor(private _loader: LoaderService) {}

	getImg1Element() {
		return document.getElementById('img1') as HTMLImageElement;
	}

	getCanvas1Element() {
		return document.getElementById('overlay1') as HTMLCanvasElement;
	}

	getRefUploadInput() {
		return document.getElementById('refImgUploadInput') as HTMLInputElement;
	}

	async uploadRefImage() {
		try {
			this._loader.show();
			const imgFile = this.getRefUploadInput();
			const imgEle = this.getImg1Element();
			const img = await faceapi.bufferToImage(imgFile.files[0]);
			imgEle.src = img.src;

			this.hasImg = true;
			setTimeout(async () => {
				const canvas1 = this.getCanvas1Element();
				canvas1.setAttribute('width', imgEle.clientWidth.toString());
				canvas1.setAttribute('height', imgEle.clientHeight.toString());

				await this.updateReferenceImageResults();
			});
		} finally {
			this._loader.hide();
		}
	}

	async updateReferenceImageResults() {
		const img1 = this.getImg1Element();
		const canvas1 = this.getCanvas1Element();

		this.noFaceDetected = false;

		const faceDescriptor1 = await faceapi
			.detectSingleFace(img1, getFaceDetectorOptions())
			.withFaceLandmarks()
			.withFaceDescriptor();

		faceapi.matchDimensions(canvas1, img1);

		this.noFaceDetected = !faceDescriptor1;
		if (faceDescriptor1)
			faceapi.draw.drawDetections(
				canvas1,
				faceapi.resizeResults(faceDescriptor1, img1),
			);

		this.onImageSelect.emit({
			descriptor1: faceDescriptor1,
		});
	}
}
