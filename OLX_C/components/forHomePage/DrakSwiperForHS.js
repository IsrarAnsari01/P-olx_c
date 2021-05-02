import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button, Container, Header } from 'native-base';
import { Divider } from 'react-native-elements';
import { useSelector } from 'react-redux'
import axios from 'axios'
import AppSetting from '../../AppSetting'
export default function DeckSwiperForOLX(props) {
    const loginUser = useSelector(state => state.auth)
    const allProducts = useSelector(state => state.products)
    const [recentlyUploadedFrourProducts, setRecentlyUploadedFrourProducts] = useState(null)
    const getProductsFromDb = () => {
        axios.get(`${AppSetting.Back_END_HOSTED_SERVER}/product`)
            .then(succ => {
                setRecentlyUploadedFrourProducts(succ.data.products.reverse().slice(0, 4))
            }).catch(err => {
                console.log("Error in Fetching Products", err)
            })
    }
    useEffect(() => {
        getProductsFromDb()
        console.log(allProducts)
    }, [])
    return <>
        <Container style={{ marginTop: 10, height: 550 }}>
            <Header style={{ backgroundColor: "#f5fafa", height: 60 }}>
                <Body>
                    <Text style={{ fontSize: 18, paddingHorizontal: 80 }}> Recently Uploaded {recentlyUploadedFrourProducts && recentlyUploadedFrourProducts.length} Products </Text>
                </Body>
            </Header>
            <View>
                {recentlyUploadedFrourProducts && recentlyUploadedFrourProducts.length === 0 ? <Card>
                    <CardItem header style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20 }}> Team OLX | IA </Text>
                    </CardItem>
                    <CardItem bordered>
                        <Text style={{ textAlign: 'center' }}>
                            With due respect we inform you that some how all the products of this store deleted we will
                            upload new products very soon
                        </Text>
                    </CardItem>
                    <CardItem footer>
                        <Text> Message by Store Owner</Text>
                    </CardItem>
                </Card> : recentlyUploadedFrourProducts && <DeckSwiper
                    dataSource={recentlyUploadedFrourProducts}
                    renderItem={item =>
                        <Card style={{ elevation: 3 }}>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={{ uri: item.coverImageUrl }} />
                                    <Body>
                                        <Text>{item.productName}</Text>
                                        <Text note>{item.homeAddress}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <Divider style={{ backgroundColor: 'black' }} />
                            <CardItem cardBody>
                                <Image style={{ height: 300, flex: 1 }} source={{ uri: item.coverImageUrl }} />
                            </CardItem>
                            <CardItem style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <View style={{ padding: 15, borderRadius: 40 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.productName.length > 15 ? item.productName.substr(0, 15) + "....." : item.productName}</Text>
                                </View>
                                <View style={{ padding: 15, borderRadius: 40 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>RS: {item.price}</Text>
                                </View>
                                <View>
                                    <Button success style={{ borderRadius: 50 }} onPress={() => loginUser ? props.navigation.navigate("SingleProduct", { productId: item._id }) : props.navigation.navigate("Login")}>
                                        <Text> Purchase Now </Text>
                                    </Button>
                                </View>
                            </CardItem>
                        </Card>}
                />}
            </View>
        </Container>
    </>
}