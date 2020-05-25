import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { 
  interpolate,
  useCode, 
  cond, 
  and, 
  neq,
  eq, 
  Value, 
  set,
  Extrapolate
 } from "react-native-reanimated";
import { ScrollView, BaseButton, State } from "react-native-gesture-handler";
import { withTransition } from "react-native-redash";

import ProgressBar from "./src/progressBar";

let index = 0;
const position = new Value(0);
const numbers = [1, 2, 3, 4, 5];

export default function App() {
  const state = new Value(State.UNDETERMINED);
  const transPosition = withTransition(position);

  const scrollRef = useRef();

  useCode(() => {
    cond(
      and(
        eq(state, State.END), 
        neq(position, 1)
      ),
        set(position, position + 0.2)
      )
  }, [state]);

  const scroll = () => {
      index++;
      if(scrollRef.current && scrollRef.current.scrollTo) {
        scrollRef.current.scrollTo({
          animated: true,
          x: 300 * index,
          y: 0
        });
      }
  }

  const HandleChange = Animated.event([
    {
      nativeEvent: { state }
    }
  ])

  return (
    <View style={styles.container}>
      <Text>Progress Bar</Text>

      <ProgressBar width={interpolate(transPosition, {
        inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
        outputRange: [0, 50, 100, 150, 200, 250],
        extrapolate: Extrapolate.CLAMP
      })}/>
      <ScrollView
        ref={scrollRef}
        scrollEnabled={false}
        horizontal
        pagingEnabled
        style={{ width: 300, height: 250 }}
      >
        {numbers.map(num => (
          <View style={styles.page} key={num}>
            <Text style={styles.number}>
              {num}
            </Text>
          </View>
        ))}        
      </ScrollView>
      
      <BaseButton
        onHandlerStateChange={HandleChange}
        onPress={scroll}
      >
        <View accessible>
          <Text>
            Next
          </Text>
        </View>
      </BaseButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 300
  },
  number: {
    fontSize: 22,
    fontWeight: "bold"
  }
});
