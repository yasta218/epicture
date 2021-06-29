import React from 'react'
import { StyleSheet, Text, View,Modal,Pressable,Linking,SafeAreaView,TextInput,Image } from 'react-native';
import DateTime from 'luxon/src/datetime.js';
import { connect } from 'react-redux';

class ImageCard extends React.Component{
    constructor(props){
        super(props)
    }

    _toggleFavorite(){
        const action = { type: "TOGGLE_FAVORITE", value: this.props.myImage }
        this.props.dispatch(action)
        console.log(this.props.isImageFavorite)
    }
    render(){
        let myImage = this.props.myImage
        let favorite = this.props.isImageFavorite
        return(
            <View style={styles.image_container}>
                <Pressable
                        onPress={()=>{
                            console.log("pressed !!! !! !! ")
                            this._toggleFavorite()
                        }}
                        onLongPress={()=>{
                            console.log("LONNNGGGGGG")
                        }}
                        style={({pressed})=>[
                            {
                                opacity : pressed? 0.5 : 1,
                                backgroundColor : favorite ? "red" : "transparent"
                            }
                        ]}>
                    <Image
                        style = {styles.image}
                        source={{uri: myImage.link}}>
                    </Image>
                    <View style={styles.subtitle}>                                                   
                            <Text>
                            { myImage.name ? myImage.name  : "null" }
                            </Text>
                            <Text>
                            { myImage.datetime ? DateTime.fromSeconds(myImage.datetime).toFormat('yyyy LLL dd')  : "null" }
                            </Text>                                                    
                    </View>
                </Pressable>                                       
            </View>
        )
    }
}

const styles = StyleSheet.create({
    head:{
        marginTop : 50,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection:'row'
    },
    body:{
        marginTop : 50,
        marginLeft : 10
    },
    image_container:{
        flex:1,
        width:'100%',
        alignItems: 'center',
        justifyContent : "center",
    },
    image:{
        width: 150,
        height: 180,
        margin: 5,
        backgroundColor: 'gray',
    },
    subtitle:{
        width: '70%'
    }
})
const mapStateToProps = state => {
    return {
        pseudo: state.pseudo,
        access_token : state.access_token,
        listFavorite : state.listFavorite
    }
}

export default connect(mapStateToProps)(ImageCard)

