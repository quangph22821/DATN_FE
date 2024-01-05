import { createAsyncThunk, createSlice, isAsyncThunkAction } from "@reduxjs/toolkit";
import { Comment } from "../models/comment";
import { getAdd, getAlll, getdelete } from "../api/comments";
import { getAll } from "../api/products";

const initalState={
    Comment:[],
    isLoading:false,

} as {Comment: Comment[]; isLoading: boolean}

//
 export const FetchCommentCreate= createAsyncThunk("comment/FetchCommentCreate",
 async(body:any)=>{
    try{
        const {data}= await getAdd(body)
        // console.log(data.commentAdd);
        
       return data.commentAdd
        
    }catch(err){}
 }
 )
//
 export const CommentAll = createAsyncThunk("comment/FetchCommentAll",
 async()=>{
    try{
        const {data}= await getAlll()
        // console.log(data.comments);
        return data.comments
        
    }catch(err){}
 }
 )
 //
 export const CommentDelete=createAsyncThunk("comment/FetchComentDelete",
    async(id:any)=>{
        
        
        try{
            const data= await getdelete(id)
            return data
        }catch{

        }
    
 })
 const Comments= createSlice({
    name: "comment",
    initialState:initalState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(FetchCommentCreate.fulfilled,(state)=>{
            state.isLoading= true
        })
    }
 })
 export const CommentReducer= Comments.reducer