import * as React from 'react';
import { Text, View, StyleSheet,SafeAreaView,FlatList,StatusBar,TouchableHighlight,TextInput,Button,Alert } from 'react-native';
import Constants from 'expo-constants';
import produce from "immer"

// You can import from local files
import AssetExample from './components/AssetExample';
import {getRandomBytes} from 'expo-random';
const Item = ({item,editTodo,deleteTodo}) => (
  <View>
{

  item.editable?<View
style={{...styles.item,marginVertical:4,marginHorizontal:16,borderRadius:10,borderRightWidth:2}}
><TextInput placeholder="Enter todo" style={styles.textInput} value={item.text} onChangeText={(text)=>editTodo(item.itemKey,'text',text)} onBlur={()=>editTodo(item.itemKey,'editable',!item.editable)} autoFocus={true}/>
</View>
:
      <View style={styles.container}>
      <TouchableHighlight style={styles.item} onPress={()=>{!item.done && editTodo(item.itemKey,'editable',!item.editable)}} activeOpacity={0.8} underlayColor={"#EEEEEE"}>
    <Text style={{...styles.title,color:item.done?"#999":"", textDecorationLine: item.done?'line-through':undefined, textDecorationStyle: item.done?'solid':undefined}}>{item.text}</Text>

        </TouchableHighlight>
        
            <TouchableHighlight style={styles.doneButton}
            activeOpacity={0.8}
            underlayColor={item.done?"#ffbaba":"#e5f7eb"}
        onPress={()=>{item.done?deleteTodo(item.itemKey):editTodo(item.itemKey,"done",true)}}
    >
    <Text style={{fontSize:16,
    color:item.done?"#ff5252":"#50c878"
    }}>{item.done?"Delete":"Done"}</Text>
    </TouchableHighlight>

        </View>
    }
  </View>
);
export default function App() {
  
  const [todos,setTodos]=React.useState([{text:"Test 1",editable:false,itemKey:getRandomBytes(6),done:false,},{text:"Test 2",editable:false,itemKey:getRandomBytes(6),done:false,},{text:"Test 3",editable:false,itemKey:getRandomBytes(6),done:false,}])
  
  const updateTodosArray = (index,key,value)=>(produce(todos, (draft,elementsIndex) => {
    console.log(index)
    draft[index][key] =value
    }))
    const deleteTodosArray = (index)=>(produce(todos, (draft) => {
        draft.splice(index, 1) 
        console.log(draft)
    }))

  const editTodo=(itemKey,key,value)=>{
    const elementsIndex = todos.findIndex(element => element.itemKey == itemKey )
    const updatedArray=updateTodosArray(elementsIndex,key,value)
    setTodos(updatedArray)

  }
  const deleteTodo=(itemKey)=>{
   const elementsIndex = todos.findIndex(element => element.itemKey == itemKey )
      const updatedArray=deleteTodosArray(elementsIndex)
      setTodos(updatedArray)
  }
    const addTodos=()=>{
    const updatedArray=produce(todos,(draft)=>{
        draft.push({itemKey:getRandomBytes(6), done: false, text:"",editable:"true"})

  })
  setTodos(updatedArray)
  }


  const renderItem = ({ item }) => (
    <Item item={item} editTodo={editTodo} deleteTodo={deleteTodo}/>
  );

  return (
    <SafeAreaView style={styles.outerContainer}>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
      <View style={{marginVertical: 16,
     marginHorizontal: 16,}}><Button   onPress={()=>{addTodos()}}
  title="Add Todo"
  />
  </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    activeOpacity:0.4,
    // underlayColor:"CCC",
    borderColor: '#EEEEEE',
    borderWidth:2,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    borderRightWidth:1,
    padding: 16,
    // marginVertical: 4,
    // marginHorizontal: 16,
    flex:8,
  },
  doneButton:{
    activeOpacity:0.4,
     borderColor: '#EEEEEE',
    borderWidth:2,
    flex:2,
    textAlign:'center',
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    borderLeftWidth:1,
    alignItems:'center',
    justifyContent:'center'

  },
  container:{
    marginHorizontal:16,
    marginVertical:4,
    flexDirection:'row'
  },
  title: {
    fontSize: 16,
  },
  textInput:{
      backgroundColor: '#ffffff',
      fontSize:16,
      textAlignVertical:'top',
      // padding:8,
      height:21,
  }
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });
