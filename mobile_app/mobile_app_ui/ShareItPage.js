import React, {PureComponent} from 'react';
import {Body, Button, Card, CardItem, Container, Content, Icon} from 'native-base';
import {ScrollView, View, StyleSheet, Text} from "react-native";

import BackgroundGeolocation from "react-native-mauron85-background-geolocation";

class HomePage extends PureComponent {

    render() {
        return (
            <ScrollView>
                <Card>
                    <CardItem header>
                        <Text>Sri Lanka Railway Tracking System.</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text>If you in train. you like to share you'r location for others.</Text>
                        <Text>Click ShareIT. After Select you'r train and click Share.</Text>
                        <Text>Before you check you'r app settings. Because its use for share location
                            process.</Text>
                        <Text></Text>

                        </Body>
                    </CardItem>
                </Card>

            </ScrollView>
        );
    }
}

export default HomePage;

const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    }
})