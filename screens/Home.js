import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default function Home({navigation}) {
  return (
    <SafeAreaView>
      <View
        style={{
          width: '100%',
          height: '35%',
          backgroundColor: '#7B1FA2',
          borderBottomRightRadius: 50,
          marginBottom: 30,
        }}>
        <View style={{flex: 2}}>
          <Text style={my_styles.mainTitle}>The Bread App</Text>
        </View>
        <View style={{alignItems: 'center', flex: 3}}>
          <Image
            source={require('../images/bread_pics/main.jpg')}
            style={{
              height: 100,
              width: '80%',
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{padding: 8}}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 18,
            }}>
            Make Your Own Healthy Bread
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 30,
          paddingHorizontal: 16,
          height: '50%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            style={my_styles.touchableMain}
            onPress={() => {
              navigation.navigate('Recipes');
            }}>
            <Image
              source={require('../images/bread_pics/classic_white_loaf.jpg')}
              style={my_styles.touchableImage}
            />
            <Text style={my_styles.iconText}>Recipes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={my_styles.touchableMain}
            onPress={() => {
              navigation.navigate('Favorites');
            }}>
            <Image
              source={require('../images/bread_pics/favorite.png')}
              style={my_styles.touchableImage}
            />
            <Text style={my_styles.iconText}>Favorites</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginVertical: 20,
          }}>
          <TouchableOpacity
            style={my_styles.touchableMain}
            onPress={() => {
              navigation.navigate('Convert');
            }}>
            <Image
              source={require('../images/bread_pics/weigh_balances.png')}
              style={my_styles.touchableImage}
            />
            <Text style={my_styles.iconText}>Convert</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={my_styles.touchableMain}
            onPress={() => {
              navigation.navigate('Membership');
            }}>
            <Image
              source={require('../images/bread_pics/members.jpg')}
              style={my_styles.touchableImage}
            />
            <Text style={my_styles.iconText}>Membership</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const my_styles = StyleSheet.create({
  mainTitle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  touchableMain: {
    backgroundColor: '#7B1FA2',
    width: 120,
    height: 130,
    borderRadius: 20,
    padding: 16,
    paddingBottom: 30,
  },
  touchableImage: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
  },
  iconText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
    fontSize: 16,
  },
});
