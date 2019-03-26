
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Title, Body, Left, Right, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';

import HomePage from './HomePage';
import ShareIt from './ShareItPage';
import Chat from './ChatPage';
import Settings from './SettingsPage';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab1: true,
            tab2: false,
            tab3: false,
            tab4: false,
            index: 0
        };

    }
    toggleTab1() {
        this.setState({
            tab1: true,
            tab2: false,
            tab3: false,
            tab4: false
        });
        this.switchScreen(0);
    }
    toggleTab2() {
        this.setState({
            tab1: false,
            tab2: true,
            tab3: false,
            tab4: false
        });
        this.switchScreen(1);
    }
    toggleTab3() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: true,
            tab4: false
        });

        this.switchScreen(2);
    }
    toggleTab4() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: false,
            tab4: true
        });
        this.switchScreen(3);
    }

    switchScreen(index) {
        this.setState({ index: index })
    }

    render() {
        let AppComponent = 0;
        if (this.state.index == 0) {
            AppComponent = HomePage;
        } else if(this.state.index == 1) {
            AppComponent = ShareIt;
        } else if (this.state.index == 2) {
            AppComponent = Chat;
        } else {
            AppComponent = Settings;
        }

        return (
            <Container style={styles.container}>
                <Header>
                    <Body>
                    <Title> SLRTS - Live Trains</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name="search" />
                        </Button>
                        <Button transparent>
                            <Icon name="heart" />
                        </Button>
                        <Button transparent>
                            <Icon name="more" />
                        </Button>
                    </Right>
                </Header>

                <Content padder>
                    <AppComponent/>
                </Content>

                <Footer>
                    <FooterTab>
                        <Button vertical active={this.state.tab1} onPress={() => this.toggleTab1()}>
                            <Icon active={this.state.tab1} name="home" />
                            <Text>Home</Text>
                        </Button>

                        <Button vertical active={this.state.tab2} onPress={() => this.toggleTab2()}>
                            <Icon active={this.state.tab2} name="train" />
                            <Text>Share-It</Text>
                        </Button>

                        <Button vertical active={this.state.tab3} onPress={() => this.toggleTab3()}>
                            <Icon active={this.state.tab3} name="mail" />
                            <Text>Chat</Text>
                        </Button>

                        <Button vertical active={this.state.tab4} onPress={() => this.toggleTab4()}>
                            <Icon active={this.state.tab4} name="settings" />
                            <Text>Settings</Text>
                        </Button>

                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    }
});