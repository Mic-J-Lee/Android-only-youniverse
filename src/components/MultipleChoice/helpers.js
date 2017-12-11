import React from 'react'
import { Animated, Easing, View } from 'react-native'
import Sound from 'react-native-sound'
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

export function _loadSoundObject(name, language = 'cantonese') {
  whoosh = new Sound(language + '_' + name + '.mp3', Sound.MAIN_BUNDLE)
  return whoosh
}

export function _shuffleThisArray(array) {
  return array.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1])
}

export function _animateQuestionCompletion(choiceValues, questionValue, correctValue) {
  const animationValues = choiceValues
  let animations = []
  for (value of animationValues) {
    animations.push(Animated.timing(
      value,
      { 
        toValue: {x: 0, y: 500},
        useNativeDriver: true,
        duration: 300,
        easing: Easing.poly(3)
      }
    ))
  }
  animations.push(Animated.timing(
      questionValue,
      { 
       toValue: {x: -500, y: 0},
       useNativeDriver: true,
       duration: 500,
       easing: Easing.cubic
      }
    ))
  animations.push(Animated.timing(
      correctValue,
      { 
       toValue: {x: -500, y: 0},
       useNativeDriver: true,
       duration: 500,
       easing: Easing.cubic
      }
    ))
  Animated.stagger(50, animations).start()
}
