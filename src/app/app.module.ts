/**
 * @license
 * Copyright Shabbir Hussain. All Rights Reserved.
 */

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { LoaderModule } from './loader';
import { FaceDetectorService } from './face-detection.service';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { WebcamComponent } from './webcam/webcam.component';
import { ResultDisplayComponent } from './result-display/result-display.component';


@NgModule({
	declarations: [
		AppComponent,
		WebcamComponent,
		ImageUploadComponent,
		ResultDisplayComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CommonModule,
		HttpClientModule,
		LoaderModule,
	],
	entryComponents: [],
	bootstrap: [AppComponent],
	providers: [
		FaceDetectorService,
	],
})
export class AppModule {}
