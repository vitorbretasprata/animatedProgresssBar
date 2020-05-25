import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from "react-native-reanimated";
import { ScrollView, State, createNativeWrapper, BaseButton } from "react-native-gesture-handler";
import { withTransition } from "react-native-redash";

const { 
  interpolate,
  useCode, 
  cond, 
  and, 
  neq,
  eq, 
  Value, 
  set,
  Extrapolate,
  createAnimatedComponent 
 } = Animated;

const AnimatedRawButton = createNativeWrapper(
  createAnimatedComponent(BaseButton),
  {
    shouldCancelWhenOutside: false,
    shouldActivateOnStart: false,
  }
);

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
      if(scrollRef.current && scrollRef.current.scrollTo && position._value <= 1) {
        index++;
        position.setValue(position + 0.2);
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
      
      <AnimatedRawButton
        onHandlerStateChange={HandleChange}
        onPress={scroll}
      >
        <View accessible>
          
            <Animated.View>
              <Text>
                Next
              </Text>
            </Animated.View>              
          
        </View>
      </AnimatedRawButton>
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
