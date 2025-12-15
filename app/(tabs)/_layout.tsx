import React from 'react';
import { Redirect, Slot } from 'expo-router';

export default function Layout() {
  const isAuthenticated = true;

  if (!isAuthenticated) return <Redirect href="/sign-in" />;
  return <Slot />;
}
