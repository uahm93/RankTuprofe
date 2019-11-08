import t from 'tcomb-form-native';
import inputTemplate from '../forms/templates/Input';
import textareaTemplate from '../forms/templates/Textarea';

export const AddNuevoStruct = t.struct({
	name: t.String,
	city: t.String,
	school: t.String,
	facultad: t.String,
	description: t.String
});

export const addNuevoOptions = {
	fields: {
		name: {
			template: inputTemplate,
			config: {
				placeholder: 'Nombre del docente',
				iconType: 'material-community',
				iconName: 'teach'
			}
		},
		city: {
			template: inputTemplate,
			config: {
				placeholder: 'Ciudad',
				iconType: 'material-community',
				iconName: 'city'
			}
		},
		school: {
			template: inputTemplate,
			config: {
				placeholder: 'Escuela',
				iconType: 'material-community',
				iconName: 'school'
			}
		},
		facultad: {
			template: inputTemplate,
			config: {
				placeholder: 'Facultad',
				iconType: 'material-community',
				iconName: 'school'
			}
		},
		description: {
			template: textareaTemplate,
			config: {
				placeholder: 'Opinion del docente'
			}
		}
	}
};
