import * as fromUI from './ui.actions';

export interface State {
    isLoading: boolean;
}

const initState: State = {
    isLoading: true
};

export function uiReducer( state = initState, action: fromUI.actions ): State {

    switch (action.type) {

        case fromUI.ENABLE_LOADING:
            return {
                isLoading: true
            };
        case fromUI.DISABLE_LOADING:
            return {
                isLoading: false
            };

        default:
            return state;
    }


}
