import mongoDb from "../database/mongodbDatabase";
import { Schema } from "mongoose";
import { v4 as uuid } from "uuid";

const AvaliacaoSchema=new Schema({
    _id:{
        type:String,
        default:()=> uuid()
    },
    idUser:{
        type:Schema.Types.ObjectId, ref:'User',
        required:true
    },
    idRestaurante:{
        type:Schema.Types.ObjectId, ref:'Restaurante',
        required:true
    },
    nota:{
        type:Number,
        min:0,
        max:5
    }
})

const Avaliacao=mongoDb.model('Avaliacao',AvaliacaoSchema);

export default Avaliacao;