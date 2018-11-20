import { Action } from '@ngrx/store';

export const ENABLE_LOADING = '[UI Loading] Cargando...';
export const DISABLE_LOADING = '[UI LOADING] Fin de carga...';

export class EnableLoadignAction implements Action {
    readonly type = ENABLE_LOADING;
}

export class DisableLoadingAction implements Action {
    readonly type = DISABLE_LOADING;
}



export type actions = EnableLoadignAction | DisableLoadingAction;
