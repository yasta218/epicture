import React from 'react';
import {StyleSheet,Text,Button, View, FlatList,Image} from 'react-native';
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
            <>
                <View styles = {styles.head}>
                <Button
                    title="Learn More"
                    />
                </View>
                
                <FlatList style = {styles.main_container}
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
            </>
                
            
        )
    }
}

const styles = StyleSheet.create({
    head : {

    },
    main_container:{
        marginTop : 50,
        marginLeft : 35
    },
    image_container:{
        display: 'flex',
        flex:1,
        margin : 80,
        alignItems: 'center',
        justifyContent: 'center',
        
        
    },
    image:{
        width: 150,
        height: 150,
        margin: 5,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',

    }
})

const mapStateToProps = state => {
    return {
        pseudo: state.pseudo,
        access_token : state.access_token
    }
}
export default connect(mapStateToProps)(Favorites)