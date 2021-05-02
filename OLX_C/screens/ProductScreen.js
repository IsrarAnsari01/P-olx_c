import React from 'react'
import { View } from 'react-native'
import { Content, Container } from 'native-base'
import HeaderForApp from '../components/Header'
import AllProducts from '../components/forProducts/AllProducts'
export default function ProductScreen({ navigation }) {

    return <Container style={{ flex: 1 }}>
        <HeaderForApp navigation={navigation} />
        {/* If We want to impliment pagination in our project then this method must be implemented */}
        {/* <View>
                    <AllProducts navigation={navigation} />
                </View> */}
        <Content>
            <AllProducts navigation={navigation} />
        </Content>

    </Container>



}