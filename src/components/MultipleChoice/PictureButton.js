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
                        disabled={disabled || this.props.status == 'animating' || this.props.size == 'large'} >
        <View style={{justifyContent: 'center', alignItems: 'center'}} >
          <Image source={Images[this.props.picture]}
                 style={[styles[this.props.size + 'RoundedSquare'], {opacity: disabled ? .5 : 1}]} />
          {disabled && <Image source={require('../../assets/pictures/red_x.png')} style={styles.redX} />}
        </View>
      </TouchableOpacity>
    )
  }
}
