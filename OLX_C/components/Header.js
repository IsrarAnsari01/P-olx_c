import React, { useEffect, useState } from 'react'
import { Header, Icon, Button, Left, Right, Body, ActionSheet, Badge } from 'native-base'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'

export default function HeaderForApp(props) {
    const loginUser = useSelector(state => state.auth)
    var BUTTONS = [
        { text: "Login", icon: "person", iconColor: "#2c8ef4" },
        { text: "Signin", icon: "chatbubbles", iconColor: "#f42ced" },
        { text: "Sell", icon: "add", iconColor: "#ea943b" },
        { text: "Cancel", icon: "close", iconColor: "#25de5b" }
    ];
    const routeUser = (index) => {
        if (index == 0) {
            props.navigation.navigate("Login")
            return
        } else if (index == 1) {
            props.navigation.navigate("Sigin")
            return
        } else if (index == 2) {
            props.navigation.navigate("AddAds")
            return
        }
    }

    return <>
        <Header style={{ height: 100, backgroundColor: "#f5fafa" }}>
            <Left style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-evenly' }}>
                <Icon style={{ color: 'black', fontSize: 40 }} name='menu' onPress={() => props.navigation.openDrawer()} />
                <Text style={{ fontSize: 35, fontWeight: 'bold', color: "#141e30" }}> OLX </Text>
            </Left>
            <Body />
            <Right>
                {loginUser ?
                    <View style={{ marginRight: 20 }}>
                        <Badge danger>{loginUser.card && <Text>{loginUser.card.length}</Text>}</Badge>
                        <Icon style={{ color: 'black', fontSize: 40 }} name='cart' onPress={() => loginUser ? props.navigation.navigate("Cart") : props.navigation.navigate("Login")} />
                    </View> :
                    <Icon name="ellipsis-vertical-sharp" style={{ color: 'black', fontSize: 30 }}
                        onPress={() =>
                            ActionSheet.show({
                                options: BUTTONS,
                                title: "Login/Signin/Add Ads"
                            },
                                buttonIndex => {
                                    routeUser(buttonIndex)
                                }
                            )}
                    />
                }
            </Right>
        </Header>
    </>
}











































