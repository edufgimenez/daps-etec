import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from './screens/Login';
import { SignUp } from "./screens/SignUp";

const Stack = createNativeStackNavigator();

export function Routes() {
    return(
        <Stack.Navigator>
            <Stack.Screen
             name="Login" 
             component={Login} 
             options={{headerShown: false}}
             />

             <Stack.Screen
             name = "SignUp"
             component={SignUp}
             options={{
                title: 'Login',
                animation: "slide_from_right",
             }}
             />
        </Stack.Navigator>
    )
}

