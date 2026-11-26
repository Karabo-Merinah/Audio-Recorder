import { BottomNavigation } from "@/components/bottomNavigation"
import { Header } from "@/components/header"
import { VoiceNoteLayout } from "@/components/voiceNoteLayout"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <VoiceNoteLayout id={1}
          name="My first recording"
          duration="1m2s"
          date="26 November 2026:10:52"
          filepath=""
        />
      </View>
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
  content: {
    flex: 1,
    marginTop: 20
  }
})