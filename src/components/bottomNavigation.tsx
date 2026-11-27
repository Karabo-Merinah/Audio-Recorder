import { router, usePathname } from "expo-router"
import { Home, Mic, Settings } from "lucide-react-native"
import { Pressable, StyleSheet, View } from "react-native"

export const BottomNavigation = () => {

    const pathname = usePathname()

    const active = pathname === "/" ? "Home" : pathname === "/recording" ? "Audio" : "Settings"

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Pressable style={[styles.button, active === "Home" && styles.active]} onPress={() => router.navigate("/")} >
                    <Home size={22} color={active === "Home" ? "#FFFFFF" : "#000000"} />
                </Pressable>
                <Pressable style={[styles.button, active === "Audio" && styles.active]} onPress={() => router.push("/recording")}>
                    <Mic size={22} color={active === "Audio" ? "#FFFFFF" : "#000000"} />
                </Pressable>
                <Pressable style={[styles.button, active === "Settings" && styles.active]}>
                    <Settings size={22} color={active === "Settings" ? "#FFFFFF" : "#000000"} />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 25,
        alignSelf: 'center',
        width: 230,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        padding: 5,
        elevation: 5,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.12,
        shadowRadius: 10
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        flex: 1,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {
        flex: 2,
        backgroundColor: '#222222'
    }
})