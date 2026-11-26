import { BottomNavigation } from "@/components/bottomNavigation";
import { Header } from "@/components/header";
import { VoiceNoteLayout } from "@/components/voiceNoteLayout";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView >
      <Header />
      <VoiceNoteLayout id={1} name="My first recording" duration="1m2s" date="26 November 2026:10:52" filepath="" />
      <BottomNavigation/>

    </SafeAreaView>
  )
}
