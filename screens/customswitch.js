// import React, {useState} from 'react';
 
// import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
 
// const CustomSwitch = ({
//   navigation,
//   selectionMode,
//   roundCorner,
//   option1,
//   option2,
//   onSelectSwitch,
//   selectionColor
// }) => {
//   const [getSelectionMode, setSelectionMode] = useState(selectionMode);
//   const [getRoundCorner, setRoundCorner] = useState(roundCorner);
 
//   const updatedSwitchData = val => {
//     setSelectionMode(val);
//     onSelectSwitch(val);
//   };
 
//   return (
//     <View>
//       <View
//         style={{
//           height: 40,
//           width: 200,
//           // height: 44,
//           // width: 215,
//           backgroundColor: 'black',
//           borderRadius: getRoundCorner ? 25 : 0,
//           borderWidth: 1,
//           borderColor: selectionColor,
//           flexDirection: 'row',
//           justifyContent: 'center',
//           padding: 2,
//         }}>
//         <TouchableOpacity
//           activeOpacity={1}
//           onPress={() => updatedSwitchData(1)}
//           style={{
//             flex: 1,
 
//             backgroundColor: getSelectionMode == 1 ? selectionColor : 'black',
//             borderRadius: getRoundCorner ? 25 : 0,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Text
//             style={{
//               color: getSelectionMode == 1 ? 'black' : selectionColor,
//             }}>
//             {option1}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           TouchableOpacity
//           activeOpacity={1}
//           onPress={() => updatedSwitchData(2)}
//           style={{
//             flex: 1,
 
//             backgroundColor: getSelectionMode == 2 ? selectionColor : 'black',
//             borderRadius: getRoundCorner ? 25 : 0,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Text
//             style={{
//               color: getSelectionMode == 2 ? 'black' : selectionColor,
//             }}>
//             {option2}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };
// export default CustomSwitch;






import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CustomSwitch = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <View>
      <View
        style={{
          height: 40,
          width: 200,
          backgroundColor: 'black',
          borderRadius: getRoundCorner ? 25 : 0,
          borderWidth: 1,
          borderColor: selectionColor,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 2,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode == 1 ? selectionColor : 'black',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == 1 ? 'black' : selectionColor,
            }}>
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode == 2 ? selectionColor : 'black',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == 2 ? 'black' : selectionColor,
            }}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomSwitch;