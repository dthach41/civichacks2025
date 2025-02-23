import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    img: { type: String },
    company: { type: String },
    job_title: { type: String },
    job_description: { type: String },
    skills: { type: [String] },
  },
  { _id: false } // To avoid creating an _id for the Job document
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    jobSeeking: { type: String, required: true },
    saved_jobs: { type: [JobSchema] },
    skills: { type: [String] },
  },
  { timestamps: true, collection: "users" }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema); // Create model here
export default User; // Export the model instead of the schema
