import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Primary, secondary } from '../utillis/colors';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import MySlider from '../components/MySlider';
import CardsFlatlist from '../components/CardsFlatlist';
const Cartoons = ({ navigation }) => {
  const { cartoonData, animated1Data, animated2Data, animatedSlider } =
    useSelector(state => state.root.user);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 70 }}>
        <Header />
        <MySlider Movies={animatedSlider} />
        <CardsFlatlist navigation={navigation} heading={'Trending'} data={cartoonData} type={"Movies"} />
        <CardsFlatlist navigation={navigation} heading={'Popular'} data={animated1Data} type={"Movies"} />
        <CardsFlatlist navigation={navigation} heading={'new'} data={animated2Data} type={"Movies"} />
      </ScrollView>
    </View>
  );
};

export default Cartoons;

const styles = StyleSheet.create({
  container: {
    backgroundColor: secondary,
    flex: 1,
  },
  Heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 16,
  },
});
