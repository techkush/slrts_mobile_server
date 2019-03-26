'use strict';

import React, { PureComponent } from 'react';
import { StyleSheet, View, Alert, Dimensions } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text
} from 'native-base';
import MapView from 'react-native-maps';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import TrackingDot from '../res/TrackingDot.png';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  footer: {
    backgroundColor: '#0C68FB',
  },
  icon: {
    color: '#fff',
    fontSize: 30
  }
});

class MainScene extends PureComponent {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      region: null,
      locations: [],
      stationaries: [],
      isRunning: false,
      latitude: 123,
      longtiude: 123,
      speed: 123,
    };
  }

  componentDidMount() {
    BackgroundGeolocation.configure({
      desiredAccuracy: 5,
      stationaryRadius: 5,
      distanceFilter: 8,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      startOnBoot: false,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 1000,
      fastestInterval: 5000,
      activitiesInterval: 1000,
      stopOnStillActivity: false,
      url: 'http://192.168.1.7:3000/location',
      httpHeaders: {
        'X-FOO': 'bar'
      },
      // customize post properties
      postTemplate: {
        lat: 12.34,
        lng: 34.56
      },
      syncThreshold: 100
    });

    BackgroundGeolocation.on('location', (location) => {
      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      BackgroundGeolocation.startTask(taskKey => {
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      // handle stationary locations here
      Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on('error', (error) => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.on('start', () => {
      console.log('[INFO] BackgroundGeolocation service has been started');
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    BackgroundGeolocation.on('authorization', (status) => {
      console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(() =>
          Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
            { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
            { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
          ]), 1000);
      }
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.on('abort_requested', () => {
      console.log('[INFO] Server responded with 285 Updates Not Required');

      // Here we can decide whether we want stop the updates or not.
      // If you've configured the server to return 285, then it means the server does not require further update.
      // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
      // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    });

    BackgroundGeolocation.on('http_authorization', () => {
      console.log('[INFO] App needs to authorize the http requests');
    });

    BackgroundGeolocation.checkStatus(status => {
      console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
      console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
      console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });

    // you can also just start without checking for status
    // BackgroundGeolocation.start();
  }

  componentWillUnmount() {
    // unregister all event listeners
    BackgroundGeolocation.removeAllListeners();
  }

  start() {
    BackgroundGeolocation.checkStatus(({ locationServicesEnabled, authorization }) => {
      if (!locationServicesEnabled) {
        Alert.alert(
          'Location services disabled',
          'Would you like to open location settings?',
          [
            {
              text: 'Yes',
              onPress: () => BackgroundGeolocation.showLocationSettings()
            },
            {
              text: 'No',
              onPress: () => console.log('No Pressed'),
              style: 'cancel'
            }
          ]
        );
        return false;
      }

      if (authorization == 99) {
        // authorization yet to be determined
        BackgroundGeolocation.start();
      } else if (authorization == BackgroundGeolocation.AUTHORIZED) {
        // calling start will also ask user for permission if needed
        // permission error will be handled in permisision_denied event
        BackgroundGeolocation.start();
      } else {
        Alert.alert(
          'App requires location tracking',
          'Please grant permission',
          [
            {
              text: 'Ok',
              onPress: () => BackgroundGeolocation.start()
            }
          ]
        );
      }
    });
  }

  stop() {
    BackgroundGeolocation.checkStatus(({ isRunning }) => {
      if (isRunning) {
        BackgroundGeolocation.stop();
        return false;
      }
    });
  }

  render() {

    return (
      <Container>
        <Content>
          <Text>{this.state.latitude} </Text>
          <Text>{this.state.longtiude} </Text>

          <Button onPress={() => this.start()}>
            <Text>Start</Text>
          </Button>

          <Button onPress={() => this.stop()}>
            <Text>Stop</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

export default MainScene;
