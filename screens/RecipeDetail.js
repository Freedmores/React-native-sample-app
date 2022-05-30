import {faL} from '@fortawesome/free-solid-svg-icons';
import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {openDatabase} from 'react-native-sqlite-storage';

export default function RecipeDetail({route, navigation}) {
  let favorite = 0;

  let db = openDatabase({name: 'bread.db'});
  let br_id = route.params.bread_id;

  const editFavorite = () => {
    favorite = 1;
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE bread_table set fav=? where bread_id=?',
        [favorite, br_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            alert('Recipe added to favorites...');
          } else alert('Error');
        },
      );
    });
  };

  const deleteFavorite = () => {
    favorite = 0;
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE bread_table set fav=? where bread_id=?',
        [favorite, br_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            alert('Recipe removed from favorites');
          } else alert('Error');
        },
      );
    });
  };

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
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity onPress={editFavorite}>
          <Image
            style={{width: 40, height: 40}}
            source={require('../images/bread_pics/favorite.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteFavorite}>
          <Image
            style={{width: 40, height: 40}}
            source={require('../images/icons/bin.png')}
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
