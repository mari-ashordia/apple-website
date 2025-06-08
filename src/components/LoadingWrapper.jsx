import {MoonLoader} from 'react-spinners'

const LoadingWrapper = ({loading, size, children, ...props}) => {
    
  return loading ? <MoonLoader size = {size} color="#404040"/> : children;
}

export default LoadingWrapper