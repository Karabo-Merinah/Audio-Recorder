import { BottomNavigation } from "@/components/bottomNavigation"
import {AudioLines,MessageSquare,Headphones,ShieldCheck,Info,ChevronRight} from "lucide-react-native"
import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Settings() {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Settings</Text>
            <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={styles.content}>
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
                    <Pressable style={styles.option}>
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
                    <Pressable style={styles.option}>
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
            <BottomNavigation />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#F4F4F4'
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
    }
})