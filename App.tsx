import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

import { al } from "./src/helper/blAPI";

import { BleManager } from "react-native-ble-plx";
import { useEffect } from "react";

export const manager = new BleManager();

export default function App() {
	function scanAndConnect() {
		manager.startDeviceScan(null, null, (error, device) => {
			if (error) {
				// Handle error (scanning will be stopped automatically)
				return;
			}

			// Check if it is a device you are looking for based on advertisement data
			// or other criteria.
			if (
				device?.name === "TI BLE Sensor Tag" ||
				device?.name === "SensorTag"
			) {
				// Stop scanning as it's not necessary if you are scanning for one device.
				manager.stopDeviceScan();

				// Proceed with connection.
			}
		});
	}

	useEffect(() => {
		const subscription = manager.onStateChange((state) => {
			if (state === "PoweredOn") {
				scanAndConnect();
				subscription.remove();
			}
		}, true);
		return () => subscription.remove();
	}, [manager]);

	return (
		<View style={styles.container}>
			<Text>Open up App.tsx to start working on your app!</Text>
			<StatusBar style="auto" />
			<Button title="mes" onPress={al} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
