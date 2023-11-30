import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

const useAuth = () => {
    const navigation = useNavigation()

    const login = async (data) => {
        let details = {
            userId: data.userId,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            userImage: data.image,
            userBio: data.bio,
            isActive: data.is_active,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
          }
          await AsyncStorage.setItem('user_data', JSON.stringify(details));
          }

    const logout = async () => {
        await AsyncStorage.removeItem('user_data');
        navigation.navigate('Signin')
    }

    const userDetails = async () => {
        let user = await AsyncStorage.getItem('user_data');
        return JSON.parse(user);
    }

    return { login, logout, userDetails }
}

export default useAuth