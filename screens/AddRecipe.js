import React, {useEffect, useState} from 'react';
import {
  View,
  Alert,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import BreadImages from '../images/ImageModel';

let db = openDatabase({name: 'bread.db'});

export default function AddRecipe({navigation}) {
  const [breadName, setBreadName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preparation, setPreparation] = useState('');
  const [imageUrl, setImageUrl] = useState(1);
  const [favorite, setFavorite] = useState(0);

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='bread_table'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS bread_table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS bread_table (bread_id INTEGER PRIMARY KEY AUTOINCREMENT, bread_name VARCHAR(30), ingredients VARCHAR(800), preparation VARCHAR(900),image_url INTEGER,fav INTEGER)',
              [],
            );
          }
        },
      );
    });
  }, []);

  const insertData = () => {
    if (breadName == '' || ingredients == '' || preparation == '') {
      Alert.alert('Please Enter All the Values');
    } else {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO bread_table (bread_name, ingredients, preparation,image_url,fav) VALUES (?,?,?,?,?)',
          [breadName, ingredients, preparation, imageUrl, favorite],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert('Data Inserted Successfully....');
              setBreadName('');
              setIngredients('');
              setPreparation('');
            } else Alert.alert('Failed....');
          },
        );
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.mainContainer}>
        <Text style={{fontSize: 24, textAlign: 'center', color: '#000'}}>
          Add New Recipe
        </Text>

        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => setBreadName(text)}
          placeholder="Enter Bread Name"
          value={breadName}
        />

        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => setIngredients(text)}
          placeholder="Enter the ingedients separated by a comma"
          value={ingredients}
        />

        <TextInput
          style={[styles.textInputStyle, {marginBottom: 20}]}
          onChangeText={text => setPreparation(text)}
          multiline
          numberOfLines={5}
          placeholder="Enter preparation steps seperated by a comma"
          value={preparation}
        />

        <TouchableOpacity style={styles.touchableOpacity} onPress={insertData}>
          <Text style={styles.touchableOpacityText}> Save Recipe </Text>
        </TouchableOpacity>
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
    backgroundColor: '#7B1FA2',
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
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
    textAlign: 'left',
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
