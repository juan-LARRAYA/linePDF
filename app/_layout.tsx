import { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Stack, router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Linking from 'expo-linking';

// Maneja PDFs abiertos desde otras apps ("Abrir con")
function useIncomingPDF() {
  useEffect(() => {
    if (Platform.OS === 'web') return;

    const handleUrl = (url: string) => {
      if (url && url.endsWith('.pdf') || url.includes('application/pdf') || url.startsWith('content://')) {
        const name = url.split('/').pop()?.replace(/\.pdf$/i, '') ?? 'Documento';
        router.push({ pathname: '/reader', params: { uri: url, name } });
      }
    };

    // PDF abierto cuando la app ya estaba corriendo
    const sub = Linking.addEventListener('url', ({ url }) => handleUrl(url));

    // PDF abierto al iniciar la app
    Linking.getInitialURL().then((url) => {
      if (url) handleUrl(url);
    });

    return () => sub.remove();
  }, []);
}

export default function RootLayout() {
  useEffect(() => {
    // expo-screen-orientation solo funciona en móvil
    if (Platform.OS !== 'web') {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }
  }, []);

  useIncomingPDF();

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
});
