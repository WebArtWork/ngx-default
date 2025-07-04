import { Component, inject } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { HttpService } from 'wacom';
import { ButtonComponent } from '../../../button/button.component';
import { SelectComponent } from '../../../select/select.component';
import { TableComponent } from '../../../table/table.component';
import { CellDirective } from '../../../table/table.directive';
import { TranslateDirective } from '../../translate.directive';
import { TranslatePipe } from '../../translate.pipe';
import { Language, TranslateService, Word } from '../../translate.service';

interface Translate {
	translate: string;
	slug: string;
	lang: string;
}

interface TranslateAll {
	words: string;
	translates: string;
}

@Component({
	templateUrl: './translates.component.html',
	styleUrls: ['./translates.component.scss'],
	imports: [
		TranslateDirective,
		SelectComponent,
		ButtonComponent,
		TableComponent,
		CellDirective,
		TranslatePipe
	]
})
export class TranslatesComponent {
	ts = inject(TranslateService);
	private _form = inject(FormService);
	private _http = inject(HttpService);

	columns = ['page', 'word', 'translation'];
	form: FormInterface = this._form.prepareForm({
		formId: 'translate',
		title: 'Translate',
		components: [
			{
				name: 'Text',
				key: 'translate',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill Translate'
					},
					{
						name: 'Label',
						value: 'Translate'
					},
					{
						name: 'Textarea',
						value: true
					}
				]
			}
		]
	});
	formAll: FormInterface = this._form.prepareForm({
		formId: 'translateAll',
		title: 'Translate All',
		components: [
			{
				name: 'Text',
				key: 'words',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill Translate'
					},
					{
						name: 'Label',
						value: 'Translate'
					},
					{
						name: 'Textarea',
						value: true
					}
				]
			},
			{
				name: 'Text',
				key: 'translates',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill Translate'
					},
					{
						name: 'Label',
						value: 'Translate'
					},
					{
						name: 'Textarea',
						value: true
					}
				]
			}
		]
	});
	config = {
		update: (doc: Translate) => {
			this._form
				.modal<Translate>(this.form, [], {
					translate: this.ts.translate(doc.slug)
				})
				.then((updated: Translate) => {
					this._http.post('/api/translate/create', {
						appId: this.ts.appId,
						slug: doc.slug,
						lang: this.ts.language.code,
						translate: updated.translate
					});
					this.ts.translates[this.ts.language.code][doc.slug] =
						updated.translate;
					this.ts.reset();
				});
		}
	};
	pages = [
		{
			name: this.ts.translate('Common.All'),
			_id: ''
		}
	].concat(
		this.ts.pages.map((p: string) => {
			return {
				name: p,
				_id: p
			};
		})
	);
	page = localStorage.getItem('page') || '';
	setPage(page: string) {
		this.page = page;
		localStorage.setItem('page', page);
	}

	get rows(): Word[] {
		return this.ts.words.filter((w) => {
			return this.page && typeof w === 'object'
				? this.page === w.slug.split('.')[0]
				: true;
		});
	}

	translateAll(missed = false): void {
		const rows = missed
			? this.rows.filter(
					(r) => !this.ts.translates[this.ts.language.code][r.slug]
				)
			: this.rows;
		const words = JSON.stringify(rows.map((r) => r.word));
		const slugs = rows.map((r) => r.slug);
		const translates = JSON.stringify(
			rows.map((r) => this.ts.translate(r.slug))
		);
		this._form
			.modal<TranslateAll>(this.formAll, [], {
				words,
				translates
			})
			.then((updated: TranslateAll) => {
				if (translates === updated.translates) {
					return;
				}
				const translated = JSON.parse(updated.translates);
				for (let i = 0; i < slugs.length; i++) {
					this._http.post('/api/translate/create', {
						appId: this.ts.appId,
						slug: slugs[i],
						lang: this.ts.language.code,
						translate: translated[i]
					});

					this.ts.translates[this.ts.language.code][slugs[i]] =
						translated[i];
				}
				this.ts.reset();
			});
	}

	set_language(code: string) {
		this.ts.set_language(
			this.ts.languages.find((l) => l.code === code) as Language
		);
	}
}
