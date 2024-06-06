import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import theme from '../../styles/theme';
import { Formik } from 'formik'
import { TextInput } from 'react-native';
import StyledText from '../../components/ui/StyledText';
import { Button } from 'react-native';
import { capitalizeFirstLetter } from "../../utils/strings";
import { StyledTextInput } from '../../components/ui/StyledTextInput';

const initialValuesServicioProfesional = {
	nombre: "",
	apellido: "",
	telefono: "",
	horarios: "",
	rubros: "",
	descripcion: "",
	imagen: "",
}

const CrearServicioProfesional = ({ navigation }) => {

	function handleFormSubmit(values) {
		console.log(values)
	}

	return (
		<View style={styles.screenContainer}>

			<Formik initialValues={initialValuesServicioProfesional} onSubmit={handleFormSubmit}>
				{({ handleChange, handleSubmit, values, handleBlur }) => {
					return (
						<View style={styles.form}>

							{
								Object.keys(initialValuesServicioProfesional).map((key) => (
									key === 'imagen'
										? null
										: (
											<StyledTextInput
												key={key}
												placeholder={capitalizeFirstLetter(key)}
												value={values[key]}
												onChangeText={handleChange(key)}
												onBlur={handleBlur(key)}
											/>
										)
								))
							}

							<View style={styles.imgUploadSection}>
								<StyledText style={styles.imgUploadBtn} onPress={() => console.log("desde camara")}>*camara*</StyledText>
								<StyledText style={styles.imgUploadBtn} onPress={() => console.log("desde archivo")}>*archivo*</StyledText>
							</View>

							<View style={styles.formControls}>
								<Button title="Crear" onPress={handleSubmit} />
								<Button title="Cancelar" onPress={() => navigation.goBack()} />
							</View>

						</View>

					)
				}}
			</Formik >
		</View >
	)
}

const styles = StyleSheet.create({
	screenContainer: {
		justifyContent: 'start',
		alignItems: 'center',
		width: "100%",
		height: "100%",
		backgroundColor: theme.colors.white,
		padding: theme.global.screenInnerPadding,
	},
	form: {
		gap: 20,
		width: "100%",
	},
	imgUploadSection: {
		flexDirection: 'row',
		gap: 10,
		justifyContent: 'center',
	},
	imgUploadBtn: {
		backgroundColor: 'red',
		alignItems: 'center',
		justifyContent: 'center',
		aspectRatio: 1,
		height: 80,
		padding: 5,
	},
	formControls: {
		marginTop: 20,
		gap: 10,
	},
});

export default CrearServicioProfesional;