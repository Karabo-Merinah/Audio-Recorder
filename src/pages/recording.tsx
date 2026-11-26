import { AudioModule } from "expo-audio"
import { router } from "expo-router"
import { AudioLines, Mic, XIcon } from "lucide-react-native"
import { Alert, Pressable, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Recording() {

    const requestAudioPermission=async ()=>{
        const permission=await AudioModule.requestRecordingPermissionsAsync()
       
        if(!permission.granted){
            Alert.alert("Permission denied","Please allow microphone access")
            return
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.closeButton} onPress={() => router.back()}>
                    <XIcon size={20} color={'#000000'} />
                </Pressable>
                <Text style={styles.heading}>Recording </Text>
                <View style={styles.space} />
            </View>
            <View style={styles.audio}>
                <Text style={styles.instruction}>Ready to record </Text>
                <Text style={styles.timer}>00:00:00</Text>
                <AudioLines size={120} color={'#EF4C1D'} />
                <Pressable style={styles.record} onPress={requestAudioPermission}>
                    <Mic size={40} color={'#FFFFFF'} />
                </Pressable>
                <Text style={styles.instruction}>Tap to start recording</Text>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'center'
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FDFDFD'
    },
    heading: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    space: {
        width: 40
    },
    audio: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        flex: 1,
        backgroundColor:'#FDFDFD',
        marginBottom:10,
        borderRadius:9

    },
    instruction: {
        fontSize: 15,
        color: '#717171'
    },
    timer:{
        fontSize:40,
        fontWeight:'bold'
    },
    record:{
        borderRadius:50,
        width:80,
        height:80,
        backgroundColor:'#EF4C1D',
        alignItems:'center',
       justifyContent:'center'
    }
})