import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Images from '../../assets/pictures/dynamicRequire'
import { styles } from './styleModule'

export default class PictureButton extends Component {

  render() {
    const disabled = this.props.disabled
    return (
      <TouchableOpacity style={styles[this.props.size + 'RoundedSquare']}
                        onPress={this.props._checkIfCorrect}
                        disabled={disabled} >
        <View style={{justifyContent: 'center', alignItems: 'center'}} >
          <Image source={Images[this.props.picture]}
                 style={[styles[this.props.size + 'RoundedSquare'], {opacity: disabled ? .5 : 1}]} />
          {disabled && <Text style={styles.x}>X</Text>}
        </View>
      </TouchableOpacity>
    )
  }
}
