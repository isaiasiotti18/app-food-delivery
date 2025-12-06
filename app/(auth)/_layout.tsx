import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import React from 'react';
import { Slot } from 'expo-router';
import { images } from '@/constants';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';

export default function Layout() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView className="h-full bg-white" keyboardShouldPersistTaps="handled">
        <View
          className="relative w-full"
          style={{ height: Dimensions.get('screen').height / 2.35 }}>
          <ImageBackground
            source={images.loginGraphic}
            className="size-full rounded-b-lg"
            resizeMode="stretch"
          />
          <Image source={images.logo} className="absolute -bottom-16 z-10 size-48 self-center" />
        </View>

        <CustomInput
          placeholder="Enter your email"
          value={''}
          onChangeText={(text) => {}}
          label="Email"
          keyboardType="email-address"
        />
        <CustomButton />
      </ScrollView>
      <Slot />
    </KeyboardAvoidingView>
  );
}
