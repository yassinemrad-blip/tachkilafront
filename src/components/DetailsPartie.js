import React, {useEffect, useContext} from 'react';
import {View, StyleSheet, Text, ScrollView, Button} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Context as AuthContext} from '../context/AuthContext';
import Moment from 'moment';
import api from '../api/tachkila';

const DetailsPartie = (props) => {
  const route = useRoute();
  const [data, setData] = useState(route.params.data);
  //const data = route.params.data;
  const f = route.params.f;
  const navigation = useNavigation();
  const max = data.nombre;
  const dispo = data.membre.length;

  const {state} = useContext(AuthContext);

  const [rejoindre, setRejoindre] = useState(false);

  const ajouterMembre = () => {
    if (!rejoindre) {
      api
        .put('/ajouterMembre', {idpartie: data._id, userid: state.iduser})
        .then((res) => {
          console.log('membreeee', res.data);
        });
      console.log(data);
    } else {
      api
        .put('/effacerMembre', {idpartie: data._id, userid: state.iduser})
        .then((res) => {
          console.log('membreeee', res.data);
        });
    }
  };
  const getDataPartie = async (id) => {
    await api.post('/partieById', {_id: id}).then((res) => {
      setData(res.data, id);
    });
  };

  useEffect(() => {
    getDataPartie(data._id);
    for (let i = 0; i < data.membre.length; i++) {
      if (data.membre[i] === state.iduser) {
        setRejoindre(true);
      }
    }
  }, [getDataPartie]);

  return (
    <View style={styles.container}>
      {/* <View style={styles.containerf}>
                <TouchableOpacity onPress={() => navigation.navigate('Liste')} >
                    <MaterialCommunityIcons name="keyboard-backspace" color={'#00818A'} size={50} />
                </TouchableOpacity>

            </View> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeInUpBig">
          <View style={styles.item}>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 10,
              }}>
              <FontAwesome5 name={'map-marker-alt'} size={20} left={50} />
              <Text
                style={{
                  textAlign: 'left',
                  marginLeft: 5,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                {data.localisation}
              </Text>
            </View>
            <View style={styles.contenu}>
              <Text style={styles.text}>{data.titre}</Text>

              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                Tranches d'age: {data.tranchedage}
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                Niveau: {data.niveau}
              </Text>
            </View>
            <View
              style={
                (styles.contenu,
                {
                  position: 'absolute',
                  top: '25%',
                  width: 240,
                  height: 300,
                  marginLeft: '5%',
                  borderWidth: 2,
                  borderColor: '#707070',
                  paddingLeft: 10,
                  marginBottom: 20,
                  paddingRight: 10,
                })
              }>
              <ScrollView>
                <Text
                  style={{marginBottom: 10, fontWeight: 'bold', fontSize: 16}}>
                  Description:
                </Text>
                <Text>{data.description}</Text>
                <Text style={{marginTop: 10, fontWeight: 'bold'}}>
                  Nombre de joueurs maximum: {max}
                </Text>
                <Text style={{marginTop: 10, fontWeight: 'bold'}}>
                  Nombre de joueurs disponible: {dispo}
                </Text>
              </ScrollView>
            </View>
            <Text style={{marginTop: 30, fontWeight: 'bold', fontSize: 16}}>
              Date: {Moment(data.dateestime).format('DD/MM/YYYY')}
            </Text>
            <Text style={{marginBottom: 10, fontWeight: 'bold', fontSize: 16}}>
              Heure: {Moment(data.dateestime).format('hh:mm')}
            </Text>

            <View style={styles.rejoindre}>
              <Button
                color="#59C9A5"
                onPress={() => {
                  ajouterMembre();

                  setRejoindre(!rejoindre);
                }}
                title={rejoindre ? 'Rejoindre' : 'Ajouté'}
              />
            </View>
            <View style={styles.retour}>
              <Button
                color="#59C9A5"
                onPress={() => navigation.navigate('Liste')}
                title="Retour"
              />
            </View>
          </View>
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingRight: 0,
    paddingBottom: 10,
    justifyContent: 'center',
    backgroundColor: '#00EFA1',
    alignItems: 'center',
  },
  containerf: {
    flex: 2,
    paddingTop: 20,
    backgroundColor: '#00EFA1',
  },

  text: {
    paddingLeft: 10,
    color: '#7EB77F',
    fontSize: 25,
    paddingTop: 2,
    marginTop: 2,

    fontWeight: 'bold',
    paddingBottom: 5,
    textAlign: 'center',
  },
  contenu: {
    flex: 2,
  },
  item: {
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 10,

    borderRadius: 5,
    backgroundColor: 'white',
    width: 270,
    height: 600,
    padding: 10,
  },

  rejoindre: {
    marginBottom: 5,
    color: '#7EB77F',
  },
  retour: {
    marginTop: 5,
    color: '#7EB77F',
  },
});

export default DetailsPartie;
