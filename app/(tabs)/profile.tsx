import GoalsSection from "@/components/profile/GoalsSection";
import ProfileHeader from "@/components/profile/ProfileHeader";
import SettingsSection from "@/components/profile/SettingsSection";
import SummaryMetrics from "@/components/profile/SummaryMetrics";
import WeightProgress from "@/components/profile/WeightProgress";
import useProfileLogic from "@/hooks/useProfileLogic";
import { ScrollView, View } from "react-native";

export default function Profile() {
  const {
    user,
    age,
    setAge,
    weight,
    setWeight,
    height,
    setHeight,
    gender,
    setGender,
    activityLevel,
    setActivityLevel,
    weightHistory,
    editingStartWeight,
    setEditingStartWeight,
    startWeightInput,
    handleStartWeightInputChange,
    handleSaveStartWeight,
    calculateBMR,
    calculateTDEE,
    calculateBMI,
    getWeightChartData,
  } = useProfileLogic();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#faf8f3",
      }}
    >
      <ProfileHeader email={user?.email} />

      {/* Main Content */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
        <SummaryMetrics age={age} bmi={calculateBMI()} tdee={calculateTDEE()} bmr={calculateBMR()} />

        {weightHistory.length > 0 && (
          <WeightProgress
            weightHistory={weightHistory}
            chartData={getWeightChartData()}
            editingStartWeight={editingStartWeight}
            startWeightInput={startWeightInput}
            onStartWeightInputChange={handleStartWeightInputChange}
            onEditStartWeight={() => setEditingStartWeight(true)}
            onSaveStartWeight={handleSaveStartWeight}
            onCancelEdit={() => setEditingStartWeight(false)}
          />
        )}

        <GoalsSection />
        <SettingsSection
          gender={gender}
          setGender={setGender}
          activityLevel={activityLevel}
          setActivityLevel={setActivityLevel}
          age={age}
          setAge={setAge}
          weight={weight}
          setWeight={setWeight}
          height={height}
          setHeight={setHeight}
        />
      </View>
    </ScrollView>
  );
}
