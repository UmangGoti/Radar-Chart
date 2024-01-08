import React, {useContext, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Line, Polygon, Svg} from 'react-native-svg';
import ToggleButton from '../../Components/ToggelButton';
import {Fonts, normalize} from '../../Theme';
import {EventRegister} from '../../util/EventRegister';
import {ThemeContext} from '../../util/ThemeContaxt';

let skills = {
  skills0: 30,
  skills1: 30,
  skills2: 30,
  skills3: 30,
  skills4: 30,
  skills5: 30,
};

/**
 * PI = 3.141
 */
const pii = Math.PI;

/**
 * Size of Hexagon
 */
const sizeOfHexagon = normalize(150);

function getPoinOnHexagon(value = 50) {
  return parseFloat((value * sizeOfHexagon) / 100).toFixed(4);
}

/**
 * Outer Polygon coordinates
 */
const coordinatesArray = [
  {
    x: parseFloat((Math.sin(pii) * sizeOfHexagon).toFixed(4)) + normalize(200),
    y: parseFloat((Math.cos(pii) * sizeOfHexagon).toFixed(4)) + normalize(200),
  },
  {
    x:
      parseFloat((Math.sin((2 * pii) / 3) * sizeOfHexagon).toFixed(4)) +
      normalize(200),
    y:
      parseFloat((Math.cos((2 * pii) / 3) * sizeOfHexagon).toFixed(4)) +
      normalize(200),
  },
  {
    x:
      parseFloat((Math.sin(pii / 3) * sizeOfHexagon).toFixed(4)) +
      normalize(200),
    y:
      parseFloat((Math.cos(pii / 3) * sizeOfHexagon).toFixed(4)) +
      normalize(200),
  },
  {
    x: parseFloat((Math.sin(0) * sizeOfHexagon).toFixed(4)) + normalize(200),
    y: parseFloat((Math.cos(0) * sizeOfHexagon).toFixed(4)) + normalize(200),
  },
  {
    x:
      parseFloat((Math.sin((5 * pii) / 3) * sizeOfHexagon).toFixed(4)) +
      normalize(200),
    y:
      parseFloat((Math.cos((5 * pii) / 3) * sizeOfHexagon).toFixed(4)) +
      normalize(200),
  },
  {
    x:
      parseFloat((Math.sin((4 * pii) / 3) * sizeOfHexagon).toFixed(4)) +
      normalize(200),
    y:
      parseFloat((Math.cos((4 * pii) / 3) * sizeOfHexagon).toFixed(4)) +
      normalize(200),
  },
];

/**
 * Inner boundary coordinates
 */
const innerMainHexagon30 = [
  {
    x:
      parseFloat((Math.sin(pii) * getPoinOnHexagon(30)).toFixed(4)) +
      normalize(200),
    y:
      parseFloat((Math.cos(pii) * getPoinOnHexagon(30)).toFixed(4)) +
      normalize(200),
  },
  {
    x:
      parseFloat((Math.sin((2 * pii) / 3) * getPoinOnHexagon(30)).toFixed(4)) +
      normalize(200),
    y:
      parseFloat((Math.cos((2 * pii) / 3) * getPoinOnHexagon(30)).toFixed(4)) +
      normalize(200),
  },
  {
    x:
      parseFloat((Math.sin(pii / 3) * getPoinOnHexagon(30)).toFixed(4)) +
      normalize(200),
    y:
      parseFloat((Math.cos(pii / 3) * getPoinOnHexagon(30)).toFixed(4)) +
      normalize(200),
  },
  {
    x:
      parseFloat((Math.sin(0) * getPoinOnHexagon(30)).toFixed(4)) +
      normalize(200),
    y:
      parseFloat((Math.cos(0) * getPoinOnHexagon(30)).toFixed(4)) +
      normalize(200),
  },
  {
    x:
      parseFloat((Math.sin((5 * pii) / 3) * getPoinOnHexagon(30)).toFixed(4)) +
      normalize(200),
    y:
      parseFloat((Math.cos((5 * pii) / 3) * getPoinOnHexagon(30)).toFixed(4)) +
      normalize(200),
  },
  {
    x:
      parseFloat((Math.sin((4 * pii) / 3) * getPoinOnHexagon(30)).toFixed(4)) +
      normalize(200),
    y:
      parseFloat((Math.cos((4 * pii) / 3) * getPoinOnHexagon(30)).toFixed(4)) +
      normalize(200),
  },
];

/**
 * center point of the Hexagon
 */
const centerPointX = (coordinatesArray[0].x + coordinatesArray[3].x) / 2;
const centerPointY = (coordinatesArray[0].y + coordinatesArray[3].y) / 2;

/**
 * line length from center of the Hexagon
 * @param {*} x2
 * @param {*} y2
 * @param {*} x1
 * @param {*} y1
 * @returns
 */
function getLengthOfLine(
  x2,
  y2,
  x1 = (coordinatesArray[0].x + coordinatesArray[3].x) / 2,
  y1 = (coordinatesArray[0].y + coordinatesArray[3].y) / 2,
) {
  return Math.ceil(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
}

/**
 * areaOfTriangle= (x1(y2-y3)+x2(y3-y1)+x3(y1-y2))/2
 * @param {*} x1
 * @param {*} y1
 * @param {*} x2
 * @param {*} y2
 * @param {*} x3
 * @param {*} y3
 * @returns
 */
function getTringleArea(x1, y1, x2, y2, x3, y3) {
  return Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2;
}

/**
 * Total sum of the sub Triangles
 * @param {*} locationX
 * @param {*} locationY
 * @param {*} x1
 * @param {*} y1
 * @param {*} x2
 * @param {*} y2
 * @param {*} x3
 * @param {*} y3
 * @returns
 */
function additionOffArea(locationX, locationY, x1, y1, x2, y2, x3, y3) {
  return (
    getTringleArea(locationX, locationY, x1, y1, x2, y2) +
    getTringleArea(locationX, locationY, x2, y2, x3, y3) +
    getTringleArea(locationX, locationY, x3, y3, x1, y1)
  );
}

/**
 * When their point inside the triangle or not
 * @param {*} triangleArea
 * @param {*} pointTriangleArea
 * @returns
 */
function isPointInsideTriangle(triangleArea, pointTriangleArea) {
  return triangleArea === pointTriangleArea;
}

function getValueFromSkill(value) {
  return Math.floor((value * 40) / 40 - 30).toFixed(0);
}

function getSkillValue(y) {
  return (30 + (40 * y) / 40).toFixed(0);
}

const onStartShouldSetResponder = event => {
  let locationX = event.nativeEvent.locationX;
  let locationY = event.nativeEvent.locationY;
  return true;
};

const RadarChartScreen = ({}) => {
  const {themeMode, theme} = useContext(ThemeContext);
  const [state, setState] = useState({
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    x3: 0,
    y3: 0,
    x4: 0,
    y4: 0,
    x5: 0,
    y5: 0,
    area0: 0,
    area1: 0,
    area2: 0,
    area3: 0,
    area4: 0,
    area5: 0,
  });

  const [prevLineLength, setPrev] = useState({
    prev0: 0,
    prev1: 0,
    prev2: 0,
    prev3: 0,
    prev4: 0,
    prev5: 0,
  });

  const [innerHexagon, setInnerHexagonPoint] = useState([
    {
      x:
        parseFloat((Math.sin(pii) * getPoinOnHexagon(30)).toFixed(4)) +
        normalize(200),
      y:
        parseFloat((Math.cos(pii) * getPoinOnHexagon(30)).toFixed(4)) +
        normalize(200),
    },
    {
      x:
        parseFloat(
          (Math.sin((2 * pii) / 3) * getPoinOnHexagon(30)).toFixed(4),
        ) + normalize(200),
      y:
        parseFloat(
          (Math.cos((2 * pii) / 3) * getPoinOnHexagon(30)).toFixed(4),
        ) + normalize(200),
    },
    {
      x:
        parseFloat((Math.sin(pii / 3) * getPoinOnHexagon(30)).toFixed(4)) +
        normalize(200),
      y:
        parseFloat((Math.cos(pii / 3) * getPoinOnHexagon(30)).toFixed(4)) +
        normalize(200),
    },
    {
      x:
        parseFloat((Math.sin(0) * getPoinOnHexagon(30)).toFixed(4)) +
        normalize(200),
      y:
        parseFloat((Math.cos(0) * getPoinOnHexagon(30)).toFixed(4)) +
        normalize(200),
    },
    {
      x:
        parseFloat(
          (Math.sin((5 * pii) / 3) * getPoinOnHexagon(30)).toFixed(4),
        ) + normalize(200),
      y:
        parseFloat(
          (Math.cos((5 * pii) / 3) * getPoinOnHexagon(30)).toFixed(4),
        ) + normalize(200),
    },
    {
      x:
        parseFloat(
          (Math.sin((4 * pii) / 3) * getPoinOnHexagon(30)).toFixed(4),
        ) + normalize(200),
      y:
        parseFloat(
          (Math.cos((4 * pii) / 3) * getPoinOnHexagon(30)).toFixed(4),
        ) + normalize(200),
    },
  ]);

  const [criteria, setCriteria] = useState({
    maxValue: 100,
    maxPoint: getValueFromSkill(100),
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
      <StatusBar
        barStyle={themeMode === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={theme.background}
      />
      <View style={styles.container}>
        <View style={styles.topSkillContainer}>
          <Text
            style={[
              styles.skillText,
              {top: normalize(110), color: theme.outerPolygon},
            ]}>
            {skills.skills5}
          </Text>
          <Text
            style={[
              styles.skillText,
              {top: normalize(20), color: theme.outerPolygon},
            ]}>
            {skills.skills0}
          </Text>
          <Text
            style={[
              styles.skillText,
              {top: normalize(110), color: theme.outerPolygon},
            ]}>
            {skills.skills1}
          </Text>
        </View>
        <Svg
          onStartShouldSetResponder={onStartShouldSetResponder}
          onResponderMove={event => {
            let locationX = event.nativeEvent.locationX;
            let locationY = event.nativeEvent.locationY;

            let pointArea0 = additionOffArea(
              locationX,
              locationY,
              coordinatesArray[0].x - 50,
              coordinatesArray[0].y - 20,
              coordinatesArray[0].x + 50,
              coordinatesArray[0].y - 20,
              centerPointX,
              centerPointY - 10,
            ).toFixed(2);

            let pointArea1 = additionOffArea(
              locationX,
              locationY,
              coordinatesArray[1].x - 10,
              coordinatesArray[1].y - 60,
              coordinatesArray[1].x + 60,
              coordinatesArray[1].y + 30,
              centerPointX,
              centerPointY,
            ).toFixed(2);

            let pointArea2 = additionOffArea(
              locationX,
              locationY,
              coordinatesArray[2].x - 10,
              coordinatesArray[2].y + 60,
              coordinatesArray[2].x + 60,
              coordinatesArray[2].y - 30,
              centerPointX,
              centerPointY,
            ).toFixed(2);

            let pointArea3 = additionOffArea(
              locationX,
              locationY,
              coordinatesArray[3].x - 50,
              coordinatesArray[3].y + 30,
              coordinatesArray[3].x + 50,
              coordinatesArray[3].y + 30,
              centerPointX,
              centerPointY + 10,
            ).toFixed(2);

            let pointArea4 = additionOffArea(
              locationX,
              locationY,
              coordinatesArray[4].x + 10,
              coordinatesArray[4].y + 60,
              coordinatesArray[4].x - 60,
              coordinatesArray[4].y - 30,
              centerPointX,
              centerPointY,
            ).toFixed(2);

            let pointArea5 = additionOffArea(
              event.nativeEvent.locationX,
              event.nativeEvent.locationY,
              coordinatesArray[5].x - 60,
              coordinatesArray[5].y + 30,
              coordinatesArray[5].x + 10,
              coordinatesArray[5].y - 60,
              centerPointX,
              centerPointY,
            ).toFixed(2);

            var updatedInnerHexagon = [
              {
                x:
                  parseFloat(
                    (
                      Math.sin(pii) * getPoinOnHexagon(30 + Number(state.x0))
                    ).toFixed(4),
                  ) + normalize(200),
                y:
                  parseFloat(
                    (
                      Math.cos(pii) * getPoinOnHexagon(30 + Number(state.y0))
                    ).toFixed(4),
                  ) + normalize(200),
              },
              {
                x:
                  parseFloat(
                    (
                      Math.sin((2 * pii) / 3) *
                      getPoinOnHexagon(30 + Number(state.x1))
                    ).toFixed(4),
                  ) + normalize(200),
                y:
                  parseFloat(
                    (
                      Math.cos((2 * pii) / 3) *
                      getPoinOnHexagon(30 + Number(state.y1))
                    ).toFixed(4),
                  ) + normalize(200),
              },
              {
                x:
                  parseFloat(
                    (
                      +Math.sin(pii / 3) *
                      getPoinOnHexagon(30 + Number(state.x2))
                    ).toFixed(4),
                  ) + normalize(200),
                y:
                  parseFloat(
                    (
                      Math.cos(pii / 3) *
                      getPoinOnHexagon(30 + Number(state.y2))
                    ).toFixed(4),
                  ) + normalize(200),
              },
              {
                x:
                  parseFloat(
                    (
                      Math.sin(0) * getPoinOnHexagon(30 + Number(state.x3))
                    ).toFixed(4),
                  ) + normalize(200),
                y:
                  parseFloat(
                    (
                      Math.cos(0) * getPoinOnHexagon(30 + Number(state.y3))
                    ).toFixed(4),
                  ) + normalize(200),
              },
              {
                x:
                  parseFloat(
                    (
                      Math.sin((5 * pii) / 3) *
                      getPoinOnHexagon(30 + Number(state.x4))
                    ).toFixed(4),
                  ) + normalize(200),
                y:
                  parseFloat(
                    (
                      Math.cos((5 * pii) / 3) *
                      getPoinOnHexagon(30 + Number(state.y4))
                    ).toFixed(4),
                  ) + normalize(200),
              },
              {
                x:
                  parseFloat(
                    (
                      Math.sin((4 * pii) / 3) *
                      getPoinOnHexagon(30 + Number(state.x5))
                    ).toFixed(4),
                  ) + normalize(200),
                y:
                  parseFloat(
                    (
                      Math.cos((4 * pii) / 3) *
                      getPoinOnHexagon(30 + Number(state.y5))
                    ).toFixed(4),
                  ) + normalize(200),
              },
            ];

            if (isPointInsideTriangle(state.area0, pointArea0)) {
              let x01 = state.x0;
              let x02 =
                prevLineLength.prev0 -
                getLengthOfLine(
                  event.nativeEvent.locationX,
                  event.nativeEvent.locationY,
                );

              let y01 = state.y0;
              let y02 =
                prevLineLength.prev0 -
                getLengthOfLine(
                  event.nativeEvent.locationX,
                  event.nativeEvent.locationY,
                );
              for (let i = 0; i < 2; i++) {
                let x0 = x01 - x02 / 2;
                let y0 = y01 - y02 / 2;
                if (y0 >= criteria.maxPoint) y0 = criteria.maxPoint;

                if (y0 <= 0) y0 = 0;

                setState(prevState => ({
                  ...prevState,
                  x0: x0,
                  y0: y0,
                }));
                setInnerHexagonPoint(updatedInnerHexagon);
                skills.skills0 = getSkillValue(y0);
                setPrev({
                  prev0: getLengthOfLine(
                    event.nativeEvent.locationX,
                    event.nativeEvent.locationY,
                  ),
                });
              }
            }

            if (isPointInsideTriangle(state.area1, pointArea1)) {
              let x11 = state.x1;
              let x12 =
                prevLineLength.prev1 -
                getLengthOfLine(
                  event.nativeEvent.locationX,
                  event.nativeEvent.locationY,
                );
              let y11 = state.y1;
              let y12 =
                prevLineLength.prev1 -
                getLengthOfLine(
                  event.nativeEvent.locationX,
                  event.nativeEvent.locationY,
                );

              for (let i = 0; i < 2; i++) {
                let x1 = x11 - x12 / 2;
                let y1 = y11 - y12 / 2;
                if (x1 >= criteria.maxPoint && y1 >= criteria.maxPoint) {
                  x1 = criteria.maxPoint;
                  y1 = criteria.maxPoint;
                }

                if (x1 <= 0 && y1 <= 0) {
                  x1 = 0;
                  y1 = 0;
                }
                setState(prevState => ({
                  ...prevState,
                  x1: x1,
                  y1: y1,
                }));
                setInnerHexagonPoint(updatedInnerHexagon);
                skills.skills1 = getSkillValue(y1);
                setPrev({
                  prev1: getLengthOfLine(
                    event.nativeEvent.locationX,
                    event.nativeEvent.locationY,
                  ),
                });
              }
            }

            if (isPointInsideTriangle(state.area2, pointArea2)) {
              let x21 = state.x2;
              let x22 =
                prevLineLength.prev2 -
                getLengthOfLine(
                  event.nativeEvent.locationX,
                  event.nativeEvent.locationY,
                );
              let y21 = state.y2;
              let y22 =
                prevLineLength.prev2 -
                getLengthOfLine(
                  event.nativeEvent.locationX,
                  event.nativeEvent.locationY,
                );

              for (let i = 0; i < 2; i++) {
                let x2 = x21 - x22 / 2;
                let y2 = y21 - y22 / 2;
                if (x2 >= criteria.maxPoint && y2 >= criteria.maxPoint) {
                  x2 = criteria.maxPoint;
                  y2 = criteria.maxPoint;
                }

                if (x2 <= 0 && y2 <= 0) {
                  x2 = 0;
                  y2 = 0;
                }

                setState(prevState => ({
                  ...prevState,
                  x2: x2,
                  y2: y2,
                }));
                setInnerHexagonPoint(updatedInnerHexagon);
                skills.skills2 = getSkillValue(y2);
                setPrev({
                  prev2: getLengthOfLine(
                    event.nativeEvent.locationX,
                    event.nativeEvent.locationY,
                  ),
                });
              }
            }

            if (isPointInsideTriangle(state.area3, pointArea3)) {
              let x31 = state.x3;
              let x32 =
                prevLineLength.prev3 -
                getLengthOfLine(
                  event.nativeEvent.locationX,
                  event.nativeEvent.locationY,
                );

              let y31 = state.y3;
              let y32 =
                prevLineLength.prev3 -
                getLengthOfLine(
                  event.nativeEvent.locationX,
                  event.nativeEvent.locationY,
                );

              for (let i = 0; i < 2; i++) {
                let x3 = x31 - x32 / 2;
                let y3 = y31 - y32 / 2;
                if (y3 >= criteria.maxPoint) {
                  y3 = criteria.maxPoint;
                }

                if (y3 <= 0) {
                  y3 = 0;
                }

                setState(prevState => ({
                  ...prevState,
                  x3: x3,
                  y3: y3,
                }));
                setInnerHexagonPoint(updatedInnerHexagon);
                skills.skills3 = getSkillValue(y3);
                setPrev({
                  prev3: getLengthOfLine(
                    event.nativeEvent.locationX,
                    event.nativeEvent.locationY,
                  ),
                });
              }
            }

            if (isPointInsideTriangle(state.area4, pointArea4)) {
              let x41 = state.x4;
              let x42 =
                prevLineLength.prev4 -
                getLengthOfLine(
                  event.nativeEvent.locationX,
                  event.nativeEvent.locationY,
                );
              let y41 = state.y4;
              let y42 =
                prevLineLength.prev4 -
                getLengthOfLine(
                  event.nativeEvent.locationX,
                  event.nativeEvent.locationY,
                );

              for (let i = 0; i < 2; i++) {
                let x4 = x41 - x42 / 2;
                let y4 = y41 - y42 / 2;
                if (x4 >= criteria.maxPoint && y4 >= criteria.maxPoint) {
                  x4 = criteria.maxPoint;
                  y4 = criteria.maxPoint;
                }

                if (x4 <= 0 && y4 <= 0) {
                  x4 = 0;
                  y4 = 0;
                }

                setState(prevState => ({
                  ...prevState,
                  x4: x4,
                  y4: y4,
                }));
                setInnerHexagonPoint(updatedInnerHexagon);
                skills.skills4 = getSkillValue(y4);
                setPrev({
                  prev4: getLengthOfLine(
                    event.nativeEvent.locationX,
                    event.nativeEvent.locationY,
                  ),
                });
              }
            }

            if (isPointInsideTriangle(state.area5, pointArea5)) {
              let x51 = state.x5;
              let x52 =
                prevLineLength.prev5 -
                getLengthOfLine(
                  event.nativeEvent.locationX,
                  event.nativeEvent.locationY,
                );
              let y51 = state.y5;
              let y52 =
                prevLineLength.prev5 -
                getLengthOfLine(
                  event.nativeEvent.locationX,
                  event.nativeEvent.locationY,
                );

              for (let i = 0; i < 2; i++) {
                let x5 = x51 - x52 / 2;
                let y5 = y51 - y52 / 2;

                if (x5 >= criteria.maxPoint && y5 >= criteria.maxPoint) {
                  x5 = criteria.maxPoint;
                  y5 = criteria.maxPoint;
                }

                if (x5 <= 0 && y5 <= 0) {
                  x5 = 0;
                  y5 = 0;
                }

                setState(prevState => ({
                  ...prevState,
                  x5: x5,
                  y5: y5,
                }));
                setInnerHexagonPoint(updatedInnerHexagon);
                skills.skills5 = getSkillValue(state.y5);
                setPrev({
                  prev5: getLengthOfLine(
                    event.nativeEvent.locationX,
                    event.nativeEvent.locationY,
                  ),
                });
              }
            }

            setPrev({
              prev0: getLengthOfLine(
                innerMainHexagon30[0].x,
                innerMainHexagon30[0].y,
              ),
              prev1: getLengthOfLine(
                innerMainHexagon30[1].x,
                innerMainHexagon30[1].y,
              ),
              prev2: getLengthOfLine(
                innerMainHexagon30[2].x,
                innerMainHexagon30[2].y,
              ),
              prev3: getLengthOfLine(
                innerMainHexagon30[3].x,
                innerMainHexagon30[3].y,
              ),
              prev4: getLengthOfLine(
                innerMainHexagon30[4].x,
                innerMainHexagon30[4].y,
              ),
              prev5: getLengthOfLine(
                innerMainHexagon30[5].x,
                innerMainHexagon30[5].y,
              ),
            });

            setState(prevState => ({
              ...prevState,
              area0: getTringleArea(
                coordinatesArray[0].x - 50,
                coordinatesArray[0].y - 20,
                coordinatesArray[0].x + 50,
                coordinatesArray[0].y - 20,
                centerPointX,
                centerPointY - 10,
              ).toFixed(2),
              area1: getTringleArea(
                coordinatesArray[1].x - 10,
                coordinatesArray[1].y - 60,
                coordinatesArray[1].x + 60,
                coordinatesArray[1].y + 30,
                centerPointX,
                centerPointY,
              ).toFixed(2),
              area2: getTringleArea(
                coordinatesArray[2].x - 10,
                coordinatesArray[2].y + 60,
                coordinatesArray[2].x + 60,
                coordinatesArray[2].y - 30,
                centerPointX,
                centerPointY,
              ).toFixed(2),
              area3: getTringleArea(
                coordinatesArray[3].x - 50,
                coordinatesArray[3].y + 30,
                coordinatesArray[3].x + 50,
                coordinatesArray[3].y + 30,
                centerPointX,
                centerPointY + 10,
              ).toFixed(2),

              area4: getTringleArea(
                coordinatesArray[4].x + 10,
                coordinatesArray[4].y + 60,
                coordinatesArray[4].x - 60,
                coordinatesArray[4].y - 30,
                centerPointX,
                centerPointY,
              ).toFixed(2),
              area5: getTringleArea(
                coordinatesArray[5].x - 60,
                coordinatesArray[5].y + 30,
                coordinatesArray[5].x + 10,
                coordinatesArray[5].y - 60,
                centerPointX,
                centerPointY,
              ).toFixed(2),
            }));
          }}
          height={normalize(400)}
          width={normalize(400)}
          style={{alignSelf: 'center'}}>
          <Line
            x1={coordinatesArray[0].x}
            y1={coordinatesArray[0].y}
            x2={coordinatesArray[3].x}
            y2={coordinatesArray[3].y}
            strokeWidth={6}
            stroke={theme.outerPolygon}
            strokeLinecap="round"
          />
          <Line
            x1={coordinatesArray[1].x}
            y1={coordinatesArray[1].y}
            x2={coordinatesArray[4].x}
            y2={coordinatesArray[4].y}
            strokeWidth={6}
            stroke={theme.outerPolygon}
            strokeLinecap="round"
          />
          <Line
            x1={coordinatesArray[5].x}
            y1={coordinatesArray[5].y}
            x2={coordinatesArray[2].x}
            y2={coordinatesArray[2].y}
            strokeWidth={6}
            stroke={theme.outerPolygon}
            strokeLinecap="round"
          />
          <Polygon
            points={`
              ${coordinatesArray[0].x} ${coordinatesArray[0].y}, 
              ${coordinatesArray[1].x} ${coordinatesArray[1].y}, 
              ${coordinatesArray[2].x} ${coordinatesArray[2].y}, 
              ${coordinatesArray[3].x} ${coordinatesArray[3].y}, 
              ${coordinatesArray[4].x} ${coordinatesArray[4].y}, 
              ${coordinatesArray[5].x} ${coordinatesArray[5].y}
              `}
            fill="transparent"
            stroke={theme.outerPolygon}
            strokeWidth={6}
            strokeLinejoin="round"
          />
          <Polygon
            points={`
              ${innerHexagon[0].x} ${innerHexagon[0].y} , 
              ${innerHexagon[1].x} ${innerHexagon[1].y}, 
              ${innerHexagon[2].x} ${innerHexagon[2].y} ,
              ${innerHexagon[3].x} ${innerHexagon[3].y} ,
              ${innerHexagon[4].x} ${innerHexagon[4].y},
              ${innerHexagon[5].x} ${innerHexagon[5].y}
              `}
            stroke={theme.innerPolygon}
            strokeWidth={6}
            strokeLinejoin="round"
            fill={"transparent"}
          />
        </Svg>

        <View style={styles.bottomSkillContainer}>
          <Text
            style={[
              styles.skillText,
              {bottom: normalize(110), color: theme.outerPolygon},
            ]}>
            {skills.skills4}
          </Text>
          <Text
            style={[
              styles.skillText,
              {bottom: normalize(20), color: theme.outerPolygon},
            ]}>
            {skills.skills3}
          </Text>
          <Text
            style={[
              styles.skillText,
              {bottom: normalize(110), color: theme.outerPolygon},
            ]}>
            {skills.skills2}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: normalize(15),
        }}>
        <Text
          style={{
            color: theme.outerPolygon,
            fontSize: Platform.OS === 'ios' ? normalize(13) : normalize(15),
            letterSpacing: 1,
          }}>
          Dark Mode {themeMode === 'light' ? 'Off' : 'On'}
          {Platform.OS === 'ios' ? '\t  ' : '\t\t\t'}
        </Text>
        <ToggleButton
          onPressToggle={isDarkModeOn => {
            EventRegister.emit('ChangeTheme', isDarkModeOn);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default RadarChartScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
  topSkillContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Platform.OS === 'ios' ? normalize(20) : normalize(30),
  },
  skillText: {
    fontSize: normalize(20),
  },
  bottomSkillContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Platform.OS === 'ios' ? normalize(20) : normalize(30),
  },
});
