import { Component, Output, EventEmitter, Input } from '@angular/core';
import * as faceapi from 'face-api.js';
import { getFaceDetectorOptions } from '../face-detection.service';


@Component({
	selector: 'result-display',
	templateUrl: './result-display.component.html',
	styleUrls: ['./result-display.component.scss'],
})
export class ResultDisplayComponent {
	@Input() matchScore: number;
}
