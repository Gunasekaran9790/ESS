import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import UserInfo from "@/models/UserInfo";
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { name, phone, address, dob, gender, email } = body;

  if (!email || !name || !address || !dob || !gender || !phone) {
    return new Response(JSON.stringify({ message: "All fields required" }), {
      status: 400,
    });
  }

  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }
  // Check if info already exists
  const dobDate = new Date(dob);
  try {

    const exists = await UserInfo.findOne({ user_id: user._id });
    if (exists) {
      const updated = await UserInfo.findOneAndUpdate(
        { user_id: user._id },
        { name, address, dob: dobDate, gender, phone },
        { new: true }
      );

      const fullUserInfo = {
        ...updated.toObject(),
        email: user.email,
        role: user.role,
      };

      return new Response(JSON.stringify({ message: "User info updated", updatedUserInfo: fullUserInfo }), {
        status: 200,
      });
    }

    const newUserInfo = await UserInfo.create(
      { user_id: user._id, name, address, dob: dobDate, gender, phone }
    );

    return new Response(JSON.stringify({ message: "User info saved", newUserInfo }), {
      status: 201,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Validation failed", error: err.message, errors: err.errors, }), {
      status: 400,
    });
  }
}

// GET: Get user info by email
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const allemail = searchParams.get("allemail");

  await dbConnect();

  // If asking for all users
  if (allemail) {
    try {
      const allUsersResult = await User.find({});
      return new Response(JSON.stringify({ allUsers: allUsersResult }), {
        status: 200,
      });
    } catch (e) {
      console.error(e);
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
        status: 500,
      });
    }
  }

  if (!email) {
    return new Response(JSON.stringify({ message: "Email is required" }), {
      status: 400,
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  const userInfo = await UserInfo.findOne({ user_id: user._id });
  if (!userInfo) {
    return new Response(JSON.stringify({ message: "UserInfo not found" }), {
      status: 404,
    });
  }

  const result = {
    ...userInfo.toObject(),
    email: user.email,     // add from User
    role: user.role,       // add from User
  };

  return new Response(JSON.stringify({ userInfo: result }), {
    status: 200,
  });

}


export async function PATCH(req) {
  try {
    await dbConnect();
    const { id, isBlocked } = await req.json();
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: `User has been ${isBlocked ? 'blocked' : 'unblocked'}`,
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}


export async function DELETE(req) {
  await dbConnect();
  const { id } = await req.json();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: 'User deleted' });
}

