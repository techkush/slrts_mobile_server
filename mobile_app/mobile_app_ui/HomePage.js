import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet, TextInput, View, Alert} from 'react-native';

import firebase from '@firebase/app'
import '@firebase/auth'
import "@firebase/database";
import DeviceInfo from 'react-native-device-info';

import {
    Text,
    Card,
    CardItem,
    Body,
    Button, Icon,
    Left,
    Right,

} from 'native-base';

import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

class HomePage extends PureComponent {

    state = {
        names: [
            {'name': 'Sagarika (Maradana)', 'id': 1, 'dest': 'Matara - Maradana'},
            {'name': 'Ruhunu Kumari', 'id': 2, 'dest': 'Matara - Maradana'},
            {'name': 'Galu Kumari', 'id': 3, 'dest': 'Matara - Maradana'},
            {'name': 'Rajarata Rajini', 'id': 4, 'dest': 'Matara - Vavuniya'},
        ],
        subject: null,
        content: null,
    }

    componentWillMount(){
        var name,age;
        var config = {
            apiKey: "AIzaSyBe8H-HVarkEEmfM-2uTF18pVN4ncRk5AI",
            authDomain: "slrtsalgo.firebaseapp.com",
            databaseURL: "https://slrtsalgo.firebaseio.com",
            projectId: "slrtsalgo",
            storageBucket: "slrtsalgo.appspot.com",
            messagingSenderId: "1066802033757"
        };
        firebase.initializeApp(config);

        //Add data
        firebase.database().ref('users/003').set(
            {
                name: 'Kakka Kolla',
                age: 23
            }
        ).then(() => {
            console.log('Inserted!');
        }).catch((error) => {
            console.log(error);
        });

        //Retrive Data
        // firebase.database().ref('user/001').once('value', (data) => {
        //   console.log(data.toJSON());
        // });
    }

    newsAlert() {
        Alert.alert(
            this.state.subject,
            this.state.content,
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
        );
    }

    render() {
        return (
            <ScrollView>
                <Card style={styles.mb}>
                    <CardItem header bordered>
                        <Text>Live Trains - දැනට ධාවනය වන දුම්රියන්</Text>
                        <Text>{ DeviceInfo.getUniqueID()}</Text>
                    </CardItem>
                    {
                        this.state.names.map((item, index) => (
                            <View key={item.id} style={styles.item}>
                                <CardItem>
                                    <Left>
                                        <Icon active name="train" style={{color: "#d65f1a"}}/>
                                        <Body>
                                        <Text>{item.name}</Text>
                                        <Text numberOfLines={1} note>
                                            {item.dest}
                                        </Text>
                                        </Body>
                                    </Left>
                                    <Right>
                                        <Icon name="arrow-forward"
                                              onPress={() => BackgroundGeolocation.showAppSettings()}/>
                                    </Right>
                                </CardItem>
                            </View>
                        ))
                    }
                </Card>

                <Card style={styles.mb}>
                    <CardItem header bordered>
                        <Text>Submit News - හදිසි දැනුම්දීම්</Text>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Icon active name="book" style={{color: "#686868"}}/>
                            <Body>
                            <TextInput
                                style={styles.inputText}
                                placeholder="  Subject"
                                onChangeText={(subject) => this.setState({subject})}
                            />
                            </Body>
                        </Left>

                    </CardItem>
                    <CardItem>
                        <Left>
                            <Icon active name="document" style={{color: "#686868"}}/>
                            <Body>
                            <TextInput
                                style={styles.inputText}
                                placeholder="  Content"
                                onChangeText={(content) => this.setState({content})}
                            />
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Button block info style={styles.mb15} onPress={() => this.newsAlert()}>
                            <Icon active name="send"/>
                            <Text>Send News</Text>
                        </Button>
                        </Body>
                    </CardItem>
                </Card>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        flex: 1
    },
    mb: {
        marginBottom: 5,
        flex: 1
    },
    mb15: {
        marginBottom: 20
    },
    iconStyle: {
        color: '#0A69FE'
    },
    inputText: {
        height: 40,
        borderRadius: 1,
        borderWidth: 2,
        borderColor: '#686868',
    }

});

export default HomePage;