import { AudioWaveform, PlusIcon, SearchIcon } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const Header = () => {
    return (
        <View style={styles.topBar}>
            <View style={styles.logo}>
                <AudioWaveform color="#EF4C1D" size={30} /><AudioWaveform color="#EF4C1D" size={30} />
                <Text style={styles.title}>Audio Journal</Text>
            </View>
            <View style={styles.buttons}>
                <Pressable style={styles.button} onPress={() => console.log("Search")}><SearchIcon size={20} /></Pressable>
                <Pressable style={styles.button} onPress={() => console.log("Add a new audio")} ><PlusIcon size={20} />
                </Pressable>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    topBar: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logo: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },
    buttons: {
        flexDirection: "row",
        gap: 10,
    },
    button: {
        backgroundColor: "#FDFDFD",
        borderRadius: 50,
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
    },
});