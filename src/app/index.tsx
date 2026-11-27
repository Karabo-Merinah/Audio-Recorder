import { BottomNavigation } from "@/components/bottomNavigation"
import { Header } from "@/components/header"
import { VoiceNoteLayout } from "@/components/voiceNoteLayout"
import { type Voice } from "@/types/voice"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { File } from "expo-file-system"
import { useFocusEffect } from "expo-router"
import { Search, X } from "lucide-react-native"
import { useCallback, useState } from "react"
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


export default function Home() {

  const [recordings, setRecordings] = useState<Voice[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  // retrieve saved recordings
  const getRecordings = async () => {
    const data = await AsyncStorage.getItem("recordings")
    setRecordings(JSON.parse(data || "[]"))
  }

  // delete the recording and its audio file
  const deleteRecording = async (voice: Voice) => {
    try {
      // remove the recording from the list
      const updatedRecordings = recordings.filter(item => item.id !== voice.id)
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

  //filter recordings by name
  const filteredRecordings = recordings.filter(item =>
    item.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  )
  //show or hide the search input 
  const toggleSearch = () => {
    setShowSearch(!showSearch)
    setSearchTerm("")
  }
  // refresh recordings whenever the home page mounts
  useFocusEffect(
    useCallback(() => {
      getRecordings()
    }, [])
  )

  // display an image  when the list is empty
  const emptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        {/* display the image based on the condition*/}
        <Image source={recordings.length === 0 ? require("../../assets/illustrations/empty-state.png") : require("../../assets/illustrations/no_results.png")} style={styles.illustration} resizeMode="contain" />
        <Text style={styles.emptyTitle}> {recordings.length === 0 ? "No recordings yet" : "No results found"}</Text>
        <Text style={styles.emptyDescription}>{recordings.length === 0 ? "Tap the microphone to create your first recording." : "Try searching for a different recording name."}  </Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header onSearch={toggleSearch} />
      {showSearch && (
        <View style={styles.searchContainer}>
          <Search size={20} color={'#717171'} />
          <TextInput style={styles.searchInput} placeholder="Search recordings..." placeholderTextColor={'#717171'} value={searchTerm} onChangeText={setSearchTerm} autoFocus />
          <Pressable onPress={toggleSearch}> <X size={20} color={'#717171'} /> </Pressable>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.heading}>
          <Text style={styles.title}>My Recordings</Text>
          <Text style={styles.count}>{filteredRecordings.length} recordings</Text>
        </View>
        {/* display saved or filtered recordings */}
        <FlatList data={filteredRecordings} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (
          <VoiceNoteLayout voice={item} onDelete={() => deleteRecording(item)} onRename={(name) => renameRecording(item.id, name)} />
        )}
          ListEmptyComponent={emptyState} contentContainerStyle={filteredRecordings.length === 0 ? styles.emptyList : undefined
          } showsVerticalScrollIndicator={false} bounces={false} overScrollMode="never" keyboardShouldPersistTaps="handled" />
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
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDFDFD',
    borderWidth: 1,
    borderColor: '#717171',
    borderRadius: 9,
    paddingHorizontal: 12,
    marginTop: 15,
    height: 45,
    gap: 10
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000000'
  },
  emptyList: {
    flexGrow: 1
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10
  },
  illustration: {
    width: 220,
    height: 220,
    borderRadius:9
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  emptyDescription: {
    fontSize: 14,
    color: '#717171',
    textAlign: 'center',
    lineHeight: 20
  }
})