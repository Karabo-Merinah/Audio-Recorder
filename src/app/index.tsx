import { BottomNavigation } from "@/components/bottomNavigation"
import { Header } from "@/components/header"
import { VoiceNoteLayout } from "@/components/voiceNoteLayout"
import { type Voice } from "@/types/voice"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "expo-router"
import { useCallback, useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {

  // store all saved recordings
  const [recordings, setRecordings] = useState<Voice[]>([])

  // retrieve saved recordings
  const getRecordings = async () => {
    const data = await AsyncStorage.getItem("recordings")
    setRecordings(JSON.parse(data || "[]"))
  }

  // refresh recordings whenever the home page mounts
  useFocusEffect(
    useCallback(() => {
      getRecordings()
    }, [])
  )

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        {/* display heading and number of recordings */}
        <View style={styles.heading}>
          <Text style={styles.title}>My Recordings</Text>
          <Text style={styles.count}> {recordings.length} recordings </Text>
        </View>
        {/* display all saved recordings */}
        <FlatList data={recordings} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <VoiceNoteLayout {...item} />}
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
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  count: {
    fontSize: 13,
    color: '#717171'
  }
})