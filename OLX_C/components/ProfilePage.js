import React, { useEffect, useState } from 'react'
import { Text, Container, Content, Header, Left, Icon, Body, H2, Card, CardItem, Right, List, ListItem, Thumbnail, Button, ActionSheet, Spinner } from 'native-base'
import { View } from 'react-native'
import { Divider } from 'react-native-elements';
import { Image } from 'react-native-elements';
import { Col, Grid, Row } from "react-native-easy-grid"
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import AppSetting from '../AppSetting'
export default function ProfilePage({ navigation }) {
    const loginUser = useSelector(state => state.auth)
    const [getThisUserAds, setGetThisUserAds] = useState(null)
    const getPostedJobsByThisUser = (id) => {
        axios.get(`${AppSetting.Back_END_HOSTED_SERVER}/product/specificUserAd/${id}`)
            .then(succ => {
                setGetThisUserAds(succ.data.specficUserAd)
            }).catch(err => {
                console.log("Err in finding Ads", err)
            })
    }
    useEffect(() => {
        if (loginUser === null) {
            navigation.navigate("Login")
            return
        }
        navigation.addListener('focus', () => {
            getPostedJobsByThisUser(loginUser._id)
        });
    }, [])
    const dispatch = useDispatch()
    var BUTTONS = [
        { text: "Logout", icon: "exit-outline", iconColor: "#6da663" },
        { text: "Update", icon: "duplicate-outline", iconColor: "#6da663" },
        { text: "Delete Account ", icon: "trash-sharp", iconColor: "red" },
        { text: "Cancel", icon: "close", iconColor: "#25de5b" }
    ];
    const routeUser = (index) => {
        if (index == 0) {
            dispatch({
                type: "Logout",
            })
            navigation.navigate("Login")
            return
        } else if (index == 1) {
            navigation.navigate("Update", { userInformation: loginUser })
            return;
        } else if (index == 2) {
            axios.get(`${AppSetting.Back_END_HOSTED_SERVER}/user/delete-user/${loginUser._id}`)
                .then(res => {
                    if (res.status) {
                        axios.get(`${AppSetting.Back_END_HOSTED_SERVER}/prod`)
                            .then(succ => {
                                if (succ.status) {
                                    dispatch({
                                        type: "Logout",
                                    })
                                }
                            })
                        navigation.navigate("Login")
                    }
                }).catch(err => {
                    alert("Error in Deleting User", err)
                })
            return
        }
    }
    const deleteThisWishListItem = (productId) => {
        let data = { productId }
        axios.post(`${AppSetting.Back_END_HOSTED_SERVER}/user/deleteSpecificWishItem/${loginUser._id}`, data)
            .then(succ => {
                if (succ.status) {
                    axios.get(`${AppSetting.Back_END_HOSTED_SERVER}/user/${loginUser._id}`)
                        .then(success => {
                            dispatch({
                                type: "Login",
                                payload: success.data.succ
                            })
                            alert("Successfully Delete Wish List Item")
                            return
                        })
                }
            }).catch(err => {
                console.log("Error in Delete Wish List Item ", err)
            })
    }
    const deleteCardItem = (productId) => {
        let data = { productId }
        axios.post(`${AppSetting.Back_END_HOSTED_SERVER}/user/deleteSpecificCardItem/${loginUser._id}`, data)
            .then(succ => {
                if (succ.status) {
                    axios.get(`${AppSetting.Back_END_HOSTED_SERVER}/user/${loginUser._id}`)
                        .then(success => {
                            dispatch({
                                type: "Login",
                                payload: success.data.succ
                            })
                            alert("Successfuly delete Item")
                            return
                        })
                }
            }).catch(err => {
                console.log("Error in Delete Card Item ", err)
            })
    }
    const deleteThisProduct = (id) => {
        axios.get(`${AppSetting.Back_END_HOSTED_SERVER}/product/deleteAd/${id}`)
            .then(succ => {
                return axios.get(`${AppSetting.Back_END_HOSTED_SERVER}/user/removeSpecficProductFromStudentCardItem/${id}`)
                    .then(success => {
                        if (success.status) {
                            axios.get(`${AppSetting.Back_END_HOSTED_SERVER}/user/removeSpecficProductFromStudentWishItem/${id}`)
                                .then(finalSucc => {
                                    if (finalSucc.status) {
                                        alert("Successfully Deleted This Ad")
                                        getPostedJobsByThisUser(loginUser._id)
                                        return;
                                    }
                                })
                        }
                    })

            }).catch(err => {
                console.log("Error in Deleting JOb", err)
            })
    }
    return <>
        <Container>
            <Header style={{ backgroundColor: "#f5fafa" }}>
                <Left>
                    <Icon name='arrow-back' onPress={() => navigation.goBack()} />
                </Left>
                <Body />
                <Right>
                    <Button transparent light
                        onPress={() =>
                            ActionSheet.show({
                                options: BUTTONS,
                                title: "Update / Delete / Cencel"
                            },
                                buttonIndex => {
                                    routeUser(buttonIndex)
                                }
                            )}
                    >
                        <Icon name='settings-sharp' style={{ color: 'black' }} />
                    </Button>
                </Right>
            </Header>
            <Content>
                {loginUser && <View>
                    <View style={{ position: 'relative', }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={{ uri: 'https://www.nicepng.com/png/full/825-8257184_olx-3d-logo-olx-logo-3d-png.png' }}
                                style={{ height: 250, width: 500 }} />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 140, right: 140, top: 150 }}>
                            <Image source={{ uri: `${loginUser.userImageUrl}` }}
                                style={{ height: 200, width: 200, borderRadius: 600 }} />
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                        <Card>
                            <CardItem>
                                <H2 style={{ fontSize: 26 }}>{loginUser.name}</H2>
                            </CardItem>
                        </Card>
                    </View>
                    <Grid>
                        <Row>
                            <View style={{ flex: 1, justifyContent: 'space-evenly', marginHorizontal: 30 }}>
                                <Body>
                                    <Icon name='logo-whatsapp' style={{ color: 'green', fontSize: 40 }} />
                                </Body>
                                <Right>
                                    <Text style={{ fontSize: 30 }}>
                                        {loginUser.whatsapp}
                                    </Text>
                                </Right>
                            </View>
                        </Row>
                        <Divider style={{ backgroundColor: '#f5f5f5' }} />
                        <Row>
                            <View style={{ flex: 1, justifyContent: 'space-evenly', marginHorizontal: 30, marginVertical: 10 }}>
                                <Body>
                                    <Icon name='mail' style={{ color: 'red', fontSize: 40 }} />
                                </Body>
                                <Right>
                                    <Text style={{ fontSize: 30 }}>
                                        {loginUser.email}
                                    </Text>
                                </Right>
                            </View>
                        </Row>
                        <Card>
                            <CardItem header>
                                <Text style={{ fontSize: 20, }}> Address </Text>
                            </CardItem>
                            <CardItem cardBody>
                                <Text style={{ fontSize: 20, paddingHorizontal: 30 }}> {loginUser.homeAddress} </Text>
                            </CardItem>
                        </Card>
                        <Row>
                            <Col>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                                    <Text style={{ fontSize: 35, fontWeight: 'bold' }}> Wishlists </Text>
                                </View>
                                {loginUser.wishlist.length === 0 ?
                                    <Card>
                                        <CardItem>
                                            <Text style={{ color: 'red' }}> Currently you dont have any wishlist Item</Text>
                                        </CardItem>
                                    </Card> : loginUser.wishlist.map(wish => <View key={wish.productId}>
                                        <List>
                                            <ListItem thumbnail>
                                                <Left>
                                                    <Thumbnail square source={{ uri: `${wish.productImage}` }} />
                                                </Left>
                                                <Body>
                                                    <Text>{wish.productName}</Text>
                                                    <Text>{wish.productPrice}</Text>
                                                </Body>
                                                <Right style={{ flex: 1, flexDirection: 'row', paddingBottom: 25 }}>
                                                    <Button transparent onPress={() => navigation.navigate("SingleProduct", { productId: wish.productId })}>
                                                        <Text>View</Text>
                                                    </Button>
                                                    <Button danger transparent onPress={() => deleteThisWishListItem(wish.productId)}>
                                                        <Text> Delete</Text>
                                                    </Button>
                                                </Right>
                                            </ListItem>
                                        </List>
                                    </View>)}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                                    <Text style={{ fontSize: 35, fontWeight: 'bold' }}> Card Items </Text>
                                </View>
                                {loginUser.card.length === 0 ?
                                    <Card>
                                        <CardItem>
                                            <Text style={{ color: 'red' }}> Currently you dont have any Card Item</Text>
                                        </CardItem>
                                    </Card> : loginUser && loginUser.card.map(card => <View key={card.productId}>
                                        <List>
                                            <ListItem thumbnail>
                                                <Left>
                                                    <Thumbnail square source={{ uri: `${card.productImage}` }} />
                                                </Left>
                                                <Body>
                                                    <Text>{card.productName}</Text>
                                                    <Text>{card.productPrice}</Text>
                                                </Body>
                                                <Right style={{ flex: 1, flexDirection: 'row', paddingBottom: 25 }}>
                                                    <Button transparent onPress={() => navigation.navigate("SingleProduct", { productId: card.productId })}>
                                                        <Text>View</Text>
                                                    </Button>
                                                    <Button danger transparent onPress={() => deleteCardItem(card.productId)}>
                                                        <Text> Delete</Text>
                                                    </Button>
                                                </Right>
                                            </ListItem>
                                        </List>
                                    </View>)}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                                    <Text style={{ fontSize: 35, fontWeight: 'bold' }}> Posted Ads </Text>
                                </View>
                                {getThisUserAds && getThisUserAds.length === 0 ? <Card>
                                    <CardItem>
                                        <Text style={{ color: 'red' }}> Currently You don't post any Ad </Text>
                                    </CardItem>
                                </Card> : getThisUserAds && getThisUserAds.map(ad => <View key={ad._id}>
                                    <List>
                                        <ListItem thumbnail>
                                            <Left>
                                                <Thumbnail square source={{ uri: `${ad.coverImageUrl}` }} />
                                            </Left>
                                            <Body>
                                                <Text>{ad.productName}</Text>
                                                <Text>{ad.price}</Text>
                                            </Body>
                                            <Right style={{ flex: 1, flexDirection: 'row', paddingBottom: 25 }}>
                                                <Button danger transparent onPress={() => deleteThisProduct(ad._id)}>
                                                    <Text> Delete</Text>
                                                </Button>
                                            </Right>
                                        </ListItem>
                                    </List>
                                </View>)}
                            </Col>
                        </Row>
                    </Grid>
                </View>}
            </Content>
        </Container>


    </>
}
