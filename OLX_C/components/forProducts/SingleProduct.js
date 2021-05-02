import React, { useRef, useState, useEffect } from 'react'
import { Text, Container, Content, Card, CardItem, Right, Icon, Left, Body, Footer, FooterTab, Button, Thumbnail, Header, Toast } from 'native-base'
import { Alert, Image, View } from 'react-native'
import axios from 'axios'
import AppSetting from '../../AppSetting'
import { useSelector, useDispatch } from 'react-redux'
import call from 'react-native-phone-call'
export default function SingleProduct({ route, navigation }) {
    const loginUser = useSelector(state => state.auth)
    const forChangeColor = useRef()
    const dispatch = useDispatch()
    const { productId } = route.params
    const [changeColor, setChangeColor] = useState(false)
    const [getProduct, setGetProduct] = useState(null)
    const chnageTheColor = (obj) => {
        setChangeColor(!changeColor)
        if (changeColor == true) {
            let data = { productId: obj.productId }
            axios.post(`${AppSetting.Back_END_HOSTED_SERVER}/user/deleteSpecificWishItem/${loginUser._id}`, data)
                .then(succ => {
                    if (succ.status) {
                        Toast.show({
                            text: "Remove to wishlist",
                            buttonText: "Okay",
                        })
                        return
                    }
                }).catch(err => {
                    console.log("Error in Updating wishList ", err)
                })
        }
        let data = {
            productId: obj.productId,
            productName: obj.productName,
            productPrice: obj.productPrice,
            productImage: obj.productImage
        }
        axios.post(`${AppSetting.Back_END_HOSTED_SERVER}/user/updateWishlist/${loginUser._id}`, data)
            .then(succ => {
                if (succ.status) {
                    axios.get(`${AppSetting.Back_END_HOSTED_SERVER}/user/${loginUser._id}`)
                        .then(success => {
                            dispatch({
                                type: "Login",
                                payload: success.data.succ
                            })
                            Toast.show({
                                text: "Add to wishlist successfully",
                                buttonText: "Okay",
                            })
                            setChangeColor(!changeColor)
                            return
                        })
                }
            }).catch(err => {
                console.log("Error in Updating wishList ", err)
            })

    }
    const getSpecficAd = (id) => {
        axios.get(`${AppSetting.Back_END_HOSTED_SERVER}/product/findSpecific/${id}`)
            .then(succ => {
                setGetProduct(succ.data.ad)
            }).catch(err => {
                console.log("error in getting single post ", err)
            })
    }
    useEffect(() => {
        setGetProduct(null)
        getSpecficAd(productId)
        setChangeColor(false)
    }, [productId])
    const updateUserProfile = (obj) => {
        let data = { productId: obj.productId, productName: obj.productName, productPrice: obj.productPrice, productImage: obj.productImage }
        axios.post(`${AppSetting.Back_END_HOSTED_SERVER}/user/updateCard/${loginUser._id}`, data)
            .then(succ => {
                if (succ.status) {
                    axios.get(`${AppSetting.Back_END_HOSTED_SERVER}/user/${loginUser._id}`)
                        .then(success => {
                            dispatch({
                                type: "Login",
                                payload: success.data.succ
                            })
                            navigation.navigate("Cart", { productId: obj.productId })
                            console.log("Updated Successfully")
                            return
                        })
                }
            }).catch(err => {
                console.log("Error in Updating cart", err)
            })
    }
    function makeCall(number) {
        const args = {
            number: number,
            prompt: false
        }

        call(args).catch(console.error)
    }
    return <>
        <Container>
            <Header style={{ backgroundColor: "#f5fafa" }}>
                <Left>
                    <Icon name='arrow-back' onPress={() => navigation.goBack()} />
                </Left>
                <Body />
            </Header>
            <Content>
                {getProduct && <View>
                    <Card>
                        <CardItem cardBody>
                            <Image source={{ uri: `${getProduct.coverImageUrl}` }}
                                style={{ flex: 1, height: 400 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{ color: 'blue', fontSize: 20 }}>{getProduct.price}</Text>
                            </Left>
                            <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>{getProduct.productName}</Text>
                            </Body>
                            <Right>
                                <Icon name={changeColor ? 'heart-sharp' : 'heart-outline'} style={{ fontSize: 30, color: 'red' }} ref={forChangeColor}
                                    onPress={() => chnageTheColor({ productId: getProduct._id, productName: getProduct.productName, productPrice: getProduct.price, productImage: getProduct.coverImageUrl })} />
                            </Right>
                        </CardItem>
                    </Card>
                    <Card style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <CardItem>
                            <Text> Location | {getProduct.homeAddress}</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', paddingHorizontal: 5 }}> Discription</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ paddingHorizontal: 20 }}> {getProduct.details} </Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                                Seller Discription
                            </Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: `${getProduct.userInfo.userImageUrl}` }} />
                                <Body>
                                    <Text>{getProduct.userInfo.name}</Text>
                                    <Text note>Call Now</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <Button success full onPress={() => makeCall(getProduct.number)}>
                            <Text> Call Now</Text>
                        </Button>
                    </Card>
                </View>}
            </Content>
            <Footer>
                <FooterTab onPress={() => Alert.alert("hello world")} style={{ flex: 1, justifyContent: 'space-evenly', backgroundColor: "#f5fafa" }} >
                    <Button onPress={() => navigation.navigate("chatwithAdmin", { productId: getProduct._id, sellerId: getProduct.userInfo._id, productImage: getProduct.coverImageUrl})}>
                        <Icon name='chatbox-ellipses-sharp' />
                    </Button>
                    <Button warning onPress={() => updateUserProfile(
                        {
                            productId: getProduct._id,
                            productName: getProduct.productName,
                            productPrice: getProduct.price,
                            productImage: getProduct.coverImageUrl
                        }
                    )}>
                        <Text style={{ color: 'white', fontSize: 15 }}> Add to Card </Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    </>
}