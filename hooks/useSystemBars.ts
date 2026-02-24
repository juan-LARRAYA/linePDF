import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { setStatusBarHidden } from 'expo-status-bar';
import { Platform } from 'react-native';

export function useSystemBars(hidden: boolean) {
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (hidden) {
        NavigationBar.setVisibilityAsync('hidden');
        NavigationBar.setBehaviorAsync('inset-swipe');
      } else {
        NavigationBar.setVisibilityAsync('visible');
        NavigationBar.setBehaviorAsync('default');
      }
    }
    setStatusBarHidden(hidden, 'fade');
  }, [hidden]);
}
