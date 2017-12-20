import React from 'react'
import { View } from 'react-native'
import { styles } from './styleModule'

export function _displayMultipleChoices(multipleChoicesArray, isPortrait = true) {
  return(
    <View style={{flex: 5, flexDirection: isPortrait ? 'column' : 'row'}}>
      <View style={{flex: 1, flexDirection: isPortrait ? 'row' : 'column'}}>
        <View style={styles.choiceFlexBox}>
          {multipleChoicesArray[0]}
        </View>
        <View style={styles.choiceFlexBox}>
          {multipleChoicesArray[1]}
        </View>
        <View style={styles.choiceFlexBox}>
          {multipleChoicesArray[2]}
        </View>
      </View>
      <View style={{flex: 1, flexDirection: isPortrait ? 'row' : 'column'}}>
        <View style={styles.choiceFlexBox}>
          {multipleChoicesArray[3]}
        </View>
        <View style={styles.choiceFlexBox}>
          {multipleChoicesArray[4]}
        </View>
        <View style={styles.choiceFlexBox}>
          {multipleChoicesArray[5]}
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

export function _shuffleThisArray(array) {
  return array.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1])
}

