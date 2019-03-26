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
      interval: 60000,
      fastestInterval: 120000,
      activitiesInterval: 100000,
      stopOnStillActivity: false,
      url: 'http://192.168.81.15:3000/location',
      // httpHeaders: {
      //   'X-FOO': 'bar'
      // },
      // // customize post properties
      // postTemplate: {
      //   lat: '@latitude',
      //   lon: '@longitude',
      //   foo: 'bar' // you can also add your own properties
      // }
    });

    BackgroundGeolocation.on('start', () => {
      console.log('[DEBUG] BackgroundGeolocation has been started');
      this.setState({ isRunning: true });
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[DEBUG] BackgroundGeolocation has been stopped');
      this.setState({ isRunning: false });
    });

    BackgroundGeolocation.on('authorization', status => {
      console.log(
        '[INFO] BackgroundGeolocation authorization status: ' + status
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay after permission prompt or otherwise alert will not be shown
        setTimeout(() =>
          Alert.alert(
            'App requires location tracking',
            'Would you like to open app settings?',
            [
              {
                text: 'Yes',
                onPress: () => BackgroundGeolocation.showAppSettings()
              },
              {
                text: 'No',
                onPress: () => console.log('No Pressed'),
                style: 'cancel'
              }
            ]
          ), 1000);
      }
    });

    BackgroundGeolocation.on('error', ({ message }) => {
      Alert.alert('BackgroundGeolocation error', message);
    });

    BackgroundGeolocation.on('location', location => {
      console.log('[DEBUG] BackgroundGeolocation location', location);
      BackgroundGeolocation.startTask(taskKey => {
        requestAnimationFrame(() => {
          const longitudeDelta = 0.01;
          const latitudeDelta = 0.01;
          const region = Object.assign({}, location, {
            latitudeDelta,
            longitudeDelta
          });
          const locations = this.state.locations.slice(0);
          locations.push(location);
          this.setState({ locations, region });
          BackgroundGeolocation.endTask(taskKey);
        });
      });
    });

    BackgroundGeolocation.on('stationary', (location) => {
      console.log('[DEBUG] BackgroundGeolocation stationary', location);
      BackgroundGeolocation.startTask(taskKey => {
        requestAnimationFrame(() => {
          const stationaries = this.state.stationaries.slice(0);
          if (location.radius) {
            const longitudeDelta = 0.01;
            const latitudeDelta = 0.01;
            const region = Object.assign({}, location, {
              latitudeDelta,
              longitudeDelta
            });
            const stationaries = this.state.stationaries.slice(0);
            stationaries.push(location);
            this.setState({ stationaries, region });
          }
          BackgroundGeolocation.endTask(taskKey);
        });
      });
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.checkStatus(({ isRunning }) => {
      this.setState({ isRunning });
    });
  }

  componentWillUnmount() {
    BackgroundGeolocation.events.forEach(event =>
      BackgroundGeolocation.removeAllListeners(event)
    );
  }

  start() {
    BackgroundGeolocation.checkStatus(({ isRunning, locationServicesEnabled, authorization }) => {
      if (isRunning) {
        BackgroundGeolocation.disable();
        return false;
      }
      
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

  render() {

    return (
      <Container>
        <Content>
          <Text>{this.state.latitude} </Text>
          <Text>{this.state.longtiude} </Text>

          <Button onPress={() => this.start()}>
            <Text>Start/Stop</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

export default MainScene;
