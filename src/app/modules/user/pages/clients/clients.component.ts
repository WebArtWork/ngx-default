import { Component, inject } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { AlertService, CoreService } from 'wacom';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { userFormComponents } from '../../formcomponents/user.formcomponents';

@Component({
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
	private _translate = inject(TranslateService);
	private _us = inject(UserService);
	private _alert = inject(AlertService);
	private _core = inject(CoreService);
	private _form = inject(FormService);

	columns = ['name', 'email'];

	form: FormInterface = this._form.prepareForm(userFormComponents);

	users: User[] = [];

	private _page = 1;

	setUsers(page = this._page) {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._us.get({ page }).subscribe((users) => {
					this.users.splice(0, this.users.length);

					this.users.push(...users);
				});
			},
			250
		);
	}

	config = {
		paginate: this.setUsers.bind(this),
		perPage: 20,
		setPerPage: this._us.setPerPage.bind(this._us),
		allDocs: false,
		create: () => {
			this._form
				.modal<User>(this.form, {
					label: 'Create',
					click: (created: unknown, close: () => void) => {
						this._us.create(created as User, {
							alert: this._translate.translate(
								'User.Client has been created'
							),
							callback: () => {
								this.setUsers();
								close();
							}
						});
					}
				})
				.then(this._us.create.bind(this));
		},
		update: (doc: User) => {
			this._form.modal<User>(this.form, [], doc).then((updated: User) => {
				this._core.copy(updated, doc);

				this._us.update(doc, {
					alert: this._translate.translate(
						'User.Client has been updated'
					)
				});
			});
		},
		delete: (user: User) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this client?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: () => {
							this._us.delete(user, {
								name: 'admin',
								alert: this._translate.translate(
									'User.Client has been deleted'
								),
								callback: () => {
									this.setUsers();
								}
							});
						}
					}
				]
			});
		}
	};

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);
	constructor() {
		this.setUsers();
	}
}
