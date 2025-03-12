// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Save Profile Data (including image)
// export const saveProfileToBackend = createAsyncThunk(
//   "profile/saveProfileToBackend",
//   async (profileData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/profile",
//         profileData
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Fetch Profile Data (including image)
// export const fetchProfile = createAsyncThunk(
//   "profile/fetchProfile",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("http://localhost:5000/profile");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Upload Profile Image
// // export const uploadProfileImage = createAsyncThunk(
// //   "profile/uploadProfileImage",
// //   async (imageFile, { rejectWithValue }) => {
// //     try {
// //       const formData = new FormData();
// //       formData.append("profileImage", imageFile);

// //       const response = await axios.post(
// //         "http://localhost:5000/profile",
// //         formData,
// //         {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //           },
// //         }
// //       );
// //       return response.data.imageUrl;
// //     } catch (error) {
// //       return rejectWithValue(error.response.data);
// //     }
// //   }
// // );

// export const uploadProfileImage = createAsyncThunk(
//   "profile/uploadProfileImage",
//   async (imageFile, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("http://localhost:5000/profile", {
//         profileImage: imageFile,
//       });
//       return response.data.profileImage;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const initialState = {
//   profileImage: "User2",
//   lastUpdated: "",
//   personalInfo: {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     username: "",
//     role: "",
//   },
//   editing: {
//     personalInfo: false,
//   },
//   loading: false,
//   error: null,
// };

// const profileSlice = createSlice({
//   name: "profile",
//   initialState,
//   reducers: {
//     updateProfileImage(state, action) {
//       state.profileImage = action.payload;
//     },
//     updatePersonalInfo(state, action) {
//       state.personalInfo = {
//         ...state.personalInfo,
//         ...action.payload,
//       };
//     },
//     setEditing(state, action) {
//       const { section, isEditing } = action.payload;
//       state.editing[section] = isEditing;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Save Profile
//       .addCase(saveProfileToBackend.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(saveProfileToBackend.fulfilled, (state, action) => {
//         state.loading = false;
//         state.personalInfo = action.payload.personalInfo;
//         state.lastUpdated = new Date().toLocaleString();
//       })
//       .addCase(saveProfileToBackend.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Fetch Profile
//       .addCase(fetchProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.personalInfo = action.payload.personalInfo;
//         state.profileImage = action.payload.profileImage || "User2";
//         state.lastUpdated = action.payload.lastUpdated;
//       })
//       .addCase(fetchProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Upload Profile Image
//       .addCase(uploadProfileImage.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(uploadProfileImage.fulfilled, (state, action) => {
//         state.loading = false;
//         state.profileImage = action.payload;
//       })
//       .addCase(uploadProfileImage.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { updateProfileImage, updatePersonalInfo, setEditing } =
//   profileSlice.actions;

// export default profileSlice.reducer;


// WITH FIREBASE
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "@/config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Fetch Profile Data from Firestore
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Create a new document with default values
        await setDoc(userDocRef, {
          firstName: "",
          lastName: "",
          email: user.email || "",
          phoneNumber: "",
          role: "",
          profileImage: "User2",
          lastUpdated: new Date().toLocaleString(),
        });
        return {
          firstName: "",
          lastName: "",
          email: user.email || "",
          phoneNumber: "",
          role: "",
          profileImage: "User2",
          lastUpdated: new Date().toLocaleString(),
        };
      }

      return userDoc.data();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Save Profile Data to Firestore
export const saveProfileToBackend = createAsyncThunk(
  "profile/saveProfileToBackend",
  async (profileData, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      // Save profile data to Firestore
      await setDoc(doc(db, "users", user.uid), profileData, { merge: true });
      return profileData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Upload Profile Image to Firebase Storage
export const uploadProfileImage = createAsyncThunk(
  "profile/uploadProfileImage",
  async (imageFile, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      // Upload image to Firebase Storage
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      await uploadBytes(storageRef, imageFile);

      // Get the download URL
      const imageUrl = await getDownloadURL(storageRef);

      // Update Firestore with the new image URL
      await updateDoc(doc(db, "users", user.uid), {
        profileImage: imageUrl,
      });

      return imageUrl;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  profileImage: "User2",
  lastUpdated: "",
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    role: "",
  },
  editing: {
    personalInfo: false,
  },
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfileImage(state, action) {
      state.profileImage = action.payload;
    },
    updatePersonalInfo(state, action) {
      state.personalInfo = {
        ...state.personalInfo,
        ...action.payload,
      };
    },
    setEditing(state, action) {
      const { section, isEditing } = action.payload;
      state.editing[section] = isEditing;
    },
  },
  extraReducers: (builder) => {
    builder
      // Save Profile
      .addCase(saveProfileToBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProfileToBackend.fulfilled, (state, action) => {
        state.loading = false;
        state.personalInfo = action.payload.personalInfo;
        state.lastUpdated = new Date().toLocaleString();
      })
      .addCase(saveProfileToBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.personalInfo = action.payload.personalInfo;
        state.profileImage = action.payload.profileImage || "User2";
        state.lastUpdated = action.payload.lastUpdated;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Upload Profile Image
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.profileImage = action.payload;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateProfileImage, updatePersonalInfo, setEditing } =
  profileSlice.actions;

export default profileSlice.reducer;
