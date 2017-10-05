'use strict';
//react-native bundle --entry-file index.ios.js --platform ios --dev false --bundle-output release_ios/main.jsbundle --assets-dest release_ios/

import React, { Component } from 'react';
import { AppRegistry } from  'react-native';
import App from './app/index';

AppRegistry.registerComponent('iDoctor', () => App);
