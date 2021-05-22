import React, { useEffect, useState } from 'react'
// import { Image } from 'react-native';
// import { Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';
import { PricingCard } from 'react-native-elements';
// import { Row, Grid } from "react-native-easy-grid"
import { useSelector } from 'react-redux'
import axios from 'axios'
import AppSetting from '../AppSetting'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Content, Icon, Container, Input, Item, CardItem, Card, Button, Thumbnail, Left, Body } from 'native-base'
import { Col, Grid, Row } from "react-native-easy-grid"
import DeckSwiperForOLX from '../components/forHomePage/DrakSwiperForHS'
import HeaderForApp from '../components/Header';
export default function HomeScreen({ navigation }) {
    const loginUser = useSelector(state => state.auth)
    const [topFourProducts, setTopFourProducts] = useState(null)
    const [copyTopFourProducts, setCopyTopFourProducts] = useState(null)
    const getProductsFromDb = () => {
        axios.get(`${AppSetting.Back_END_HOSTED_SERVER}/product`)
            .then(succ => {
                setTopFourProducts(succ.data.products.reverse().slice(4, 15))
                setCopyTopFourProducts(succ.data.products.reverse().slice(4, 15))
            }).catch(err => {
                console.log("Error in Fetching Products", err)
            })
    }
    useEffect(() => {
        getProductsFromDb()
    }, [])
    function filterList(productName) {
        let filterArray = copyTopFourProducts.filter(product => product.productName.includes(productName))
        if (!filterArray) {
            setCopyTopFourProducts(topFourProducts)
        }
        setTopFourProducts(filterArray)
    }
    return <>
        <Container>
            <HeaderForApp navigation={navigation} />
            <View style={{ backgroundColor: "#f5fafa", height: 60 }}>
                <Grid>
                    <Col size={100}>
                        <Item style={{ marginTop: 9 }}>
                            <View style = {{marginLeft: 10}}>
                                <Icon name="ios-search" />
                            </View>
                            <Input placeholder="Search by product Name" onChangeText={text => filterList(text)} />
                            <View style = {{marginRight: 10}}>
                                <Icon name="layers-sharp" />
                            </View>
                        </Item>
                    </Col>
                </Grid>
            </View>
            <Content style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                <DeckSwiperForOLX navigation={navigation} />
                <Grid>
                    <Row size={1}>
                        <Card style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                            <CardItem Header>
                                <Text style={styles.forRecomText}> Fresh Recommandations </Text>
                            </CardItem>
                        </Card>
                    </Row>
                    <Row size={3}>
                        {/* <ProductsCard navigation = {navigation} /> */}
                        <Grid style={{ marginVertical: 10, marginHorizontal: 10 }}>
                            {topFourProducts && topFourProducts.length === 0 ? <Card>
                                <CardItem header style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20 }}> Team OLX | IA </Text>
                                </CardItem>
                                <CardItem bordered>
                                    <Text style={{ textAlign: 'center' }}>
                                        Product Recommandation will updated Soon
                                    </Text>
                                </CardItem>
                                <CardItem footer>
                                    <Text> Message by Store Owner</Text>
                                </CardItem>
                            </Card> : topFourProducts && topFourProducts.map(product => <Row key={product._id}>
                                <Card style={{ flex: 1 }}>
                                    <CardItem>
                                        <Left>
                                            <Thumbnail source={{ uri: `${product.coverImageUrl}` }} />
                                            <Body>
                                                <Text>{product.productName}</Text>
                                                <Text note>{product.price}</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Image source={{ uri: `${product.coverImageUrl}` }} style={{ height: 200, width: 200, flex: 1, }} />
                                    </CardItem>
                                    <PricingCard
                                        onButtonPress={() => loginUser ? navigation.navigate("SingleProduct", { productId: product._id }) : props.navigation.navigate("Login")}
                                        color="#4f9deb"
                                        title={product.productName}
                                        price={product.price}
                                        info={[`${product.number}`, `${product.homeAddress}`, `${product.addedOn}`]}
                                        button={{ title: 'Purchase Now', icon: 'flight-takeoff' }}
                                    />
                                </Card>
                            </Row>)}
                        </Grid>

                    </Row>
                </Grid>
                <Grid>
                    <Col style={{ marginVertical: 10, paddingHorizontal: 20, paddingVertical: 40 }}>
                        <View>
                            <Button success full onPress={() => navigation.navigate("Products")}>
                                <Text style={{ color: "white", fontSize: 20 }}>
                                    See All Products
                                </Text>
                            </Button>
                        </View>
                    </Col>
                </Grid>
            </Content>
        </Container>
    </>
}

const styles = StyleSheet.create({
    forRecomText: {
        fontSize: 25,
        fontFamily: 'sans-serif-condensed',
        // letterSpacing: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: 8,
    }
})




