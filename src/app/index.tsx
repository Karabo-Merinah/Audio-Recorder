import { Header } from "@/components/header";
import { VoiceNoteLayout } from "@/components/voiceNoteLayout";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    return (
        <SafeAreaView >
           <Header/>
           <VoiceNoteLayout/>
        </SafeAreaView>
    )
}
