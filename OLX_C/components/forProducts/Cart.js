import React, { useState, useEffect } from 'react'
import { Image } from 'react-native'
import { Header, Container, Content, Left, Icon, Body, Card, CardItem, Text, List, ListItem, Right, Button, Thumbnail } from 'native-base'
import { useSelector } from 'react-redux'
import { View } from 'react-native'
export default function Cart({ navigation }) {
    const loginUser = useSelector(state => state.auth)
    return <>
        <Container>
            <Header style={{ backgroundColor: "#f5fafa" }}>
                <Left>
                    <Icon name='arrow-back' onPress={() => navigation.goBack()} />
                </Left>
                <Body />
            </Header>
            <Content>
                {loginUser && <View>
                    <Card>
                        <CardItem style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Left>
                                <Text style={{ fontSize: 30, fontFamily: 'notoserif' }}>
                                    {loginUser.name} Wishlists
                                </Text>
                            </Left>
                            <Icon name='heart-sharp' style={{ fontSize: 30, color: 'red' }} />
                        </CardItem>
                    </Card>
                    <Card style={{ paddingVertical: 20 }}>
                        <CardItem header>
                            <Text style={{ fontFamily: 'sans-serif-medium', fontSize: 25 }}>Products</Text>
                        </CardItem>
                    </Card>
                    {loginUser.wishlist.length === 0 ? <Card>
                        <CardItem>
                            <Text style={{ color: 'red' }}> Currently you have 0 Items in your wishList </Text>
                        </CardItem>
                    </Card> : loginUser.wishlist.map(wish => <List>
                        <ListItem thumbnail>
                            <Left>
                                <Thumbnail square source={{ uri: `${wish.productImage}` }} style={{ height: 100, width: 150 }} />
                            </Left>
                            <Body>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{wish.productPrice}</Text>
                                <Text style={{ fontSize: 20 }}>{wish.productName}</Text>
                            </Body>
                            <Right>
                                <Button transparent onPress={() => navigation.navigate("SingleProduct", { productId: wish.productId })}>
                                    <Text>View</Text>
                                </Button>
                            </Right>
                        </ListItem>
                    </List>)}
                    <Card style = {{ marginVertical: 10}}>
                        <CardItem style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 30, fontFamily: 'notoserif' }}>
                                Items in Card
                            </Text>
                        </CardItem>
                    </Card>
                    {loginUser.card.length === 0 ? <Card key={card.productId}>
                        <CardItem style={{marginVertical: 10}}>
                            <Text style={{ color: 'red' }}> Currently you have 0 Items in your Cart </Text>
                        </CardItem>
                    </Card> : loginUser.card.map(c => <List>
                        <ListItem thumbnail>
                            <Left>
                                <Thumbnail square source={{ uri: `${c.productImage}` }} style={{ height: 100, width: 150 }} />
                            </Left>
                            <Body>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{c.productPrice}</Text>
                                <Text style={{ fontSize: 20 }}>{c.productName}</Text>
                            </Body>
                            <Right>
                                <Button transparent onPress={() => navigation.navigate("SingleProduct", { productId: c.productId })}>
                                    <Text>View</Text>
                                </Button>
                            </Right>
                        </ListItem>
                    </List>)}
                </View>}
            </Content>
        </Container>






    </>
}
