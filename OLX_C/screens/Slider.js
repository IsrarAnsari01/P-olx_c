import React, { useState, useEffect } from 'react'
import { Icon, Container, Header, Content, Footer, Left, Body, Toast, Right, FooterTab, Button, Text } from 'native-base'
import { Image, View } from 'react-native'
import { DrawerActions } from '@react-navigation/native'
import { Divider } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
export default function Slider({ navigation }) {
    const [isLike, setIsLike] = useState(false)
    const loginUser = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const logoutUser = () => {
        dispatch({
            type: 'Logout'
        })
        navigation.navigate("Login")
    }
    const showIsLike = () => {
        setIsLike(!isLike)
        if (isLike) {
            Toast.show({
                text: "Sad to get unlike",
                buttonText: "Okay",
                buttonTextStyle: { color: "#008000" },
                buttonStyle: { backgroundColor: "#5cb85c" }
            })
            return
        }
        Toast.show({
            text: "Thanks For Your Ranking",
            buttonText: "Okay",
            buttonTextStyle: { color: "#008000" },
            buttonStyle: { backgroundColor: "#5cb85c" }
        })
    }
    return <>
        <Container>
            <Header style={{ backgroundColor: "white" }}>
                <Left>
                    <Icon name='close' style={{}} onPress={() => navigation.dispatch(DrawerActions.closeDrawer())} />
                </Left>
                <Body />
                <Right />
            </Header>
            <Content>
                <View style={{ height: 200, backgroundColor: "#eef2f3", marginBottom: 15 }}>
                    <Image source={require('../Images/olx.png')} style={{ width: 280, height: 200, }} />
                </View>
                <Divider style={{ backgroundColor: '#b1bdb4' }} />
                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 20, paddingHorizontal: 25 }}>
                    <Icon name='home' style={{ fontSize: 30 }} />
                    <Button transparent light onPress={() => navigation.navigate("Home")}>
                        <Text style={{ fontSize: 25, color: 'black' }}> Home </Text>
                    </Button>
                </View>
                <Divider style={{ backgroundColor: '#b1bdb4' }} />
                <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 20 }}>
                    <Icon name='layers-sharp' style={{ fontSize: 30 }} />
                    <Button transparent light onPress={() => navigation.navigate("Products")}>
                        <Text style={{ fontSize: 25, color: 'black' }}> Products </Text>
                    </Button>
                </View>
                <Divider style={{ backgroundColor: '#b1bdb4' }} />
                <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 20 }}>
                    <Icon name={isLike ? 'thumbs-up-sharp' : 'star'} style={{ fontSize: 40, color: '#e8d348' }} onPress={showIsLike} />
                    <Button transparent light>
                        {isLike ? <Text style={{ fontSize: 25, color: 'black' }}> Liked </Text> : <Text style={{ fontSize: 25, color: 'black' }}> Rate us </Text>}
                    </Button>
                </View>
            </Content>
            {loginUser ? <Footer style={{ height: 100 }}>
                <FooterTab style={{ backgroundColor: "#f5fafa", height: 100 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Button transparent dark style={{ margin: 20, borderRadius: 60 }} onPress={() => logoutUser()}>
                            <Text style={{ fontSize: 20, color: 'white', paddingTop: 15 }} > Logout </Text>
                        </Button>
                    </View>
                </FooterTab>
            </Footer> :
                <Footer style={{ height: 100 }}>
                    <FooterTab style={{ backgroundColor: "#f5fafa", height: 100 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name='log-in-sharp' style={{ fontSize: 50, }} />
                            <Button transparent dark style={{ margin: 20, borderRadius: 60 }} onPress={() => navigation.navigate("Login")}>
                                <Text style={{ fontSize: 20, color: 'white', paddingTop: 15 }} > Log in </Text>
                            </Button>
                        </View>
                    </FooterTab>
                </Footer>
            }

        </Container>

    </>
};
