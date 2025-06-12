import { View, Text, ScrollView } from "react-native";
import { ImageBackground } from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { Card, CardContent } from "@/src/components/ui/Card";
import { Separator } from "@/src/components/ui/Seperator";

export default function ScienceScreen() {
  const BigSection = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
    <Card className="bg-white/10 border-white/15 border mb-6">
      <CardContent className="p-5">
        <View className="flex-row items-center mb-4">
          {icon}
          <Text className="text-xl text-white font-bold ml-3">{title}</Text>
        </View>
        <View className="space-y-3">{children}</View>
      </CardContent>
    </Card>
  );

  const Highlight = ({ text }: { text: string }) => (
    <Text className="text-white italic text-sm pt-4">“{text}”</Text>
  );

  const Paragraph = ({ text }: { text: string }) => (
    <Text className="text-white/80 text-base leading-relaxed">{text}</Text>
  );

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      className="flex-1 px-5 py-12 mb-10"
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <Text className="text-4xl font-extrabold text-white mb-3">The Science</Text>
        <Text className="text-white/70 mb-8 text-base leading-relaxed">
          Cortune is more than music. It’s a physiological tool. Designed to align heart, mind and rhythm for one goal: optimal human performance.
        </Text>

        <BigSection icon={<Ionicons name="headset" size={22} color="white" />} title="Custom-Made Music">
          <Paragraph text="Custom tracks have no history, no bias — a clean slate for deep emotional guidance." />
          <Highlight text="Music can be a portal to our subconscious mind." />
        </BigSection>

        <BigSection icon={<FontAwesome5 name="heartbeat" size={22} color="white" />} title="Heart Rate Entrainment">
          <Paragraph text="Synchronizing music to your live heart rate improves immersion, coordination and emotional syncing — it's not aesthetic, it's neurological." />
          <Highlight text="Heart-rate-based tempo is neurologically optimized entrainment." />
        </BigSection>

        <BigSection icon={<MaterialCommunityIcons name="fire" size={22} color="white" />} title="Mental Fatigue Recovery">
          <Paragraph text="Alpha/theta brainwave rise = fatigue. Cortune injects energizing, lyric-free rhythm to restore clarity. In rest states, it downshifts to promote calm." />
          <Highlight text="Exciting music lowered fatigue markers. Soothing music accelerated EEG recovery." />
        </BigSection>

        <BigSection icon={<MaterialCommunityIcons name="pulse" size={22} color="white" />} title="Real-Time Biofeedback">
          <Paragraph text="Your nervous system speaks in HRV. Cortune listens — adjusting stimulation or calm based on your bio-data." />
          <Highlight text="Music can change your physiological state — without a single thought." />
        </BigSection>

        <BigSection icon={<Ionicons name="flash" size={22} color="white" />} title="Motivation, Self-Belief, and Flow">
          <Paragraph text="Dopamine surges from emotionally matched music can improve self-image, drive and task retention. Especially powerful for low-confidence users." />
          <Highlight text="Happy music increased self-esteem, particularly for low-confidence listeners." />
        </BigSection>

        <BigSection icon={<MaterialCommunityIcons name="brain" size={22} color="white" />} title="Expanded Consciousness">
          <Paragraph text="Cortune guides you into a state of expanded presence, where past, now and anticipation become one timeline. Welcome to pre-reflective awareness." />
          <Highlight text="Musical consciousness extends the self across time." />
        </BigSection>

        <Separator className="my-6 bg-white/20 h-0.5" />
        <Text className="text-white/40 text-xs text-center">
          Cortune is not music streaming. It's real-time state engineering.
        </Text>
      </ScrollView>
    </ImageBackground>
  );
}
