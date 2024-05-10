import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '../screens/Login';
import { SignUp } from "../screens/SignUp";

const Stack = createStackNavigator();

export default function StackRoutes() {
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
                gestureEnabled: true
             }}
             />
        </Stack.Navigator>
    )
}