import React from 'react';
import {StyleSheet,Text, View, FlatList,Image} from 'react-native';
import {getFavoriteImage} from '../API/IMGURAPI';
import { connect } from 'react-redux';
 class Favorites extends React.Component{
    constructor(props){
        super(props);
        this._searchImage = this._searchImage.bind(this)
        this.state = {
            image: []
        }
    }

    _searchImage = async(accessToken,pseudo)=>{
        let liste =await getFavoriteImage(accessToken,pseudo)
        this.setState({
            image: [...this.state.image,...liste]
        })
    }
    componentDidMount(){
        this._searchImage(this.props.access_token,this.props.pseudo)
      }

    render(){
        return(
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
                                        source={{uri:"https://i.imgur.com/"+ item.cover+".jpg"}}>
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

const mapStateToProps = state => {
    return {
        pseudo: state.pseudo,
        access_token : state.access_token
    }
}
export default connect(mapStateToProps)(Favorites)