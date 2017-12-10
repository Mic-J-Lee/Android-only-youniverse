import React from 'react'
import { View } from 'react-native'
import Sound from 'react-native-sound'

export function _displayQuestion(element) {
  return(
    <View style={{flex: 4, alignItems: 'center'}}>
      {element}
    </View>
  )
}

export function _displayMultipleChoices(multipleChoicesArray) {
  shuffledArray = _shuffleThisArray(multipleChoicesArray)
  return(
    <View style={{flex: 5}}>
      <View style={{flex: 1, flexDirection:'row'}}>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          {shuffledArray[0]}
        </View>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          {shuffledArray[1]}
        </View>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          {shuffledArray[2]}
        </View>
      </View>
      <View style={{flex: 1, flexDirection:'row'}}>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          {shuffledArray[3]}
        </View>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          {shuffledArray[4]}
        </View>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          {shuffledArray[5]}
        </View>
      </View>
    </View>
  )
}

export function _displayLandscapeQuestion(element) {
  return(
    <View style={{flex: 4, justifyContent: 'center'}}>
      {element}
    </View>
  )
}

export function _displayLandscapeMultipleChoices(multipleChoicesArray) {
  shuffledArray = _shuffleThisArray(multipleChoicesArray)
  return(
    <View style={{flex: 5, flexDirection: 'row'}}>
      <View style={{flex: 1}}>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          {shuffledArray[0]}
        </View>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          {shuffledArray[1]}
        </View>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          {shuffledArray[2]}
        </View>
      </View>
      <View style={{flex: 1}}>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          {shuffledArray[3]}
        </View>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          {shuffledArray[4]}
        </View>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          {shuffledArray[5]}
        </View>
      </View>
    </View>
  )
}

export const modes = {
  red: {question: 'audio', answers: 'picture'},
  orange: {question: 'writing', answers: 'audio'},
  yellow: {question: 'picture', answers: 'writing'},
  green: {question: 'writing', answers: 'picture'},
  blue: {question: 'audio', answers: 'writing'},
  purple: {question: 'picture', answers: 'audio'}
}

export function _loadSoundObject(name, language = 'cantonese') {
  whoosh = new Sound(language + '_' + name + '.mp3', Sound.MAIN_BUNDLE)
  return whoosh
}

export function _shuffleThisArray(array) {
  return array.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1])
}
