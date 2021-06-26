import React, { useState, useEffect } from 'react'
import { Image } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';
import { PricingCard } from 'react-native-elements';
import { Row, Grid } from "react-native-easy-grid"
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import AppSetting from '../../AppSetting'
export default function ProductsCard(props) {
    const loginUser = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [topFourProducts, setTopFourProducts] = useState(null)
    const getProductsFromDb = () => {
        axios.get(`${AppSetting.Back_END_HOSTED_SERVER}/product`)
            .then(succ => {
                setTopFourProducts(succ.data.products.reverse().slice(0, 10))
                dispatch({
                    type: "updateProducts",
                    payload: succ.data.products.reverse()
                })

            }).catch(err => {
                console.log("Error in Fetching Products", err)
            })
    }
    let i = 0;
    useEffect(() => {
        navigation.addListener('focus', () => {
            getProductsFromDb()
            console.log("Inside productsCard use Effect", ++i)
        });
    }, [props.navigation])
    return <>
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
                        onButtonPress={() => loginUser ? props.navigation.navigate("SingleProduct", { productId: product._id }) : props.navigation.navigate("Login")}
                        color="#4f9deb"
                        title={product.productName}
                        price={product.price}
                        info={[`${product.number}`, `${product.homeAddress}`, `${product.addedOn}`]}
                        button={{ title: 'Purchase Now', icon: 'flight-takeoff' }}
                    />
                </Card>
            </Row>)}
        </Grid>

    </>
}
