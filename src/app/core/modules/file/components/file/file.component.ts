import { CommonModule } from '@angular/common';
import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
	inject
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService, ModalService } from 'wacom';
import { FileCropperComponent } from '../file-cropper/file-cropper.component';
import { FileService } from './../../services/file.service';

/**
 * The FileComponent is responsible for handling file uploads, primarily images,
 * but can also handle other file types. It includes options for cropping and
 * multiple file uploads.
 */
@Component({
	selector: 'ngx-file',
	templateUrl: './file.component.html',
	styleUrls: ['./file.component.scss'],
	standalone: true,
	imports: [CommonModule]
})
export class FileComponent implements OnInit, OnChanges {
	private _modal = inject(ModalService);
	private _http = inject(HttpService);
	private _fs = inject(FileService);

	readonly url = environment.url;

	/**
	 * The container where the file will be stored (default: 'general').
	 */
	@Input() container = 'general';

	/**
	 * The name of the file.
	 */
	@Input() name = '';

	/**
	 * Error message for handling errors.
	 */
	@Input() err = '';

	/**
	 * Label for the file input.
	 */
	@Input() label = '';

	/**
	 * Custom CSS class for styling.
	 */
	@Input() class = '';

	/**
	 * Style object for the image.
	 */
	@Input() imgStyle = {};

	/**
	 * Whether multiple files can be uploaded.
	 */
	@Input() multiple = false;

	/**
	 * Whether the file is a photo.
	 */
	@Input() isPhoto = false;

	/**
	 * Whether the image should be displayed as a round shape.
	 */
	@Input() isRound = false;

	/**
	 * Resize factor for the image.
	 */
	@Input() resize: number;

	/**
	 * Width for cropping the image.
	 */
	@Input() width: number;

	/**
	 * Height for cropping the image.
	 */
	@Input() height: number;

	/**
	 * The value of the uploaded file(s).
	 */
	@Input() value: string | string[] = this.multiple ? [] : '';

	/**
	 * Event emitter to notify parent components of updates.
	 */
	@Output() update = new EventEmitter<string | string[]>();

	/**
	 * Forcefully set the image URL in case of an error.
	 */
	force = '';

	/**
	 * Returns the list of files if multiple uploads are enabled.
	 */
	get files(): string[] {
		return this.value as string[];
	}

	ngOnInit(): void {
		if (!this.name && !this.multiple && this.value) {
			const paths = ((this.value as string) || '').split('/');

			this.name = paths[paths.length - 1].split('?')[0];
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value']) {
			this.value = changes['value'].currentValue;

			this.force = '';
		}
	}

	/**
	 * Initiates the file selection and cropping process.
	 */
	set(): void {
		this._fs.setFile = (dataUrl: string): void => {
			if (this.width && this.height) {
				this._modal.show({
					uploadImage: this.uploadImage.bind(this),
					component: FileCropperComponent,
					width: this.width,
					height: this.height,
					dataUrl
				});
			} else {
				this.uploadImage(dataUrl);
			}
		};
	}

	/**
	 * Uploads the image to the server.
	 * @param dataUrl The data URL of the image.
	 */
	uploadImage(dataUrl: string): void {
		this._http.post(
			'/api/file/photo',
			{
				container: this.container,
				name: this.name,
				dataUrl
			},
			(url: string) => {
				if (this.multiple) {
					if (!this.value) {
						this.value = [];
					}

					(this.value as string[]).push(url);
				} else {
					this.name = url.split('/')[5].split('?')[0];

					this.value = url;
				}

				this.update.emit(this.value);
			}
		);
	}
}
