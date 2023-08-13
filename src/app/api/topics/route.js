import connectMongoDB from "@/db/db";
import { NextResponse } from "next/server";
import Topic from "@/models/topic";

// connect();


export async function POST(req){
  const {title,description} = await req.json();
  await connectMongoDB();
  await Topic.create({title,description});
  return NextResponse.json({message:"Topic created"},{status:201})
}

export async function GET(){
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({topics})
}

export async function DELETE(req){
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({message:"Topic Deleted"},{status:200})
}
