import React, { PureComponent } from 'react';
import {ScrollView, StyleSheet} from "react-native";

import {
    Text,
    Card,
    CardItem,
    Body,
    Button, Icon,
} from 'native-base';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

class Settings extends PureComponent {

    render() {
        return (
            <ScrollView>
                <Card style={styles.mb}>
                    <CardItem header>
                        <Text>Sri Lanka Railway Tracking System.</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text>If you in train. you like to share you'r location for others.</Text>
                        <Text>Click ShareIT. After Select you'r train and click Share.</Text>
                        <Text>Before you check you'r app settings. Because its use for location share
                            process.</Text>
                        <Text></Text>
                        <Button block
                                success style={styles.mb15}
                                onPress={() => BackgroundGeolocation.showAppSettings()}
                        >
                            <Icon active name="ios-construct"/>
                            <Text>Show App Settings</Text>
                        </Button>
                        </Body>
                    </CardItem>
                </Card>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    mb: {
        marginBottom: 5,
        flex: 1
    },
    mb15: {
        marginBottom: 20
    }
});

export default Settings;