import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

interface Props {
  visible: boolean;
  currentPage: number;
  totalPages: number;
}

export function ReaderOverlay({ visible, currentPage, totalPages }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [visible, opacity]);

  return (
    <Animated.View
      style={[styles.container, { opacity }]}
      pointerEvents={visible ? 'box-none' : 'none'}
    >
      {/* Top bar */}
      <View style={[styles.topBar, { paddingTop: Math.max(insets.top, 16) }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹ Librería</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom bar */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        {totalPages > 0 && (
          <Text style={styles.pageText}>
            {currentPage} / {totalPages}
          </Text>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    zIndex: 10,
  },
  topBar: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingRight: 12,
  },
  backText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  bottomBar: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    paddingTop: 14,
  },
  pageText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    letterSpacing: 1,
  },
});
