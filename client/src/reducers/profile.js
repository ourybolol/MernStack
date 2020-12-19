import { 
    GET_PROFILE, 
    GET_PROFILES,
    PROFILE_ERROR, 
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_REPOS
 } from "../actions/types";

const initialSate = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function( state = initialSate, action) {
    const { type, payload } = action;
    switch(action.type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false            
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_PROFILE:
             return {
                ...state,
                profile: null,
                repos: [],
                loading: false
                };
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            };
        default:
        
            return state;
    }
}