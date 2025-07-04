import { Component, inject } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { AlertService, CoreService } from 'wacom';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { userFormComponents } from '../../formcomponents/user.formcomponents';
import { TableComponent } from '../../../../core/modules/table/table.component';

import { CellDirective } from '../../../../core/modules/table/table.directive';
import { InputComponent } from '../../../../core/modules/input/input.component';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    imports: [TableComponent, CellDirective, InputComponent]
})
export class UsersComponent {
	private _translate = inject(TranslateService);
	private _alert = inject(AlertService);
	private _form = inject(FormService);
	private _core = inject(CoreService);
	private _us = inject(UserService);

	form: FormInterface = this._form.prepareForm(userFormComponents);

	config = {
		create: (): void => {
			this._form
				.modal<User>(this.form, {
					label: 'Create',
					click: (created: unknown, close: () => void) => {
						this._us.create(created as User, {
							alert: 'User has been created',
							callback: close.bind(this)
						});
					}
				})
				.then(this._us.create.bind(this));
		},
		update: (doc: User): void => {
			this._form.modal<User>(this.form, [], doc).then((updated: User) => {
				this._core.copy(updated, doc);

				this._us.update(doc, {
					alert: 'User has been updated'
				});
			});
		},
		delete: (user: User): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this user?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._us.delete(user, {
								name: 'admin',
								alert: 'User has been deleted',
								callback: () => {
									// this.setUsers();
								}
							});
						}
					}
				]
			});
		},
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist'
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit'
			}
		]
	};

	columns = ['name', 'email'];

	get roles(): string[] {
		return this._us.roles;
	}

	get users(): User[] {
		return this._us.users;
	}

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);

	constructor() {
		for (const role of this._us.roles) {
			this.columns.push(role);
		}
	}

	update(user: User): void {
		this._us.updateAdmin(user);
	}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<User>(create ? [] : this.users)
				.then((users: User[]) => {
					for (const user of this.users) {
						if (!users.find((_user) => _user._id === user._id)) {
							this._us.delete(user);
						}
					}

					for (const user of users) {
						if (create) {
							this._us.create(user);
						} else {
							this._core.copy(user, this._us.doc(user._id));

							this._us.update(user);
						}
					}
				});
		};
	}
}
