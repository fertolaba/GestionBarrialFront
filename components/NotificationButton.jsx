import { useNavigation } from "@react-navigation/native";
import { StyledButton } from "./ui";
import Icon from 'react-native-vector-icons/FontAwesome';


export const NotificationButton = (props) => {
    const navigation = useNavigation();

    return (
        <StyledButton
            naked
            onPress={() => navigation.navigate('Notificacion')}
            {...props}
        >
            <Icon name="bell" size={30} color="black" />
        </StyledButton>
    );
}