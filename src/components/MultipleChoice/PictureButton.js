import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Images from '../../assets/pictures/dynamicRequire'

export default class PictureButton extends Component {

  render() {
    const disabled = this.props.disabled
    return (
      <TouchableOpacity style={styles[this.props.size]}
                        onPress={this.props._checkIfCorrect}
                        disabled={disabled} >
        <View style={{justifyContent: 'center', alignItems: 'center'}} >
          <Image source={Images[this.props.picture]}
                 style={[styles[this.props.size], {opacity: disabled ? .5 : 1}]} />
          {disabled && <Text style={styles.x}>X</Text>}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  small: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  large: {
    width: 200,
    height: 200,
    borderRadius: 25,
  },
  x: {
    opacity: .25,
    position: 'absolute',
    fontSize: 100,
    color: 'red'
  }
})
