import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MainLayout from './MainLayout';

export default function NotificationScreen() {
  function component() {
    return <SafeAreaView></SafeAreaView>;
  }
  return (
    <MainLayout Component={component()} />
  )
}

const styles = StyleSheet.create({});
