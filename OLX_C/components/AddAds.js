import React, { useEffect } from 'react'
import { Container, Header, Icon, Left, Body, Content } from 'native-base'
import { Image } from 'react-native-elements'
import { View } from 'react-native'
import AddAdsForm from './Forms/AddAdsForm'
import { useSelector } from 'react-redux'
export default function AddAds({ navigation }) {
    const loginUser = useSelector(state => state.auth)
    useEffect(() => {
        if (loginUser == null) {
            navigation.navigate("Login")
            return
        }
    }, [navigation])
    return <>
        <Container>
            <Header style={{ backgroundColor: "#2bb33b" }}>
                <Left>
                    <Icon name='arrow-back' style={{ color: 'white' }} onPress={() => navigation.goBack()} />
                </Left>
                <Body />
            </Header>
            <Content>
                <View>
                    <Image source={{ uri: "https://profit.pakistantoday.com.pk/wp-content/uploads/2018/11/OLX-Handshake.png" }}
                        style={{ flex: 1, height: 300 }} />
                </View>
                <AddAdsForm />
            </Content>
        </Container>

    </>
}
