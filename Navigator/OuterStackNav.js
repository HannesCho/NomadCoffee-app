import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import UploadForm from "../screens/UploadForm";
import SharedTabNav from "./SharedTabNav";
import UploadNav from "./UploadNav";

const Stack = createStackNavigator();

export default function OuterStackNav() {
  return (
    <Stack.Navigator screenOptions={{ presentation: "modal" }}>
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={SharedTabNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadForm"
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
          title: "Upload",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
        }}
        component={UploadForm}
      />
    </Stack.Navigator>
  );
}
