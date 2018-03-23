import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Images from '../../../assets/pictures/dynamicRequire'
import { styles } from './styleModule'

export default class PictureButton extends Component {

  render() {
    const p = this.props
    const disabled = p.disabled
    return (
      <TouchableOpacity style={styles[p.size + 'RoundedSquare']}
                        onPress={p._checkIfCorrect}
                        disabled={disabled || p.status != 'ready' || p.size == 'large'} >
        <View style={{justifyContent: 'center', alignItems: 'center'}} >
          <Image source={Images[p.picture]}
                 style={[styles[p.size + 'RoundedSquare'], {opacity: disabled ? .5 : 1}]} />
          {disabled && <Image source={require('../../../assets/pictures/red_x.png')} style={styles.redX} />}
        </View>
      </TouchableOpacity>
    )
  }
}
