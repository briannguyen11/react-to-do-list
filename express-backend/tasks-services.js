import mongoose from "mongoose";
import userModel from "./tasks.js";

// uncomment the following line to view mongoose debug messages
mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

// async function getUsers(name, job) {
//   let result;
//   if (name === undefined && job === undefined) {
//     result = await userModel.find();
//   } else if (name && job) {
//     result = await findUserByNameAndJob(name, job);
//   } else if (name && !job) {
//     result = await findUserByName(name);
//   } else if (job && !name) {
//     result = await findUserByJob(job);
//   }
//   return result;
// }

// async function findUserById(id) {
//   try {
//     return await userModel.findById(id);
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   }
// }

// async function deleteUserById(id) {
//   try {
//     return await userModel.findByIdAndDelete(id);
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   }
// }

// async function addUser(user) {
//   try {
//     const userToAdd = new userModel(user);
//     const savedUser = await userToAdd.save();
//     return savedUser;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }

// async function findUserByName(name) {
//   return await userModel.find({ name: name });
// }

// async function findUserByJob(job) {
//   return await userModel.find({ job: job });
// }

// async function findUserByNameAndJob(name, job) {
//   return await userModel.find({
//     $and: [{ name: name }, { job: job }],
//   });
// }

// export default {
//   addUser,
//   getUsers,
//   findUserById,
//   findUserByName,
//   findUserByJob,
//   findUserByNameAndJob,
//   deleteUserById,
// };
