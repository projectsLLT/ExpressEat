import mongoDb from "../database/mongodbDatabase";
import {v4 as uuid} from 'uuid'
import mongoose, { now } from "mongoose";
import { type } from "os";
const { Schema } = mongoose;

const PedidoSchema = new Schema({
    _id:{
        type:String,
        default:()=>uuid()
    },
    descricao:{
        type:String,
        required: true,
    },
    
    preco:{
        type:Number,
        required: true,
    },

    statusEntrega:{
        type:String,
        enum: ['ongoing','delivered','preparing','canceled'],
        default: 'preparing',
        required: true,
    },

    statusPagamento:{
        type:String,
        enum: ['pending','confirmed'],
        default: 'pending',
        required: true,
    },
    data:{
       type: Date,
       default: Date.now 
    }
})

const Pedido=mongoDb.model('Pedido',PedidoSchema)

export default Pedido;
