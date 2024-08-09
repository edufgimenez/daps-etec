import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '../screens/Login';
import { SignUp } from "../screens/SignUp";
import { Main } from '../screens/Main';
import { NovaDenuncia } from '../screens/NovaDenuncia';

const Stack = createStackNavigator();

export default function StackRoutes() {
    return(
        <Stack.Navigator initialRouteName='NovaDenuncia'>
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
             <Stack.Screen
             name = "Main"
             component={Main}
             options={{headerShown: false}}
             />
            <Stack.Screen
             name = 'NovaDenuncia'
             component={NovaDenuncia}
             options={{
                headerShown: true,
                title: 'Cadastro de Denúncia',
                animation: 'slide_from_right',
                gestureEnabled: true
            }}
             />
        </Stack.Navigator>
    )
}