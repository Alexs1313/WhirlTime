import {StyleSheet, View} from 'react-native';

import Svg, {Defs, RadialGradient, Stop, Rect} from 'react-native-svg';

const Gradient = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg
        height="100%"
        width="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Defs>
          <RadialGradient
            id="grad"
            cx="50%"
            cy="70%"
            rx="60%"
            ry="50%"
            fx="50%"
            fy="50%"
            gradientUnits="userSpaceOnUse">
            <Stop offset="20%" stopColor="#F4B821" stopOpacity="1" />
            <Stop offset="100%" stopColor="#520000" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Gradient;
