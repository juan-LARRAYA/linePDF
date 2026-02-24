import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import { PDFViewer } from '../components/PDFViewer';
import { ReaderOverlay } from '../components/ReaderOverlay';
import { useOverlay } from '../hooks/useOverlay';
import { useSystemBars } from '../hooks/useSystemBars';
import { useLibrary } from '../hooks/useLibrary';

export default function ReaderScreen() {
  const { uri, name } = useLocalSearchParams<{ uri: string; name: string }>();
  const { visible, toggle } = useOverlay();
  const { addOrUpdate } = useLibrary();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useSystemBars(true);

  const handleLoadComplete = useCallback(
    (pages: number) => {
      setTotalPages(pages);
      addOrUpdate({
        uri: uri as string,
        name: (name as string) ?? 'Sin título',
        lastOpened: Date.now(),
        totalPages: pages,
      });
    },
    [uri, name, addOrUpdate]
  );

  const handlePageChanged = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <PDFViewer
        uri={uri as string}
        onLoadComplete={handleLoadComplete}
        onPageChanged={handlePageChanged}
        onSingleTap={toggle}
        onError={(e) => console.warn('PDF error:', e)}
      />

      <ReaderOverlay
        visible={visible}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
