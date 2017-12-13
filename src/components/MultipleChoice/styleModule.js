import React from 'react'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  smallCircle: {
    width: 110,
    height: 110,
    borderRadius: 100,
  },
  largeCircle: {
    width: 160,
    height: 160,
    borderRadius: 100,
  },
  smallRoundedSquare: {
    width: 110,
    height: 110,
    borderRadius: 25,
  },
  largeRoundedSquare: {
    width: 200,
    height: 200,
    borderRadius: 25,
  },
  redX: {
    width: 120,
    height: 120,
    position: 'absolute',
    opacity: .5
  },
  choiceFlexBox: {
    flex:1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  portraitQuestion: {
    flex: 4, 
    alignItems: 'center'
  },
  landscapeQuestion: {
    flex: 4,
    justifyContent: 'center'
  }
})
