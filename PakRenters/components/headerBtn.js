import {React} from 'react'
import {TouchableOpacity ,Image} from 'react-native'
import { Color } from '../constants/GlobalStyles';

const HeaderBtn = ({ iconURL, dimension, handlePress })=>{
    return(
        <TouchableOpacity>
            <Image
                source={iconURL}
                resizeMode="cover"
                style={styles.btnImage(dimension)}
            />
        </TouchableOpacity>
    );
}

const styles = {
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: Color.white,
    justifyContent: "center",
    alignItems: "center"
  },
  btnImage: dimension => ({
    width: dimension,
    height: dimension
  })
};

export default HeaderBtn;
