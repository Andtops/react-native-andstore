import LottieView from 'lottie-react-native';
import {StyleSheet, View} from 'react-native';

const Loader = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        source={require('../../assets/splash/loader.json')}
        autoPlay
        loop={true}
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    width: 100,
    height: 100
  },
});

export default Loader;
