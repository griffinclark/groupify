import React, { useMemo, useEffect } from "react";
import Animated from "react-native-reanimated";
import { View, Dimensions, StyleSheet, Image } from "react-native";

const NUM_CONFETTI = 100;
const COLORS = ['#8686BC', '#E5A477', '#96CFDD', '#E5D87C'];
const CONFETTI_SIZE = 12;
const ConfettiArr = [
                        require('../../assets/confetti_1.png'),
                        require('../../assets/confetti_2.png'),
                        require('../../assets/confetti_3.png'),
                        require('../../assets/confetti_4.png'),
                    ];

const createConfetti = () => {
    const { width: screenWidth } = Dimensions.get('screen');
    
    return [...new Array(NUM_CONFETTI)].map((_, i) => {
        const clock = new Animated.Clock();

        return {
            key: i,
            x: new Animated.Value(
                screenWidth * (i % 2 ? 0.25 : 0.75) - CONFETTI_SIZE / 2
            ),
            y: new Animated.Value(-60),
            angle: new Animated.Value(Math.random()),
            xVel: new Animated.Value(Math.random() * 400 - 200),
            yVel: new Animated.Value(Math.random() * 150 + 100),
            angleVel: new Animated.Value((Math.random() * 3 - 1.5) * Math.PI),
            color: COLORS[i % COLORS.length],
            delay: new Animated.Value(Math.floor(i / 10) * 0.3),
            elasticity: Math.random() * 0.3 + 0.1,
            clock,
        }
    });
}

export const ConfettiAnimation = () => {
    const confetti = useMemo(createConfetti, []);
    
    return (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
            {confetti.map(({ key,
                            x,
                            y,
                            angle,
                            xVel,
                            yVel,
                            angleVel,
                            color,
                            delay,
                            elasticity,
                            clock, }) => {
                const transformStyle = {transform: [
                    {translateX: x}, 
                    {translateY: y}, 
                    {rotate: angle},
                    {rotateX: angle },
                    {rotateY: angle},
                ]};

                return (
                    <Animated.View
                        key={key}
                        //Have to ignore because of reanimated bug https://github.com/software-mansion/react-native-reanimated/issues/719
                        // @ts-ignore
                        style={[transformStyle, styles.confettiContainer]}
                    >
                        <Animated.Code>
                            {() => {
                                const {
                                startClock,
                                set,
                                add,
                                sub,
                                divide,
                                diff,
                                multiply,
                                cond,
                                clockRunning,
                                greaterThan,
                                lessThan
                                } = Animated

                                const {width: screenWidth, height: screenHeight } = Dimensions.get('window')


                                const timeDiff = diff(clock)
                                const dt = divide(timeDiff, 1000)
                                const dy = multiply(dt, yVel)
                                const dx = multiply(dt, xVel)
                                const dAngle = multiply(dt, angleVel)

                                return cond(
                                    clockRunning(clock),
                                    [
                                      cond(
                                        greaterThan(delay, 0),
                                        [set(delay, sub(delay, dt))],
                                        [
                                          set(y, add(y, dy)),
                                          set(x, add(x, dx)),
                                          set(angle, add(angle, dAngle)),
                                        ]
                                      ),
                                      cond(greaterThan(x, screenWidth - CONFETTI_SIZE), [
                                        set(x, screenWidth - CONFETTI_SIZE),
                                        set(xVel, multiply(xVel, -elasticity)),
                                      ]),
                                    // Make it rain continuously
                                    //   cond(greaterThan(y, screenHeight - CONFETTI_SIZE), [
                                    //     set(y, CONFETTI_SIZE),
                                    //   ]),
                                      cond(lessThan(x, 0), [
                                        set(x, 0),
                                        set(xVel, multiply(xVel, -elasticity)),
                                      ])
                                    ],
                                    [startClock(clock), timeDiff]
                                )
                            }}
                        </Animated.Code>
                        <Image 
                            source={ConfettiArr[Math.floor(Math.random() * 4)]}
                            style={[styles.confetti, {tintColor: color}]}
                        />
                    </Animated.View>
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    confettiContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
        confetti: {
        width: CONFETTI_SIZE,
        height: CONFETTI_SIZE,
        zIndex: 2
    }
});