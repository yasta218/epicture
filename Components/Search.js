import React from 'react';
import {StyleSheet,Text, View, FlatList,Image, Button,TextInput} from 'react-native';
import {getImageByText} from '../API/IMGURAPI'
import { connect } from 'react-redux'

export default class Search extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            image :[]
        }
        this.searchedText = "" 
    }
    _searchTextInputChanged(text){
        this.searchedText = text
        console.log(this.searchedText)
    }
    _searchImage = async (text) =>{
       await this.setState({
            image: []
        },
        async ()=>{
            let liste = await getImageByText(text)
            this.setState({
                image: [...this.state.image,...liste]
            })
               console.log("liste après recherche " ,liste)
            }
        )}
       
    //    on change le state image
    
    render(){
        return (
            <View>
                
                <Button
                    onPress = {() => this._searchImage(this.searchedText)}
                    title="Learn More"/>
                <TextInput
                    // style={styles.input}
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    placeholder="useless placeholder"/>
                <FlatList
                        data={this.state.image}
                        keyExtractor = {(item) => item.id}
                        // On utilise la prop extraData pour indiquer à notre FlatList que d’autres données 
                        //doivent être prises en compte si on lui demande de se re-rendre
                        onEndReachThreashold = {0.5}
                        // onEndReached={()=>{
                        //    if(this.page < this.totalPages){
                        //        console.log('onreached')
                        //        this._loadFilms()
                        //    }
                        // }}
                        renderItem={
                                    ({item}) =>
                                    <View styles={styles.image_container}>
                                        <Image
                                        style = {styles.image}
                                        source={item.is_album ? {uri:"https://i.imgur.com/"+ item.cover+".jpg"} :  {uri:item.link}}>
                                        </Image>
                                    </View>
                                    }
                        numColumns = {2}
                    />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    main_container:{
        flex:1,
        width: '100%',
        alignItems: "center"
        
    },
    image_container:{
        flex:1,
        width:'100%'
    },
    image:{
        width: 150,
        height: 180,
        margin: 5,
        backgroundColor: 'gray',
    }
})

