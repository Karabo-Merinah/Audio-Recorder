import { AudioLines, MoreVertical, Play } from "lucide-react-native"
import { Pressable, StyleSheet, Text, View } from "react-native"


export const VoiceNoteLayout = () => {

    return (
        <View style={styles.border}>
            <View style={styles.firstRow}>
                <View style={styles.button}>
                    <AudioLines size={20} color={'#000000'} />
                </View>
                <Text style={styles.audioName}>Audio name</Text>
                <Pressable style={styles.button} onPress={() => console.log()}>
                    <MoreVertical size={20} color={'#000000'} />
                </Pressable>
            </View>
            <Text style={styles.date}>26 November 2026:10:52</Text>
            <View style={styles.separator}></View>
            <View style={styles.time_play}>
                <Text style={styles.duration}>Duration:01m2s</Text>
                <Pressable onPress={() => console.log('Press play button')}>
                    <Play size={16} color={'#717171'} />
                </Pressable>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
        borderColor: '#000000',
        maxWidth: 400,
        borderRadius: 9
    },
    firstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        borderRadius: 50,
        width: 40,
        height: 40,
        backgroundColor: '#FDFDFD'
    },
    date: {
        color: '#717171'
    },
    separator: {
        borderStyle: 'solid',
        color: '#717171',
        borderWidth: 1
    },
    time_play: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 10
    },
    audioName: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold'
    },
    duration: {
        color: '#717171'
    }
})