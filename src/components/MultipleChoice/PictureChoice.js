import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import Images from '../../assets/pictures/dynamicRequire'

export default class PictureChoice extends Component {
  
  _checkIfCorrect = () => {
    if (this.props.isCorrect) this.props._nextColor()
  }

  render() {
    return (
      <TouchableOpacity style={{width: 100, height: 100, borderRadius: 25}}
                        onPress={this._checkIfCorrect.bind(this)} >
        <Image source={Images[this.props.picture]}
               style={{width: 100, height: 100, borderRadius: 25}} />
      </TouchableOpacity>
    );
  }
}


