import AsyncStorage from "@react-native-async-storage/async-storage"

const useInstall = () => {
    const checkInstall = async () => {
        let isInstall = await AsyncStorage.getItem('isInstall');
        return isInstall;
    }

    return { checkInstall }
}

export default useInstall