import { BottomNavigation } from "@/components/bottomNavigation"
import { AudioLines, ChevronRight, Headphones, Info, MessageSquare, ShieldCheck, X } from "lucide-react-native"
import { useState } from "react"
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


export default function Settings() {

    const [showHelpInformation, setShowHelpInformation] = useState(false)
    const [showPrivacyInformation, setShowPrivacyInformation] = useState(false)
   
   
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Settings</Text>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <View style={styles.appInfo}>
                    <AudioLines size={55} color={'#EF4C1D'} />
                    <Text style={styles.appName}>Audio Journal</Text>
                    <Text style={styles.description}>Version 1.0.0</Text>
                </View>
                <Text style={styles.sectionTitle}>Support</Text>
                <View style={styles.section}>
                    <Pressable style={styles.option}>
                        <MessageSquare size={22} color={'#EF4C1D'} />
                        <View style={styles.optionText}>
                            <Text style={styles.title}>Send feedback</Text>
                            <Text style={styles.description}>Help us improve Audio Journal </Text>
                        </View>
                        <ChevronRight size={20} color={'#717171'} />
                    </Pressable>
                    <View style={styles.separator} />
                    <Pressable style={styles.option} onPress={() => setShowHelpInformation(true)}>
                        <Headphones size={22} color={'#EF4C1D'} />
                        <View style={styles.optionText}>
                            <Text style={styles.title}>Help and support</Text>
                            <Text style={styles.description}>Get help using the application</Text>
                        </View>
                        <ChevronRight size={20} color={'#717171'} />
                    </Pressable>
                </View>
                <Text style={styles.sectionTitle}>About</Text>
                <View style={styles.section}>
                    <Pressable style={styles.option} onPress={()=>setShowPrivacyInformation(true)}>
                        <ShieldCheck size={22} color={'#EF4C1D'} />
                        <Text style={[styles.title, styles.optionText]}>Privacy</Text>
                        <ChevronRight size={20} color={'#717171'} />
                    </Pressable>
                    <View style={styles.separator} />
                    <Pressable style={styles.option}>
                        <Info size={22} color={'#EF4C1D'} />
                        <Text style={[styles.title, styles.optionText]}> About Audio Journal</Text>
                        <ChevronRight size={20} color={'#717171'} />
                    </Pressable>
                </View>
            </ScrollView>

            <Modal visible={showHelpInformation} transparent={true} animationType="fade" onRequestClose={() => setShowHelpInformation(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Headphones size={24} color={'#EF4C1D'} />
                            <Text style={styles.modalTitle}>Help and Support</Text>
                            <Pressable onPress={() => setShowHelpInformation(false)}>
                                <X size={22} color={'#000000'} />
                            </Pressable>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.question}>  How do I record audio? </Text>
                            <Text style={styles.answer}> Tap the microphone or Add button, then tap the record button to start recording.
                                Tap the stop button to save your recording.
                            </Text>
                            <Text style={styles.question}>How do I play a recording?</Text>
                            <Text style={styles.answer}>Tap the play button on a saved recording.
                                You can also pause and resume playback.</Text>
                            <Text style={styles.question}> How do I rename or delete a recording? </Text>
                            <Text style={styles.answer}>  Tap the three dots on a recording card and select Rename or Delete.</Text>
                            <Text style={styles.question}>  How do I search for recordings?</Text>
                            <Text style={styles.answer}>Tap the search icon on the home page  and enter the recording name.</Text>
                            <Text style={styles.question}> Where are my recordings stored? </Text>
                            <Text style={styles.answer}> Recordings are stored locally on your device and can be accessed offline.</Text>
                        </ScrollView>
                        <Pressable style={styles.closeButton} onPress={() => setShowHelpInformation(false)}>
                            <Text style={styles.closeText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <BottomNavigation />

<Modal visible={showPrivacyInformation} transparent={true}  animationType="fade"onRequestClose={() => setShowPrivacyInformation(false)}>
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
                <ShieldCheck size={24} color={'#EF4C1D'} />
                <Text style={styles.modalTitle}>Privacy</Text>
                <Pressable onPress={() => setShowPrivacyInformation(false)}><X size={22} color={'#000000'} /> </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.question}>Local storage</Text>
                <Text style={styles.answer}>Your recordings are stored locally on your device. Audio Journal does not upload your recordings to a cloud server.
                </Text>
                <Text style={styles.question}>Microphone permissions</Text>
                <Text style={styles.answer}> Microphone access is required to record audio.
                    You can manage this permission in your device settings.
                </Text>
                <Text style={styles.question}>Offline access</Text>
                <Text style={styles.answer}>You do not need an internet connection to create, play or manage your recordings.
                </Text>
                <Text style={styles.question}>Data management</Text>
                <Text style={styles.answer}> You can rename or delete your saved recordings at any time. </Text>
                <Text style={styles.question}>Data loss</Text>
                <Text style={styles.answer}> Uninstalling the application or clearing its stored data may result in the loss of your recordings.</Text>
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={() => setShowPrivacyInformation(false)} >
                <Text style={styles.closeText}>Close</Text>
            </Pressable>

        </View>
    </View>
</Modal>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#FDFDFD'
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000'
    },
    content: {
        paddingBottom: 100
    },
    appInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 35,
        gap: 8
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000'
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#717171',
        marginBottom: 10,
        marginTop: 20
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 15
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        gap: 12
    },
    optionText: {
        flex: 1,
        gap: 4
    },
    title: {
        fontSize: 15,
        fontWeight: '500',
        color: '#000000'
    },
    description: {
        fontSize: 13,
        color: '#717171'
    },
    separator: {
        height: 1,
        backgroundColor: '#EEEEEE'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: '90%',
        maxWidth: 400,
        maxHeight: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        gap: 20
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    modalTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
    },
    question: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 6
    },
    answer: {
        fontSize: 14,
        color: '#717171',
        lineHeight: 21,
        marginBottom: 20
    },
    closeButton: {
        backgroundColor: '#EF4C1D',
        borderRadius: 9,
        padding: 12,
        alignItems: 'center'
    },
    closeText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold'
    }
})