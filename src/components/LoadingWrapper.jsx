import {MoonLoader} from 'react-spinners'
import { useSessionStore } from '../store/useSessionStore';

const LoadingWrapper = ({loading, size, children}) => {
    const {_hasHydrated} = useSessionStore();
    if(!_hasHydrated || loading)
      return <MoonLoader size = {size} color="#404040"/> ;
    return children;
}

export default LoadingWrapper