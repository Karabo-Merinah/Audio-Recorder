import { router } from "expo-router"
import { Home, Mic, Settings } from "lucide-react-native"
import { useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"

export const BottomNavigation = () => {

    // Track the active navigation button
    const [active, setActive] = useState("Home")

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Pressable style={[styles.button, active === "Home" && styles.active]} onPress={() => {
                    setActive("Home")
                    router.navigate("/")
                }}>
                    <Home color={active === "Home" ? "#FFFFFF" : "#000000"} size={20} />
                </Pressable>
                <Pressable style={[styles.button, active === "Audio" && styles.active]} onPress={() => {
                    setActive("Audio")
                    router.push('/recording')
                }} >
                    <Mic color={active === "Audio" ? "#FFFFFF" : "#000000"} size={20} />
                </Pressable>
                <Pressable style={[styles.button, active === "Settings" && styles.active]} onPress={() => setActive("Settings")} >
                    <Settings color={active === "Settings" ? "#FFFFFF" : "#000000"} size={20} />
                </Pressable>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 9,
        borderColor: '#717171',
        maxWidth: 700,
        height: 50
    },
    buttons: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {
        backgroundColor: '#000000'
    }
})