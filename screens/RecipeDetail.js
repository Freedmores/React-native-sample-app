import {faL} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function RecipeDetail({route, navigation}) {
  const [favorite, setFavorite] = useState(false);
  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 24, margin: 20}}>
          {route.params.bread_name}
        </Text>
        <Image
          source={route.params.bread_image}
          style={{width: 300, height: 300, borderRadius: 10, marginBottom: 16}}
        />
      </View>
      <View style={{justifyContent: 'flex-start', paddingLeft: 30}}>
        <TouchableOpacity
          onPress={() => {
            favorite ? setFavorite(false) : setFavorite(true);
          }}>
          <Image
            style={{width: 40, height: 40}}
            source={
              favorite
                ? require('../images/bread_pics/favorite.png')
                : require('../images/bread_pics/grey_heart.png')
            }
          />
        </TouchableOpacity>
      </View>
      <View style={{paddingLeft: 30, paddingRight: 30}}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>Ingredients</Text>
        <Text style={{fontSize: 14}}>{route.params.bread_ingredients}</Text>
        <Text>-------------------------------------------</Text>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>Praparation</Text>
        <Text style={{fontSize: 14}}>{route.params.bread_preparation}</Text>
      </View>
    </View>
  );
}
