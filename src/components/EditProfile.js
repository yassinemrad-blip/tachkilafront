//import liraries
import React, { useContext, useState } from 'react'

import * as Animatable from 'react-native-animatable'
import { View, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DatePicker from 'react-native-datepicker'
import { Picker } from '@react-native-community/picker'
import LinearGradient from 'react-native-linear-gradient'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Context as AuthContext } from '../context/AuthContext';

// create a component
const EditProfile = ({route,navigation}) => {
    const { state, signup, updateUser } = useContext(AuthContext);
    const { user } = route.params;
    const [loading, setLoading] = useState(false);

    const [nom, setNom] = useState(user.nom);
    const [prenom, setPrenom] = useState(user.prenom);
    const [email, setEmail] = useState(user.email);
    const [datenaissance, setDatenaissance] = useState(user.datenaissance);
    const [localisation, setLocalisation] = useState(user.localisation);
    const [telephone, setTelephone] = useState(user.telephone);
    const [profession, setProfession] = useState(user.profession);
    const [niveau, setniveau] = useState(user.niveau);
    const [confirm_motdepasse, setConfirm_motdepasse] = useState(true);

    const [secureTextEntry, setsecureTextEntry] = useState(true);

    const [confirm_secureTextEntry, setConfirm_secureTextEntry] = useState(true);

    const [isvalideNom, setisValideNom] = useState(true);
    const [isvalidePrenom, setisValidePrenom] = useState(true);
    const [isvalideEmail, setisValideEmail] = useState(true);
    const [isvalideTel, setisValideTel] = useState(true);
    const [isvalideProfession, setisValideProfession] = useState(true);
    const [isvalideLocalisation, setisValideLocalisation] = useState(true);
    const [isvalideMotdepasse, setisValideMotdepasse] = useState(true);
    const [isvalideConfirmMotdepasse, setisValideConfirmMotdepasse] = useState(true);

    
    function handleValidNom(val) {
        if (val.trim().length >= 4) {
            setisValideNom(true);
        } else {
            setisValideNom(false);
        }
    }
    function handleValidPrenom(val) {
        if (val.trim().length >= 4) {
            setisValidePrenom(true);
        } else {
            setisValidePrenom(false);
        }
    }
    function handleValidEmail(val) {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(val) === false) {
            setisValideEmail(false)
        }
        else {

            setisValideEmail(true);

        }
    }

    function handleValidTel(val) {

        if (val.trim().length == 8) {
            setisValideTel(true);
        } else {
            setisValideTel(false);
        }
    }
    function handleValidProfession(val) {
        if (val.trim().length >= 4) {
            setisValideProfession(true);
        } else {
            setisValideProfession(false);
        }
    }
    function handleValidLocalisation(val) {
        if (val.trim().length >= 4) {
            setisValideLocalisation(true);
        } else {
            setisValideLocalisation(false);
        }
    }

    if (loading) {
        return <View style={{
            flex: 1, justifyContent: "center", flexDirection: "row",
            justifyContent: "space-around", padding: 10
        }}>
            <ActivityIndicator size="large" color="#00ff00" /></View>
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Modifier mon Compte !</Text>
            </View>
            <Animatable.View animation="fadeInUpBig"
                style={styles.footer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >

                    <View style={{
                        flexDirection: 'row', borderBottomWidth: 1,
                        borderBottomColor: '#f2f2f2',
                        paddingBottom: 5
                    }}>

                        <TextInput
                            placeholder="Nom"
                            value={nom}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(nom) => {
                                setNom(nom)
                            }}
                            onEndEditing={(e) => handleValidNom(e.nativeEvent.text)}
                        />


                    </View>
                    {isvalideNom ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg} > Nom doit etre plus que 4 caractères</Text>
                        </Animatable.View>
                    }

                    <View style={styles.action}>

                        <TextInput
                        value={prenom}
                            placeholder="Prénom"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(prenom) => {
                                setPrenom(prenom)
                            }}
                            onEndEditing={(e) => handleValidPrenom(e.nativeEvent.text)}
                        />

                    </View>
                    {isvalidePrenom ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg} > Prénom doit etre plus que 4 caractères</Text>
                        </Animatable.View>
                    }

                    <View style={styles.action}>

                        <TextInput
                        value={email}
                            placeholder="Adresse Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            textContentType="emailAddress"

                            onChangeText={(email) => {
                                setEmail(email)
                            }}
                            onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
                        />

                    </View>
                    {isvalideEmail ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg} > Veillez saisir une adresse email valide</Text>
                        </Animatable.View>
                    }

                    <View style={styles.action}>

                        <TextInput
                        value={telephone.toString()}
                        
                            placeholder="Numéro de Télephone"
                            style={styles.textInput}
                            autoCapitalize="none"
                            keyboardType={'numeric'}
                            
                            onChangeText={(e) => {
                                setTelephone(e)
                            }}
                            onEndEditing={(e) => handleValidTel(e.nativeEvent.text)}
                        />

                    </View>
                    {isvalideTel ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg} > Numéro de télèphone doit contenir 8 chiffres</Text>
                        </Animatable.View>
                    }

                    <View style={styles.action}>

                        <TextInput
                            placeholder="Profession"
                            style={styles.textInput}
                            value={profession}
                            autoCapitalize="none"
                            onEndEditing={(e) => handleValidProfession(e.nativeEvent.text)}
                            onChangeText={(profession) => {
                                setProfession(profession)
                            }}
                        />

                    </View>
                    {isvalideProfession ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg} > Profession doit contenir plus que 5 caractères</Text>
                        </Animatable.View>
                    }

                    <View style={styles.action}>

                        <TextInput
                            placeholder="Localisation"
                            style={styles.textInput}
                            value={localisation}
                            autoCapitalize="none"
                            onEndEditing={(e) => handleValidLocalisation(e.nativeEvent.text)}
                            onChangeText={(localisation) => {
                                setLocalisation(localisation)
                            }}
                        />

                    </View>
                    {isvalideLocalisation ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg} > Localisation doit contenir plus que 5 caractères</Text>
                        </Animatable.View>
                    }

                    <View style={styles.action}>
                        <DatePicker
                            style={{ width: 200 }}
                            date={datenaissance}
                            mode="date"
                            format="YYYY-MM-DD"
                            minDate="1950-01-01"
                            maxDate="2007-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 50
                                },
                                dateInput: {
                                    marginLeft: 96
                                }
                            }}
                            onDateChange={(date) => setDatenaissance(date)}
                        />
                    </View>
                    <View style={styles.action}>
                        <Picker
                            selectedValue={niveau}
                            style={{ height: 50, width: 150, color: '#05375a' }}
                            onValueChange={(itemValue, itemIndex) => { setniveau(itemValue) }
                            }
                        >

                            <Picker.Item label="Débutant" value="debutant" />
                            <Picker.Item label="Intérmediaire" value="intermediaire" />
                            <Picker.Item label="Avancé" value="avancé" />
                        </Picker>
                    </View>
  
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={async () => {
                                console.log(state);
                                //console.log({ nom, prenom, email, motdepasse, datenaissance, localisation, telephone, profession, niveau,iduser:state.iduser });
                                setLoading(true);
                                await updateUser({ nom, prenom, email, datenaissance, localisation, telephone, profession, niveau,userid:state.iduser }, navigation.navigate)

                                setLoading(false);
                            }}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#00EAA1']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Modifier</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: '#00EAA1',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>Profile</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </Animatable.View>



        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00EAA1'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 4,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 25
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: 12,
        paddingLeft: 10,
        color: '#05375a'
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    signIn: {
        width: 270,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    icon: {
        marginTop: 25
    },
    textS: {
        justifyContent: 'center',
        marginTop: 9,
        color: 'grey'
    },
    errorMsg: {
        color: '#ff0000',
        fontSize: 14
    },


})

//make this component available to the app
export default EditProfile;