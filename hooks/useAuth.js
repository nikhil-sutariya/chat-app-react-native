import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

const useAuth = () => {
    const navigation = useNavigation()

    const login = async (data) => {
        let details = {
            userId: data.userId,
            email: data.email,
            accessToken: data.accessToken,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            isActive: data.is_active,
            userImage: data.image,
            refreshToken: data.refreshToken
          }
          await AsyncStorage.setItem('user_data', JSON.stringify(details));
          await AsyncStorage.setItem('isInstall', "true")
        }

    const logout = async () => {
        await AsyncStorage.removeItem('user_data');
        navigation.navigate('Login')
    }

    const userDetails = async () => {
        let user = await AsyncStorage.getItem('user_data');
        return JSON.parse(user);
    }

    return { login, logout, userDetails }
}

export default useAuth