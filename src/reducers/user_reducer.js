import {
    FETCH_USER_FAILED,
    FETCH_USER_SUCCESS,
    CHANGE_PROP,
    UPDATE_PROFIL_PHOTO,
    ADD_PHOTO
} from '../actions/types'

const INIT_STATE = {
    name:null,
    birth:null,
    editSexe:1,
    editBirth:1,
    photoURL:null,
    desc:null,
    sexe:null,
    localisation:{},
    relation:null,
    caracteres:[
        {id:"1",label:"Taille",value:null,icon:"ruler", type:'slider', values:{max:2.5,step:0.01,min:0.75, unit:'mêtres'}},
        {id:"2",label:"Poids",value:null,icon:"weight", type:'slider', values:{max:120,step:1,min:35, unit:'kilogrammes'}},
        {id:"3",label:"Peau",value:null,icon:"adjust", type:'select', values:[
            {label:'Noire',id:1,value:'Noire'},
            {label:'Claire',id:2,value:'Claire'},
            {label:'Blanche',id:3,value:'Blanche'},
            {label:'Métisse',id:4,value:'Métisse'} 
        ]},
        {id:"7",label:"Yeux",value:null,icon:"eye" , type:'select', values:[
            {label:'Noir',id:1,value:'Noir'},
            {label:'bleu',id:2,value:'bleu'},
            {label:'Marron',id:3,value:'Marron'},
            {label:'Noisette',id:4,value:'Noisette'} 
        ]},
        {id:"4",label:"Silouhette",value:null,icon:"male", type:'select',values:[
            {label:'Mince',id:1,value:'Mince'},
            {label:'Sportif',id:2,value:'Sportif'},
            {label:'petit(e))',id:3,value:'Petit(e)'},
            {label:'Rond(e)',id:4,value:'Rond(e)'} 
        ]},
        {id:"5",label:"Alchool",value:null,icon:"wine-glass", type:'select',values:[
            {label:'Je ne bois pas',id:1,value:'Je ne bois pas'},
            {label:'Je bois en soirée',id:2,value:'Je bois en soirée'},
            {label:'Je bois souvent',id:3,value:'Je bois souvent'},
            {label:'Je bois beaucoup',id:4,value:'Je bois beaucoup'} 
        ]},
        {id:"6",label:"Cigarette",value:null,icon:"smoking", type:'select',values:[
            {label:'Je ne fume pas',id:1,value:'Je ne fume pas'},
            {label:'Je fume en soirée',id:2,value:'Je fume en soirée'},
            {label:'Je fume souvent',id:3,value:'Je fume souvent'},
            {label:'Je fume beaucoup',id:4,value:'Je fume beaucoup'} 
        ]},
        {id:"7",label:"Sexualité",value:null,icon:"genderless", type:'select',values:[
            {label:'Hétéro',id:1,value:'Hétéro'},
            {label:'Bisexuelle',id:2,value:'Bisexuelle'},
            {label:'Gay',id:3,value:'Gay'},
            {label:'Lesbienne',id:4,value:'Lesbienne'} ,
            {label:'Asexuelle',id:4,value:'Asexuelle'} ,

        ]},
        {id:"8",label:"Réligion",value:null,icon:"peace", type:'select',values:[
            {label:'Je ne fume pas',id:1,value:'Je ne fume pas'},
            {label:'Je fume en soirée',id:2,value:'Je fume en soirée'},
            {label:'Je fume souvent',id:3,value:'Je fume souvent'},
            {label:'Je fume beaucoup',id:4,value:'Je fume beaucoup'} 
        ]},

    ],
    hobbies:[],
    photos:[]
};

export default (state=INIT_STATE,action)=>{
    switch (action.type) {
        case FETCH_USER_SUCCESS :
            return Object.assign(state,{
                ...action.payload
            });
        case CHANGE_PROP:
            return {...state,[action.payload.prop]:action.payload.value}
        case FETCH_USER_FAILED :
            return false;
        case UPDATE_PROFIL_PHOTO:
            return {...state,photoURL:action.payload};
        case ADD_PHOTO:
            return {...state,photos:[...state.photos,{uri:action.payload}]};
        default:
           return state;
    }

}