import React, {useContext, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from '../../util/ThemeContaxt';
import ToggleButton from '../../Components/ToggelButton';

var theme2 = 'light';

const RadarChartScreen = ({}) => {
  const {theme, toggelTheme} = useContext(ThemeContext);
  useEffect(() => {
    theme2 = theme;
    console.log(theme2);
  }, [theme]);
  return (
    <SafeAreaView style={[styles.container, {flex: 1}]}>
      <View style={{flex: 1}}>
        <Text>Radar Chart Screen</Text>
        <ToggleButton
          onPressToggle={isOn => {
            toggelTheme();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default RadarChartScreen;

const styles =
  theme2 === 'light'
    ? StyleSheet.create({
        container: {
          backgroundColor: '#000',
        },
      })
    : StyleSheet.create({
        container: {
          backgroundColor: '#fff',
        },
      });
