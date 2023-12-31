import React, { useState } from "react";
import {
	Keyboard,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	Pressable,
} from "react-native";
import DeviceModal from "./src/components/DeviceConnection/DeviceConnectionModal";
import useBLE from "./src/hooks/useBle";
import PasswordInput from "./src/components/PasswordInput";
import ContentComponent from "./src/components/ContentComponent/ContentComponent";
import { trigger } from "react-native-haptic-feedback";

const App = () => {
	const [
		requestPermissions,
		scanForPeripherals,
		allDevices,
		connectToDevice,
		disconnectFromDevice,
		connectedDevice,
	] = useBLE();
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	const [password, setPassword] = useState<string>("");

	const hideModal = () => {
		setIsModalVisible(false);
		try {
			trigger("impactLight");
		} catch (error) {}
	};

	const openModal = async () => {
		scanForPeripherals();
		setIsModalVisible(true);
	};

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: "#1E1E1E",
				}}
			>
				<PasswordInput
					passwordString={password}
					setPasswordString={setPassword}
				/>
				<ScrollView>
					<Pressable>
						<ContentComponent
							device={connectedDevice}
							password={password}
						/>
					</Pressable>
				</ScrollView>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				></View>
				<TouchableOpacity
					onPress={() => {
						try {
							trigger("impactLight");
						} catch (error) {}

						connectedDevice ? disconnectFromDevice() : openModal();
					}}
					style={{
						backgroundColor: "#007ACC",
						justifyContent: "center",
						alignItems: "center",
						height: 50,
						marginHorizontal: 40,
						marginVertical: 10,
						borderRadius: 8,
					}}
				>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "bold",
							color: "white",
						}}
					>
						{connectedDevice ? "Desconectar" : "Conectar"}
					</Text>
				</TouchableOpacity>
				<DeviceModal
					closeModal={hideModal}
					visible={isModalVisible}
					connectToDevice={connectToDevice}
					devices={allDevices}
				/>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default App;
