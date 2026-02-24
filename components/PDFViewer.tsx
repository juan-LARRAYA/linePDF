import React from 'react';
import { StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

interface Props {
  uri: string;
  onLoadComplete: (totalPages: number) => void;
  onPageChanged: (page: number) => void;
  onSingleTap: () => void;
  onError: (error: object) => void;
}

export function PDFViewer({ uri, onLoadComplete, onPageChanged, onSingleTap, onError }: Props) {
  return (
    <Pdf
      source={{ uri, cache: true }}
      style={styles.pdf}
      fitPolicy={0}
      horizontal={false}
      enablePaging={false}
      onLoadComplete={(numberOfPages) => onLoadComplete(numberOfPages)}
      onPageChanged={(page) => onPageChanged(page)}
      onPageSingleTap={() => onSingleTap()}
      onError={onError}
    />
  );
}

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    backgroundColor: '#111',
  },
});
