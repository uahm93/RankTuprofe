import t from 'tcomb-form-native';
import inputTemplate from '../forms/templates/Input';
import textareaTemplate from '../forms/templates/Textarea';

export const AddReviewStruct = t.struct({
	titulo: t.String,
	review: t.String
});

export const AddReviewOptions = {
	fields: {
		titulo: {
			template: inputTemplate,
			config: {
				placeholder: "Titulo de la opinión",
				inconType: "material-community",
				iconName: "silverware"
			}
		},
		review: {
			template: textareaTemplate,
			config: {
				placeholder: "Opinión"
			}
		}
	}
}