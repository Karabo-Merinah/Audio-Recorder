import { BottomNavigation } from "@/components/bottomNavigation"
import { Header } from "@/components/header"
import { VoiceNoteLayout } from "@/components/voiceNoteLayout"
import { type Voice } from "@/types/voice"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "expo-router"
import { useCallback, useState } from "react"
import { FlatList, StyleSheet, Text, View,Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {File} from "expo-file-system"


export default function Home() {

  // store all saved recordings
  const [recordings, setRecordings] = useState<Voice[]>([])

  // retrieve saved recordings
  const getRecordings = async () => {
    const data = await AsyncStorage.getItem("recordings")
    setRecordings(JSON.parse(data || "[]"))
  }

  // delete the recording and its audio file
const deleteRecording = async (voice: Voice) => {
    try {
        // remove the recording from the list
        const updatedRecordings = recordings.filter(item => item.id !== voice.id )
        // Save the updated list
        await AsyncStorage.setItem("recordings", JSON.stringify(updatedRecordings))
        // update the displayed recordings
        setRecordings(updatedRecordings)
        // delete the actual audio file
        const file = new File(voice.filepath)
        if (file.exists) {
            file.delete()
        }
        Alert.alert("Success", "Recording deleted successfully")

    } catch (error) {
        console.log(error)
        Alert.alert("Error", "Failed to complete deletion")
    }
}

// update the recording name
const renameRecording = async (id: number, name: string) => {
    try {
        //update the name of the selected recording
        const updatedRecordings = recordings.map(item => item.id === id ? { ...item, name } : item
        )
        // save the updated recordings
        await AsyncStorage.setItem("recordings", JSON.stringify(updatedRecordings)
        )
        // update the displayed recordings
        setRecordings(updatedRecordings)
        Alert.alert("Success", "Recording renamed successfully")

    } catch (error) {
        console.log(error)
        Alert.alert("Error", "Failed to rename recording")
    }
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
        <FlatList data={recordings} keyExtractor={(item) => item.id.toString()} renderItem={({item})=>(
          <VoiceNoteLayout voice={item} onDelete={()=>deleteRecording(item)} onRename={(name)=>renameRecording(item.id,name)}/>
        )}
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