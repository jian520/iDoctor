
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
} from 'react-native';


export  default class Loading extends Component {

  render() {

      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" style={{width:80, height:80,backgroundColor:'#cccccc',    borderRadius: 5}} />
        </View>
      );

  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },


});
