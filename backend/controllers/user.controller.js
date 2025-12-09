import { User } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto"
import { Meeting } from "../models/meeting.model.js";

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Please provide all details" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not Found" });
    }
      const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }
      let token = crypto.randomBytes(20).toString("hex");
    user.token = token;
    await user.save();

    return res.status(httpStatus.OK).json({ token: token });
  } catch (error) {
    return res.status(500).json({ message: `Something went wrong ${error}` });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(httpStatus.CREATED).json({ message: "User registered" });
  } catch (error) {
    res.json({ message: `Something went wrong ${error}` });
  }
};

// const getUserHistory=async(req,res)=>{
//   const {token}=req.query;

//   try {
//     const user=await User.findOne({token:token});
//     const meetings=await Meeting.find({user_id:user.username})
//     res.json(meetings);
//   } catch (error) {
//     res.json({message:`Something went wrong ${error}`})
//   }
// }

const getUserHistory = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.json([]);   
    }

    const meetings = await Meeting.find({ user_id: user.username });
    res.json(meetings);

  } catch (error) {
    console.error("History error:", error);
    res.json([]);
  }
};

const addToHistory=async(req,res)=>{
  const {token,meeting_code}=req.body;
  try {
    const user=await User.findOne({token:token});
    const newMeeting=new Meeting({
      user_id:user.username,
      meetingCode:meeting_code
    })

    await newMeeting.save();
    res.status(httpStatus.CREATED).json({message:"Added code to History Successfully!"})
  } catch (error) {
    res.json({message:`Something went wrong ${error}`})
  }
}

export {login,register,getUserHistory,addToHistory};