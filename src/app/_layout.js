import { Stack } from 'expo-router/stack';

export default function Layout() {
    return (
        <Stack initial='novadenuncia' screenOptions={{
            headerStyle: {
                backgroundColor: "#F1A801"
            },
            headerTintColor: "#FFF"
        }}>
            <Stack.Screen name='novadenuncia' options={{ title: "Cadastro de Denúncia", headerShown: true}}/>
            <Stack.Screen name='index' options={{ title: "Login", headerShown: false}}/>
            <Stack.Screen name='signup' options={{ title: "Cadastrar", headerShown: true}}/>
            <Stack.Screen name='menu' options={{ title: "Menu", headerShown: false}}/>

        </Stack>
    )
}