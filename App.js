import React from 'react';
import { StyleSheet, Text, View,Button,Alert } from 'react-native';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCH4CLro81HlZJ-raRKoOytDeMuhwogjIQ",
  authDomain: "signin-integration-215405.firebaseapp.com",
};

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});
export default class App extends React.Component {

 loginWithFacebook = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '226750358191015',
      { permissions: ['public_profile'] }
    );
  
    if (type === 'success') {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
  
      // Sign in with credential from the Facebook user.
      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
        // Handle Errors here.
      });
    }
  }

  loginWithGoogle = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '701891613865-ji5j5f48rcbd1bfnq4s89mi5dq8ugb7d.apps.googleusercontent.com',
        iosClientId: '701891613865-3cjbhhtcfsvj69the1n9vdbanur6hbtj.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      console.log(JSON.stringify(result));
      if (result.type === 'success') {
      /*  this.setState({
          userId:result.user.id,
          accessToken:result.accessToken,
          refreshToken:result.refreshToken,
          name:result.user.name,
          email:result.user.email,
          photoUrl:result.user.photoUrl
        });*/
       // this.accessTokenExport();
      //  await AsyncStorage.setItem('accessToken' , this.state.accessToken);
        console.log("Successful");
        Alert.alert("Hi");
        const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken);
        console.log("crucial");
        firebase.auth().signInAndRetrieveDataWithCredential(credential).then(
          Alert.alert("Not biscuit")
        ).catch((error) => {
          // Handle Errors here.
          Alert.alert("Biscuit");
        });
       // this.props.navigation.navigate('App');
      } else {
        return {cancelled: true};
      }
    } catch(e) {
      return {error: true};
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.loginWithGoogle} title = 'Sign in with google'/>
        <Button onPress={this.loginWithFacebook} title = 'Sign in with Facebook'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
