import { AudioModule, useAudioRecorder, useAudioRecorderState, RecordingPresets, setAudioModeAsync } from "expo-audio"
import { router } from "expo-router"
import { AudioLines, Mic, XIcon, Square } from "lucide-react-native"
import { Alert, Pressable, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Recording() {

    //request microphone permission and start recording
    const startRecording = async () => {
        //request permission to access the device microphone
        const permission = await AudioModule.requestRecordingPermissionsAsync()
        //check if microphone permission was denied 
        if (!permission.granted) {
            Alert.alert("Permission denied", "Please allow microphone access")
            return
        }
        //configure the audio session to allow recording
        await setAudioModeAsync({
            allowsRecording: true, playsInSilentMode: true
        })
        //prepare the audio recorder before recording
        await audioRecorder.prepareToRecordAsync()
        //start recording audio
        audioRecorder.record()
        console.log("Recording started")
    }

    //stop the current audio recording
    const stopRecord = async () => {
        await audioRecorder.stop()
        console.log("Recording stopped")
        //displays the recorder audio file location
        console.log(audioRecorder.uri)
    }
    //creates audio recorder and configure the recording quality 
    const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY)
    //monitor the current state of recording 
    const recorderState = useAudioRecorderState(audioRecorder)

    const getTime = (milliseconds: number) => {
        //gets the time in hour ,minute and seconds 
        return new Date(milliseconds).toISOString().slice(11, 19)
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
                <Text style={styles.instruction}>{recorderState.isRecording ? "Recording..." : "Ready to record"} </Text>
                <Text style={styles.timer}>00:00:00</Text>
                <AudioLines size={120} color={'#EF4C1D'} />
                <Pressable style={styles.record} onPress={recorderState.isRecording ? stopRecord : startRecording} >
                    {recorderState.isRecording ? <Square size={40} color={'#FFFFFF'} fill={'#FFFFFF'} /> : <Mic size={40} color={'#FFFFFF'} />}
                </Pressable>
                <Text style={styles.instruction}>{recorderState.isRecording ? "Tap to stop recording" : "Tap to start recording"}</Text>
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
        backgroundColor: '#FDFDFD',
        marginBottom: 10,
        borderRadius: 9

    },
    instruction: {
        fontSize: 15,
        color: '#717171'
    },
    timer: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    record: {
        borderRadius: 50,
        width: 80,
        height: 80,
        backgroundColor: '#EF4C1D',
        alignItems: 'center',
        justifyContent: 'center'
    }
})