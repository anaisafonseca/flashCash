import loaderHand from '../../assets/loaderHand.png';
import loaderCoin from '../../assets/loaderCoin.png';
import { Container, Rotate } from './styles';

export function Loader() {
    return (
        <Container>
            <Rotate>
                <img src={loaderCoin} alt=""/>
            </Rotate>
             <img src={loaderHand} alt=""/>
        </Container>
    )
}