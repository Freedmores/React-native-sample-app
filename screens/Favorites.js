import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import RecipeDetail from './RecipeDetail';
import {BreadImages} from '../images/ImageModel';

export default function Favorites({navigation}) {
  let db = openDatabase({name: 'bread.db'});

  const [items, setItems] = useState([]);
  const [empty, setEmpty] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM bread_table WHERE fav=?',
        [true],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            let item = results.rows.item(i);
            temp.push({
              bread_id: item.bread_id,
              bread_name: item.bread_name,
              bread_image: item.image_url,
              bread_ingredients: item.ingredients,
              bread_preparation: item.preparation,
              isBreadFavorite: item.favorite,
            });
          }
          setItems(temp);

          if (results.rows.length >= 1) {
            setEmpty(false);
            console.log('Got Something');
          } else {
            setEmpty(true);
            console.log('Got Nothing');
          }
        },
      );
    });
  }, [isFocused]);

  const listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#ccc',
        }}
      />
    );
  };

  const emptyMSG = status => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text style={{fontSize: 25, textAlign: 'center'}}>
          No recipe marked as favorite
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View>
        {empty ? (
          emptyMSG(empty)
        ) : (
          <FlatList
            contentContainerStyle={{paddingBottom: 110}}
            data={items}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View
                key={item.bread_id}
                style={{
                  padding: 20,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('RecipeDetail', item)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={item.bread_image}
                    style={{width: 60, height: 60, borderRadius: 10}}
                  />
                  <Text style={styles.itemsStyle}> {item.bread_name} </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },

  touchableOpacity: {
    backgroundColor: '#0091EA',
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  touchableOpacityText: {
    color: '#FFFFFF',
    fontSize: 23,
    textAlign: 'center',
    padding: 8,
  },

  textInputStyle: {
    height: 45,
    width: '90%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#00B8D4',
    borderRadius: 7,
    marginTop: 15,
  },

  itemsStyle: {
    fontSize: 22,
    color: '#000',
  },
});
