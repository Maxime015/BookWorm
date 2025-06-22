// ✅ Polyfill pour Web
if (typeof setImmediate === 'undefined') {
  global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}

import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  useWindowDimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

const slides = [
  {
    title: 'Share your readings, discover those of the community',
    message: 'Reading is better together. Explore, share, and connect with fellow book lovers.',
    action: 'Get started',
    image: require('../../assets/images/a.png'),
  },
  {
    title: 'Find your next read with authentic recommendations from real readers.',
    message: 'Discover books that truly matter, handpicked and reviewed by passionate readers like you.',
    action: 'Continue',
    image: require('../../assets/images/b.png'),
  },
  {
    title: 'Join a passionate book community and enrich your library of ideas.',
    message: 'Expand your horizons, exchange reviews, and build your personal reading journey.',
    action: 'Continue',
    image: require('../../assets/images/c.png'),
  },
  {
    title: 'A simple and friendly space to share and explore literary favorites.',
    message: 'Add, rate, and review books with ease. Your next favorite read is just a click away!',
    action: 'Start exploring',
    image: require('../../assets/images/d.png'),
  },
];

export default function LandingPage() {
  const { width, height } = useWindowDimensions();
  const [slide, setSlide] = useState(0);
  const swiper = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const contentOpacity = scrollX.interpolate({
    inputRange: slides.flatMap((_, i) => [i * width, i * width + width / 2]),
    outputRange: slides.flatMap(() => [1, 0.2]),
  });

  const handleButtonPress = (index) => {
    if (index === slides.length - 1) {
      navigation.navigate('login');
    } else {
      swiper.current.scrollBy(1, true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        ref={swiper}
        showsPagination={false}
        loop={false}
        onIndexChanged={setSlide}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={1}
      >
        {slides.map(({ title, message, action, image }, index) => (
          <Animated.View key={index} style={[styles.slide, { opacity: contentOpacity }]}>
            <Image
              source={image}
              resizeMode="contain"
              style={{
                width: width * 0.9,
                height: height * 0.45,
                alignSelf: 'center',
                marginBottom: 20,
              }}
            />
            <Text
              style={styles.slideTitle}
              adjustsFontSizeToFit
              numberOfLines={2}
            >
              {title}
            </Text>
            <Text style={styles.slideText}>{message}</Text>

            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(index)}>
              <Text style={styles.buttonText}>{action}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecf4',
  },
  slide: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: '6%',
    paddingBottom: '8%',
  },
  slideTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: '#0d0d0d',
    marginBottom: 12,
    textAlign: 'center',
  },
  slideText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0d0d0d',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#075eec',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: '10%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});
