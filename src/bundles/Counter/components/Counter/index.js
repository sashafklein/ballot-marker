import React from 'react'
import { Button, Text, View } from 'react-native'
import styles from './styles'

const Counter = (props) => {
  const { decrement, increment, value } = props
  return (
    <View style={styles.container}>
      <Button
        onPress={decrement}
        title="-"
        accessibilityLabel="Decrease counter value"
      />
      <Text style={styles.value}>{value}</Text>
      <Button
        onPress={increment}
        title="+"
        accessibilityLabel="Increase counter value"
      />
    </View>
  )
}

Counter.defaultProps = {
  value: 0,
}

export default Counter
