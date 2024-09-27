import { Stack } from 'expo-router/stack';

export default function Layout() {
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: "#F1A801"
            },
            headerTintColor: "#FFF",
            headerTitleAlign: "center",
        }}>
            <Stack.Screen name='consultadenuncias' options={{ title: "Consulta de Denúncias", headerShown: true}}/>
            <Stack.Screen name='index' options={{ title: "Login", headerShown: false}}/>
            <Stack.Screen name='menu' options={{ title: "Menu", headerShown: false}}/>
            <Stack.Screen name='novadenuncia' options={{ title: "Cadastro de Denúncia", headerShown: true}}/>
            <Stack.Screen name='signup' options={{ title: "Cadastrar", headerShown: true}}/>

        </Stack>
    )
}