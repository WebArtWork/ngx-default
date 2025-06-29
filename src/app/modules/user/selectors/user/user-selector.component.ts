import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
	inject
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	selector: 'user-selector',
	templateUrl: './user-selector.component.html',
	styleUrls: ['./user-selector.component.scss'],
	standalone: true,
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	us = inject(UserService);

	@Input() value: string;

	@Output() onChange = new EventEmitter();

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
