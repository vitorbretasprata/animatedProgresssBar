import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";


function ProgressBar({ width }) {

    return (
        <View style={styles.ProgressBar}>
            <Animated.View style={[styles.absoluteFill, { width }]}></Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    ProgressBar: {
        height: 22,
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 10,
        width: 200
    },
    absoluteFill: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#000",
        borderRadius: 5
    }
})

export default memo(ProgressBar);