import { connect } from "./connect";

export async function bot(io:any){

    const socket = await connect(io)
}