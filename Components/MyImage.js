import React from 'react';
import {StyleSheet,Text, View, FlatList,Image} from 'react-native';
import {getImage} from '../API/IMGURAPI'

export default class MyImage extends React.Component{
    constructor(props){
        super(props);
        this.accessToken =this.props.route.params.accessToken
        this._searchImage = this._searchImage.bind(this)
        this.state = {
            image: []
        }
    }
    // componentDidMount(){
    //     this._searchImage(this.accessToken)
    // }
    _searchImage = async(accessToken)=>{
        console.log(this.props)
        let liste =await getImage(accessToken)
        console.log("my liste Myimage",liste)
        this.setState({
            image: [...this.state.image,...liste]
        })
    }
    componentDidMount(){
        console.log('First this called');
        this._searchImage(this.accessToken)
      }

    render(){
        console.log(" this.state.image :",this.state.image)
        return (
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
                                        source={{uri: item.link}}>
                                        </Image>
                                    </View>
                                    }
                        numColumns = {2}
                    />
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