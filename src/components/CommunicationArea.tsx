// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, useState } from "react";

import { StyleSheet, Text, View, TextInput, Button } from "react-native";

interface CommunicationAreaProps {
	enabled: boolean;
}

const CommunicationArea: FunctionComponent<CommunicationAreaProps> = ({
	enabled,
}) => {
	const [number, onChangeNumber] = useState("");

	return (
		<View
			pointerEvents={enabled ? "auto" : "none"}
			style={{
				opacity: enabled ? 1 : 0.2,
				flexDirection: "row",
				margin: 30,
				gap: 10,
				padding: 13,
				backgroundColor: "#252526",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text
				style={{
					flex: 1,

					fontSize: 20,
					fontWeight: "bold",

					color: "white",
				}}
			>
				SENHA: {number}
			</Text>
			<Button title="mike" />
		</View>
	);
};

export default CommunicationArea;
