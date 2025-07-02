import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import mongoose from 'mongoose';

export async function POST(req) {
  try {
    await dbConnect();

    const result = await mongoose.connection.db.collection('users').updateMany(
      { isBlocked: { $exists: false } },
      { $set: { isBlocked: false } }
    );

    return Response.json({
      message: 'Users updated successfully',
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error('Update error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

//, modifiedCount: result.modifiedCount