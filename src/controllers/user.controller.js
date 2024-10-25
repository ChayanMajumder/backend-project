import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async (req, res) => {
    const {username, email, fullName, password} = req.body;
    
    // if(username === "") {
    //     throw new ApiError(200, "Username is required");
    // }
    // if(email === "") {
    //     throw new ApiError(200, "email is required");
    // }
    // if(fullName === "") {
    //     throw new ApiError(200, "Full Name is required");
    // }
    // if(password === "") {
    //     throw new ApiError(200, "Password is required");
    // }


    if ([username, email, fullName, password].some((field) => field?.trim() === "")) {
        throw new ApiError(200, "All Fields are required");
    };

    const existedUser = User.findOne({
        $or: [{email}, {username}]
    });
    
    if(existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    };


    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    };

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    };


    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password
    });

    const createUser = await User.findById(user._id).select("-password -refreshToken");
    
    if(!createUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    };

    return res.status(201).json(
        new ApiResponse(200, createUser, "User registered Successfully")
    );
    
});

export {registerUser}