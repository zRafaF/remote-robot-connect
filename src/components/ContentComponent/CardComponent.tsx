// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, useState } from "react";
import {
	TextInput,
	View,
	Text,
	Button,
	ColorValue,
	Keyboard,
} from "react-native";
import { trigger } from "react-native-haptic-feedback";

interface CardComponentProps {
	cardTitle?: string;
	cardCallBack: (value: string) => void;
	defaultColor?: ColorValue;
	buttonColor?: ColorValue;
}

const CardComponent: FunctionComponent<CardComponentProps> = ({
	cardTitle,
	cardCallBack,
	defaultColor = "white",
	buttonColor = "black",
}) => {
	const [number, onChangeNumber] = useState<string>("");

	const triggerCallBack = () => {
		cardCallBack(number);
		Keyboard.dismiss();
	};

	const getText = (): JSX.Element => {
		return cardTitle ? (
			<Text
				style={{
					fontSize: 20,
					width: 30,
					fontWeight: "bold",

					color: defaultColor,
				}}
			>
				{cardTitle}
			</Text>
		) : (
			<></>
		);
	};

	return (
		<View
			style={{
				alignSelf: "stretch",
				flexDirection: "row",
				padding: 13,
				marginVertical: 5,
				backgroundColor: "#252526",
				justifyContent: "space-around",
				alignItems: "center",
				borderRadius: 8,
			}}
		>
			{getText()}

			<TextInput
				style={{
					flex: 1,
					height: 40,
					maxWidth: 150,
					borderWidth: 1,
					padding: 10,
					color: "white",
					borderColor: "grey",
					borderRadius: 8,
				}}
				onSubmitEditing={triggerCallBack}
				placeholderTextColor={"grey"}
				onChangeText={onChangeNumber}
				value={number}
				placeholder="Novo valor"
				keyboardType="numeric"
			/>
			<Button
				title="ENVIAR"
				color={buttonColor}
				onPress={triggerCallBack}
			/>
		</View>
	);
};

export default CardComponent;
