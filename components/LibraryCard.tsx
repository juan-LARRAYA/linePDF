import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { PDFEntry } from '../hooks/useLibrary';

interface Props {
  entry: PDFEntry;
  onPress: () => void;
  onLongPress: () => void;
}

export function LibraryCard({ entry, onPress, onLongPress }: Props) {
  const date = new Date(entry.lastOpened).toLocaleDateString('es', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.6}
    >
      <View style={styles.icon}>
        <Text style={styles.iconText}>PDF</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {entry.name}
        </Text>
        <Text style={styles.meta}>
          {entry.totalPages > 0 ? `${entry.totalPages} páginas · ` : ''}
          {date}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#222',
  },
  icon: {
    width: 44,
    height: 54,
    backgroundColor: '#1e1e1e',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#333',
  },
  iconText: {
    color: '#555',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#e8e8e8',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
    lineHeight: 20,
  },
  meta: {
    color: '#555',
    fontSize: 12,
  },
});
