import { type Voice } from "@/types/voice"
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from "expo-audio"
import { AudioLines, MoreVertical, Pause, Play } from "lucide-react-native"
import { useState } from "react"
import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native"


export const VoiceNoteLayout = ({ voice, onDelete, onRename }: { voice: Voice, onDelete: () => void, onRename: (name: string) => void }) => {

    const [showRenameForm, setShowRenameForm] = useState(false)
    const [name, setName] = useState(voice.name)

    // display recording options
    const showOptions = () => {
        Alert.alert("Recording options", "Choose an option", [
            {
                text: "Rename", onPress: () => {
                    setName(voice.name)
                    setShowRenameForm(true)
                }
            },
            { text: "Delete", onPress: confirmDelete },
            { text: "Cancel", style: "cancel" }
        ])
    }

    // load the saved audio file
    const player = useAudioPlayer(voice.filepath)
    // monitor the playback status
    const playerStatus = useAudioPlayerStatus(player)

    // confirmation dialog  before deleting the recording
    const confirmDelete = () => {
        Alert.alert("Delete recording", "Are you sure you want to delete this recording?",
            [{ text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: onDelete }
            ]
        )
    }

    // play or pause the recording
    const playRecording = async () => {
        try {
            // pause if the recording is already playing
            if (playerStatus.playing) {
                player.pause()
            } else {
                // configure the audio mode for playback
                await setAudioModeAsync({
                    allowsRecording: false,
                    playsInSilentMode: true
                })
                // restart if the audio has finished playing
                if (playerStatus.didJustFinish ||
                    player.currentTime >= player.duration) {
                    await player.seekTo(0)
                }
                // play the recording
                player.play()
            }
        } catch (error) {
            console.log(error)
            Alert.alert("Error", "Failed to play recording")
        }
    }


    // validate and save the recording name
    const saveName = () => {
        if (!name.trim()) {
            Alert.alert("Error", "Please enter a recording name")
            return
        }
        onRename(name.trim())
        setShowRenameForm(false)
    }

    // convert playback seconds into hours, minutes and seconds
    const getTime = (seconds: number) => {
        return new Date(seconds * 1000).toISOString().slice(11, 19)
    }

    return (
        <View style={styles.border}>
            <View style={styles.firstRow}>
                <View style={styles.button}>
                    <AudioLines size={20} color={'#000000'} />
                </View>
                <Text style={styles.audioName}>{voice.name}</Text>
                <Pressable style={styles.button} onPress={showOptions}>
                    <MoreVertical size={20} color={'#000000'} />
                </Pressable>
            </View>
            <Text style={styles.date}>{voice.date}</Text>
            <View style={styles.separator}></View>
            <View style={styles.time_play}>
                <Text style={styles.duration}>{getTime(playerStatus.currentTime)} / {voice.duration}</Text>
                <Pressable style={styles.button} onPress={playRecording}>
                    {playerStatus.playing ? (<Pause size={20} color={'#717171'} />
                    ) : (<Play size={20} color={'#717171'} />
                    )}
                </Pressable>
            </View>
            <Modal visible={showRenameForm} transparent onRequestClose={() => setShowRenameForm(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}> Rename recording</Text>
                        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter recording name" maxLength={50} />
                        <View style={styles.renameButtons}>
                            <Pressable onPress={() => setShowRenameForm(false)}>
                                <Text style={styles.cancel}>Cancel</Text>
                            </Pressable>
                            <Pressable style={styles.saveButton} onPress={saveName}>
                                <Text style={styles.saveText}>Save</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
        borderColor: '#000000',
        maxWidth: 400,
        width: "100%",
        borderRadius: 9,
        backgroundColor: '#FDFDFD',
        padding: 12,
        marginBottom: 10
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
        backgroundColor: '#FDFDFD',
        justifyContent: 'center',
        alignItems: 'center'
    },
    date: {
        color: '#717171'
    },
    separator: {
        borderStyle: 'solid',
        color: '#717171',
        borderWidth: 1,
        marginVertical: 10
    },
    time_play: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10
    },
    audioName: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    duration: {
        color: '#717171'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: '85%',
        maxWidth: 400,
        backgroundColor: '#FDFDFD',
        padding: 20,
        borderRadius: 9,
        gap: 20
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#717171',
        borderRadius: 9,
        padding: 12,
        color: '#000000'
    },
    renameButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 20
    },
    cancel: {
        color: '#717171'
    },
    saveButton: {
        backgroundColor: '#EF4C1D',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 9
    },
    saveText: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
})