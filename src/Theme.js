import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export const scaleWidth = SCREEN_WIDTH / 375;
export const scaleHeight = SCREEN_HEIGHT / 812;
export const _scale = Math.min(scaleWidth, scaleHeight);

export function normalize(size) {
  return Math.ceil(size * _scale);
}

const Theme = {
  light: {
    background: '#fff',
    title: '#000',
    outerPolygon: '#3498DB',
    innerPolygon: '#E74C3C',
  },
  dark: {
    background: '#000',
    title: '#fff',
    outerPolygon: '#E74C3C',
    innerPolygon: '#3498DB',
  },
};

export default Theme;
