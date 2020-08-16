import { Component, Output, EventEmitter } from '@angular/core';
import * as faceapi from 'face-api.js';
import { getFaceDetectorOptions } from '../face-detection.service';
import { LoaderService } from '../loader';

@Component({
	selector: 'webcam-selfie',
	templateUrl: './webcam.component.html',
	styleUrls: ['./webcam.component.scss'],
})
export class WebcamComponent {
	@Output() onImageSelect = new EventEmitter<any>();

	isWebCamOn: boolean = false;
	webcamStream: any;
	webCamWidth: number = 400;
	webCamHeight: number = 0;

	noFaceDetected: boolean = false;

	constructor(private _loader: LoaderService) {}

	getVideoElement() {
		return document.getElementById('video') as HTMLVideoElement;
	}

	getCropBoxElement() {
		return document.getElementById('crop-box') as HTMLElement;
	}

	getImg2Element() {
		return document.getElementById('img2') as HTMLImageElement;
	}

	getCanvas2Element() {
		return document.getElementById('overlay2') as HTMLCanvasElement;
	}

	stopWebCam() {
		const video = this.getVideoElement();
		video.pause();
		video.src = '';
		this.isWebCamOn = false;
		if (this.webcamStream) this.webcamStream.getTracks()[0].stop();
	}

	turnOnWebCam() {
		const img2 = this.getImg2Element();
		img2.src = '';

		this.isWebCamOn = true;
		setTimeout(() => this.setVideoElement());
	}

	setVideoElement() {
		const video = this.getVideoElement();
		const canvas2 = this.getCanvas2Element();

		navigator.mediaDevices
			.getUserMedia({ video: true, audio: false })
			.then((stream) => {
				this.webcamStream = stream;
				video.srcObject = stream;
				video.play();
			})
			.catch((err) => {
				console.log('An error occurred: ' + err);
			});

		let streaming: boolean = false;

		const cropBox = this.getCropBoxElement();
		canvas2.setAttribute('width', cropBox.offsetWidth.toString());
		canvas2.setAttribute('height', cropBox.offsetHeight.toString());

		video.addEventListener(
			'canplay',
			(ev) => {
				if (!streaming) {
					this.webCamHeight =
						video.videoHeight /
						(video.videoWidth / this.webCamWidth);

					// Firefox currently has a bug where the height can't be read from
					// the video, so we will make assumptions if this happens.

					if (isNaN(this.webCamHeight)) {
						this.webCamHeight = this.webCamWidth / (4 / 3);
					}

					video.setAttribute('width', this.webCamWidth.toString());
					video.setAttribute('height', this.webCamHeight.toString());
					streaming = true;
				}
			},
			false,
		);
	}

	async takePicture() {
		const cropBox = this.getCropBoxElement();
		const video = this.getVideoElement();
		const canvas2 = this.getCanvas2Element();
		const context = canvas2.getContext('2d');

		const ratio = video.videoWidth / this.webCamWidth;
		const realWidth = cropBox.offsetWidth * ratio;
		const realHeight = cropBox.offsetHeight * ratio;
		const realOffsetX = (video.videoWidth - realWidth) / 2;
		const realOffsetY = (video.videoHeight - realHeight) / 2;

		context.drawImage(
			video,
			realOffsetX,
			realOffsetY,
			realWidth,
			realHeight,
			0,
			0,
			cropBox.offsetWidth,
			cropBox.offsetHeight,
		);

		const img2 = this.getImg2Element();
		const data = canvas2.toDataURL('image/png');
		img2.setAttribute('src', data);

		this.stopWebCam();

		await this.updateQueryImageResults();
	}

	async updateQueryImageResults() {
		const img2 = this.getImg2Element();
		const canvas2 = this.getCanvas2Element();

		this.noFaceDetected = false;

		const faceDescriptor2 = await faceapi
			.detectSingleFace(img2, getFaceDetectorOptions())
			.withFaceLandmarks()
			.withFaceDescriptor();

		faceapi.matchDimensions(canvas2, img2);

		this.noFaceDetected = !faceDescriptor2;
		if (faceDescriptor2)
			faceapi.draw.drawDetections(
				canvas2,
				faceapi.resizeResults(faceDescriptor2, img2),
			);

		this.onImageSelect.emit({
			descriptor2: faceDescriptor2,
		});
	}
}
