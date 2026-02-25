import React, { useCallback } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as DocumentPicker from 'expo-document-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useLibrary, type PDFEntry } from '../hooks/useLibrary';
import { copyPdfToStorage } from '../utils/fileStorage';
import { LibraryCard } from '../components/LibraryCard';

export default function LibraryScreen() {
  const insets = useSafeAreaInsets();
  const { library, addOrUpdate, remove } = useLibrary();

  const openPicker = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets?.length) return;

      const asset = result.assets[0];
      const filename = asset.name ?? `documento_${Date.now()}.pdf`;

      // En web expo-file-system no está disponible, usamos la URI directamente
      const permanentUri = Platform.OS === 'web'
        ? asset.uri
        : await copyPdfToStorage(asset.uri, filename);

      const entry: PDFEntry = {
        uri: permanentUri,
        name: filename.replace(/\.pdf$/i, '').replace(/_/g, ' '),
        lastOpened: Date.now(),
        totalPages: 0,
      };

      addOrUpdate(entry);
      router.push({ pathname: '/reader', params: { uri: permanentUri, name: entry.name } });
    } catch {
      Alert.alert('Error', 'No se pudo abrir el PDF. Intentá de nuevo.');
    }
  }, [addOrUpdate]);

  const openEntry = useCallback(
    (entry: PDFEntry) => {
      addOrUpdate({ ...entry, lastOpened: Date.now() });
      router.push({ pathname: '/reader', params: { uri: entry.uri, name: entry.name } });
    },
    [addOrUpdate]
  );

  const handleLongPress = useCallback(
    (entry: PDFEntry) => {
      Alert.alert(entry.name, '¿Eliminar de la librería?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => remove(entry.uri) },
      ]);
    },
    [remove]
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>linePDF</Text>
        <TouchableOpacity style={styles.addButton} onPress={openPicker} activeOpacity={0.7}>
          <Text style={styles.addText}>+ Abrir</Text>
        </TouchableOpacity>
      </View>

      {library.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>📄</Text>
          <Text style={styles.emptyTitle}>Sin libros</Text>
          <Text style={styles.emptySubtitle}>Tocá "+ Abrir" para agregar un PDF</Text>
        </View>
      ) : (
        <FlatList
          data={library}
          keyExtractor={(item) => item.uri}
          renderItem={({ item }) => (
            <LibraryCard
              entry={item}
              onPress={() => openEntry(item)}
              onLongPress={() => handleLongPress(item)}
            />
          )}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#222',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  addButton: {
    backgroundColor: '#222',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  emptyTitle: {
    color: '#888',
    fontSize: 18,
    fontWeight: '600',
  },
  emptySubtitle: {
    color: '#444',
    fontSize: 14,
  },
});
