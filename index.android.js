import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';

import setup from './app/Root';
AppRegistry.registerComponent('MEDI', () => setup);
//cd android && ./gradlew assembleRelease

//cd android && ./gradlew installRelease