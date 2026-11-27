import { type Voice } from "@/types/voice"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AudioModule, RecordingPresets, setAudioModeAsync, useAudioRecorder, useAudioRecorderState } from "expo-audio"
import { File, Paths } from "expo-file-system"
import { router } from "expo-router"
import { AudioLines, Mic, Pause, Play, Square, XIcon } from "lucide-react-native"
import { useState } from "react"
import { Alert, Pressable, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


export default function Recording() {

    const [isPaused, setIsPaused] = useState(false)
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

    // stop and save the current recording
    const stopRecord = async () => {
        try {
            // get the duration before stopping
            const duration = getTime(audioRecorder.getStatus().durationMillis)
            await audioRecorder.stop()
            setIsPaused(false)
            // get the recorded audio file location
            const filepath = audioRecorder.uri
            if (filepath) {
                await saveRecording(filepath, duration)
            }
            else {
                Alert.alert("Error", "No recording file found.")
            }

        } catch (error) {
            console.log(error)
            Alert.alert("Error", "Failed to save recording")
        }
    }

    // close the recording page
    const closeRecording = () => {
        if (recorderState.isRecording || isPaused) {
            Alert.alert("Recording in progress", "Please stop recording first")
            return
        }

        router.replace('/')
    }
    //creates audio recorder and configure the recording quality 
    const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY)
    //monitor the current state of recording 
    const recorderState = useAudioRecorderState(audioRecorder)

    const getTime = (milliseconds: number) => {
        //gets the time in hour ,minute and seconds 
        return new Date(milliseconds).toISOString().slice(11, 19)
    }

    //pause the current recording
    const pauseRecording = () => {
        audioRecorder.pause()
        setIsPaused(true)
    }
    //continue with the audio after pausing 
    const resumeRecording = () => {
        audioRecorder.record()
        setIsPaused(false)
    }

    // save the audio recording
    const saveRecording = async (filepath: string, duration: string) => {

        // move the audio file to permanent storage
        const file = new File(filepath)
        file.move(Paths.document)

        // get existing recordings from AsyncStorage
        const data = await AsyncStorage.getItem("recordings")
        const recordings: Voice[] = JSON.parse(data || "[]")

        // add the new recording
        recordings.push({
            id: Date.now(),
            name: `Recording ${recordings.length + 1}`,
            duration,
            date: new Date().toLocaleString(),
            filepath: file.uri
        })

        // save all recordings
        await AsyncStorage.setItem("recordings", JSON.stringify(recordings))

        // notify the user and return to the home page
        Alert.alert("Success", "Recording saved successfully")
        router.back()
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.closeButton} onPress={closeRecording}>
                    <XIcon size={20} color={'#000000'} />
                </Pressable>
                <Text style={styles.heading}>Recording </Text>
                <View style={styles.space} />
            </View>
            <View style={styles.audio}>
                <Text style={styles.instruction}>{isPaused ? "Recording paused " : recorderState.isRecording ? "Recording..." : "Ready to record"} </Text>
                <Text style={styles.timer}>{getTime(recorderState.durationMillis)}</Text>
                <AudioLines size={120} color={'#EF4C1D'} />
                <View style={styles.controls}>
                    {/* display pause or resume button during an active recording */}
                    {(recorderState.isRecording || isPaused) && (
                        <Pressable style={styles.pauseButton} onPress={isPaused ? resumeRecording : pauseRecording}>
                            {isPaused ? <Play size={24} color={'#000000'} /> : <Pause size={24} color={'#000000'} />}
                        </Pressable>
                    )}

                    {/* Start or stop recording */}
                    <Pressable style={styles.record} onPress={recorderState.isRecording || isPaused ? stopRecord : startRecording}>
                        {recorderState.isRecording || isPaused ? <Square size={40} color={'#FFFFFF'} fill={'#FFFFFF'} /> : <Mic size={40} color={'#FFFFFF'} />}
                    </Pressable>
                </View>
                <Text style={styles.instruction}> {recorderState.isRecording || isPaused ? "Tap to stop recording" : "Tap to start recording"}
                </Text>
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
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    pauseButton: {
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F4F4F4'
    }
})