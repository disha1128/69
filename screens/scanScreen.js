import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class ScanScreen extends React.Component {
    constructor(){
        super()
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }

    getCameraPermissions=async()=>{
const{status}=await Permissions.askAsync(Permissions.CAMERA)
this.setState({hasCameraPermissions:status==='granted'})
    }

    handleBarcodeScanner=async({data})=>{
      this.setState({
scanned:true,
scannedData:data,
buttonState:'normal'
      })
    }
    render(){
if(this.state.buttonState!=="normal"&&this.state.hasCameraPermissions){
  return(
    <BarCodeScanner onBarCodeScanned={this.state.scanned?undefined:this.handleBarcodeScanner}/>
)
}
else if(this.state.buttonState==='normal'){


  return(
    <View style={styles.container}>
        
       

        <TouchableOpacity style={styles.scanButton} onPress={()=>{this.getCameraPermissions()}}>
            <Text style={styles.buttonText}>scan QR code</Text>
        </TouchableOpacity>
    </View>
  )

}
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayText:{
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  scanButton:{
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10
  },
  buttonText:{
    fontSize: 20,
  }
});