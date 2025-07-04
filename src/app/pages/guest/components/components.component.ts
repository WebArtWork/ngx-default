import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { ButtonComponent } from '../../../core/modules/button/button.component';
import { FileComponent } from '../../../core/modules/file/file.component';
import { FormComponent } from '../../../core/modules/form/form.component';
import { InputComponent } from '../../../core/modules/input/input.component';

@Component({
	templateUrl: './components.component.html',
	styleUrls: ['./components.component.scss'],
	imports: [
		InputComponent,
		FormComponent,
		ButtonComponent,
		FileComponent,
		JsonPipe
	]
})
export class ComponentsComponent {
	private _form = inject(FormService);

	submition: Record<string, unknown> = {
		emails: []
	};

	form: FormInterface = this._form.getForm('testform', {
		formId: 'testform',
		title: 'Test Title',
		components: [
			{
				components: [
					{
						components: [
							{
								name: 'Email',
								key: 'emails[].name',
								fields: [
									{
										name: 'Placeholder',
										value: 'Enter your email 1'
									},
									{
										name: 'Label',
										value: 'Email'
									}
								]
							},
							{
								name: 'Email',
								key: 'emails[].description',
								fields: [
									{
										name: 'Placeholder',
										value: 'Enter your email'
									},
									{
										name: 'Label',
										value: 'Email'
									}
								]
							}
						]
					},
					{
						components: [
							{
								name: 'Email',
								key: 'emails[].name',
								fields: [
									{
										name: 'Placeholder',
										value: 'Enter your email 2'
									},
									{
										name: 'Label',
										value: 'Email'
									}
								]
							},
							{
								name: 'Email',
								key: 'emails[].description',
								fields: [
									{
										name: 'Placeholder',
										value: 'Enter your email'
									},
									{
										name: 'Label',
										value: 'Email'
									}
								]
							}
						]
					}
				]
			},
			{
				name: 'Tags',
				key: 'tags',
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter tags'
					},
					{
						name: 'Label',
						value: 'Tags'
					}
				]
			},
			{
				name: 'Tags',
				key: 'tags2',
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter tags2'
					},
					{
						name: 'Label',
						value: 'Tags2'
					}
				]
			},
			{
				name: 'Email',
				key: 'email',
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your email'
					},
					{
						name: 'Label',
						value: 'Email'
					}
				]
			},
			{
				name: 'Password',
				key: 'password',
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your password'
					},
					{
						name: 'Label',
						value: 'Password'
					}
				]
			},
			{
				name: 'Number',
				key: 'resetPin',
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter code from email'
					},
					{
						name: 'Label',
						value: 'code'
					}
				]
			},
			{
				name: 'Button',
				fields: [
					{
						name: 'Label',
						value: "Let's go"
					},
					{
						name: 'Submit',
						value: true
					},
					{
						name: 'Click',
						value: (): void => {
							alert('Button Clicked');
						}
					}
				]
			}
		]
	});
}
