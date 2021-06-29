import React from 'react';
import DateTime from 'luxon/src/datetime.js';
import {StyleSheet,Text,TextInput, View, FlatList,Image,Button,Pressable} from 'react-native';
import ImageCard from './ImageCard';
import { connect } from 'react-redux';
import {getImage} from '../API/IMGURAPI'

  class MyImage extends React.Component{
    constructor(props){
        super(props);
        this.accessToken =this.props.route.params.accessToken
        this.filter = false;
        this.wordSearch = null;
        this.filterDate = 0;
        this.filterText = false;
        this.lastAction = null;
        this._searchImage = this._searchImage.bind(this)
        this._searchBar = this._searchBar.bind(this)
        this.state = {
            image: [],
            searchBar : false
        }
    }
    // componentDidMount(){
    //     this._searchImage(this.accessToken)
    // }
   
    _toggleFavorite(){
        // const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        // this.props.dispatch(action)
    }
    _searchTextInputChanged= (text)=>{
        this.wordSearch = text
    }

    _searchImage = async(accessToken,search,action)=>{
        if(this.filterDate == 0 && this.wordSearch == null){
            let liste =await getImage(accessToken)
            this.filterDate = 0;
            this.filterText = false;
            this.setState({
                image: liste,
                searchBar : false,
            })
        }else if(search != null && action ==="word" ){ 
            let image;
           if(this.filterText){
                image =await getImage(accessToken)
           }else{
                image = this.state.image
           }
           console.log("image : ", image)
            let imageFilter = image.filter((obj)=>{
                if(obj.name == null){
                    return false
                }else{
                    return obj.name.indexOf(search) >-1
                }
                
            })
            this.filterText = true;
            this.setState({
                image : imageFilter,
                searchBar : false
            })
        }else if( this.filterDate == 1  ){
            this.filterDate = 1;
            let sortImage = this.state.image.sort((a,b) =>  b.datetime -a.datetime) 
            this.setState({
                image:sortImage
            })
            
        }else if( this.filterDate == 2 ){
            console.log("heeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrrrrrrrrreeeeeeee")
            this.filterDate = 2;
            let sortImage = this.state.image.sort((a,b) =>  a.datetime -b.datetime) 
            this.setState({
                image:sortImage
            })
        }
        
        
    }
        _searchBar(){
        if(this.state.searchBar){
            return(
                <View>
                <TextInput
                        // style={styles.input}
                        onChangeText={(text) => this._searchTextInputChanged(text)}
                        placeholder="enter your research"
                        />
                <Button
                    title= "research"
                    onPress={() => {
                        console.log('wordSearch before search image : ', this.wordSearch)
                        this._searchImage(this.accessToken,this.wordSearch,"word")
                        }
                    } 
                    >
                </Button>
            </View>
                )
        }
    }
    componentDidMount(){
        console.log('First this called');
        console.log("this.props.listFavorite",this.props.listFavorite)
        this.props.listFavorite.forEach(element => {
            console.log('element from ')
            console.log(element.id)
        });
        this._searchImage(this.accessToken,this.wordSearch);
      }
      componentDidUpdate(){
        console.log("mise à jour")
      }
    render(){
        // let colorButton1 = this
        let touchImage = this.state.timesPressed
        if(touchImage == 1){

        }
        return (
            <>
            <View style = {styles.head}>
                <Button
                    title="All"
                    onPress={()=>{
                        this.wordSearch = null;
                        this.filterDate = 0;
                        this._searchImage(this.accessToken,this.wordSearch);
                    }
                }
                />
                <Button
                    title="Plus récent"
                    onPress = {() =>{
                        this.filterDate = 1;
                        this._searchImage(this.accessToken,this.wordSearch)
                    }}
                />
                <Button
                    title="Plus Ancien"
                    onPress ={() =>{
                        this.filterDate = 2;
                        this._searchImage(this.accessToken,this.wordSearch)
                        }}
                />
                <Button
                    title="texte"
                    onPress = {() =>{
                        this.setState({
                            searchBar : !this.state.searchBar
                        })
                    }
                }
                />
                </View>
                {this._searchBar()}
            <FlatList
                        style = {styles.body}
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
                                    <ImageCard
                                        myImage = {item}
                                        isImageFavorite = {this.props.listFavorite.findIndex(image=>image.id ===item.id) !== -1 ? true : false}
                                    >
                                    </ImageCard>
                                    }
                        numColumns = {2}
                    />
            </>
                
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

export default connect(mapStateToProps)(MyImage)