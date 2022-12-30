import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing,
} from 'react-native';

export default function ToggleButton({onPressToggle}) {
  const positionButton = useRef(new Animated.Value(0)).current;

  const [isOn, setIsOn] = useState(false);

  const startAnimToOff = () => {
    Animated.timing(positionButton, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const startAnimToOn = () => {
    Animated.timing(positionButton, {
      toValue: 1,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
  };

  const positionInterPol = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  const backgroundColorAnim = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000', '#fff'],
  });

  const roundViewColorAnim = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#000'],
  });

  const initialOpacityOn = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const initialOpacityOff = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const onPress = () => {
    if (isOn) {
      startAnimToOff();
      setIsOn(false);
    } else {
      startAnimToOn();
      setIsOn(true);
    }
    onPressToggle(isOn);
  };

  return (
    <TouchableOpacity
      style={{height: 30, width: 60}}
      activeOpacity={0.9}
      onPress={onPress}>
      <Animated.View
        style={[
          styles.mainStyes,
          {
            backgroundColor: backgroundColorAnim,
          },
        ]}>
        {/* <Animated.Text
          style={[
            styles.eahcStyles,
            {
              opacity: initialOpacityOn,
            },
          ]}>
          On
        </Animated.Text>
        <Animated.Text
          style={[
            styles.eahcStylesOf,
            {
              backgroundColor: backgroundColorAnim,
              opacity: initialOpacityOff,
            },
          ]}>
          Off
        </Animated.Text> */}
        <Animated.View
          style={[
            styles.basicStyle,
            {backgroundColor: roundViewColorAnim},
            {
              transform: [
                {
                  translateX: positionInterPol,
                },
              ],
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  basicStyle: {
    height: 20,
    width: 20,
    borderRadius: 20,
    marginTop: 5,
    marginLeft: 5,
  },
  eahcStyles: {
    fontSize: 14,
    color: '#fff',
    position: 'absolute',
    top: 6,
    left: 5,
  },

  eahcStylesOf: {
    fontSize: 14,
    color: '#000',
    position: 'absolute',
    top: 6,
    right: 5,
  },
  mainStyes: {
    borderRadius: 30,
    backgroundColor: '#fff',
    height: 30,
    width: 60,
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
