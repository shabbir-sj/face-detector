import { Injectable } from '@angular/core';
import * as faceapi from 'face-api.js';

const SSD_MOBILENETV1: string = 'ssd_mobilenetv1';
const TINY_FACE_DETECTOR: string = 'tiny_face_detector';

const selectedFaceDetector = SSD_MOBILENETV1;

// ssd_mobilenetv1 options
const minConfidence = 0.5;

// tiny_face_detector options
const inputSize = 512;
const scoreThreshold = 0.5;

export function getFaceDetectorOptions() {
	return selectedFaceDetector === SSD_MOBILENETV1
		? new faceapi.SsdMobilenetv1Options({ minConfidence })
		: new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold });
}

function getCurrentFaceDetectionNet() {
	if (selectedFaceDetector === SSD_MOBILENETV1) {
		return faceapi.nets.ssdMobilenetv1;
	}
	if (selectedFaceDetector === TINY_FACE_DETECTOR) {
		return faceapi.nets.tinyFaceDetector;
	}
}

@Injectable()
export class FaceDetectorService {
	isFaceDetectionModelLoaded() {
		return !!getCurrentFaceDetectionNet().params;
	}

	async loadFaceDetector() {
		if (!this.isFaceDetectionModelLoaded()) {
			await getCurrentFaceDetectionNet().load(
				'/face-detector/assets/weights/',
			);
			await faceapi.loadFaceLandmarkModel(
				'/face-detector/assets/weights/',
			);
			await faceapi.loadFaceRecognitionModel(
				'/face-detector/assets/weights/',
			);
		}
	}
}
