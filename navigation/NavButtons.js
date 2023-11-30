import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from "react";
import { TouchableWithoutFeedback, Image, StyleSheet } from "react-native";

export const NavButtons = () => {
    const navigation = useNavigation()
    const [userData, setUserData] = useState(null)

    const handleImagePress = () => {
        navigation.navigate("Profile")
    }

    const getUser = async () => {
        let user_data = await AsyncStorage.getItem('user_data')
        if(user_data !== null){
            const user = JSON.parse(user_data)
            setUserData(user)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            {userData && (
                <TouchableWithoutFeedback onPress={handleImagePress}>
                    <Image
                        style={styles.image}
                        source={{ uri: userData.userImage }}
                        // defaultSource={require('../assets/images/logo.png')}
                    />
                </TouchableWithoutFeedback>
            )}
        </>
    )
}


const styles = StyleSheet.create({
    image: {
        height: 35,
        width: 35,
        borderRadius: 50,
        marginTop: 5,
        marginEnd: 15
    }
})