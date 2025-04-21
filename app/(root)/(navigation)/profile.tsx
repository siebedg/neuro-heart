import React from 'react';
import { View, Text } from 'react-native';

const Profile = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-3xl text-cyan-800 text-center">
        Welkom, Siebe De Gelas!
      </Text>
    </View>
  );
};

export default Profile;