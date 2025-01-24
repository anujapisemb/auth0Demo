import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {ReduxStateType} from 'redux/store';

const useTypedSelector: TypedUseSelectorHook<ReduxStateType> = useSelector;

export default useTypedSelector;
