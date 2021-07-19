/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import {
	Field, BaseFieldProps, WrappedFieldProps, change
} from 'redux-form';
import { TextField, TextFieldProps } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Store } from '@base/features';

export type Props = {

} & BaseFieldProps & TextFieldProps;

class FieldAutocomplete extends React.Component<Props> {
	renderField(fieldData: WrappedFieldProps) {
		const cities: any = [
			{ title: 'Sofia' },
			{ title: 'Plovdiv' },
			{ title: 'Varna' },
			{ title: 'Belgrad' }
		];
		const getSelectedOption = () => {
			return cities.find((o: { title: any }) => o.title === input.value);
		};
		const { input, meta, ...rest } = fieldData;
		const { touched, error, warning } = meta;
		const { onChange } = input;
		const errorMessage = touched ? (warning || error) : undefined;

		return (
			<Autocomplete
				id="combo-box-demo"
				options={cities}
				value={getSelectedOption()}
				getOptionLabel={(option) => option.title}
				style={{ width: 300 }}
				onChange={async (event, newValue) => {
					await Store.dispatch(change('FormExampleForm', 'cities', newValue));
					onChange(newValue);
				}}
				renderInput={(params) => {
					return (
						<TextField variant="outlined" {...params} {...rest} helperText={errorMessage} error={errorMessage} />
					);
				}}
			/>
		);
	}

	render() {
		return (
			<Field
				{...(this.props as BaseFieldProps)}
				component={this.renderField}
			/>
		);
	}
}

export default FieldAutocomplete;
