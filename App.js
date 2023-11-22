import { StatusBar } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";

export default function App() {
	return (
		<SafeAreaProvider>
			<StatusBar backgroundColor={'#008069'} barStyle='dark-content' />
          	<Navigation />
		</SafeAreaProvider>
	)
}
