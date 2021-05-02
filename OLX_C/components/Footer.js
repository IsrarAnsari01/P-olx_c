import React from 'react'
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
export default function FooterForApp() {
    return <>
        <Footer>
            <FooterTab style={{ backgroundColor: "#f5fafa", borderColor: 'black' }}>
                <Button vertical>
                    <Icon name="person-add-sharp" style = {{color:'black'}}/>
                    <Text style = {{color:'black'}}>Sign in </Text>
                </Button>
                <Button vertical>
                    <Icon name="share-sharp" style = {{color:'black'}} />
                    <Text style = {{color:'black'}}>Add Ads</Text>
                </Button>
                <Button vertical>
                    <Icon active name="man-sharp" style = {{color:'black'}} />
                    <Text style = {{color:'black'}}>Profile</Text>
                </Button>
            </FooterTab>
        </Footer>
    </>
}
