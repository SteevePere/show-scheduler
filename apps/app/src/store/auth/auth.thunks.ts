import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInRequest } from "@scheduler/shared";

import { apiSignIn } from "../../api/auth.api";

export const signIn = createAsyncThunk('auth/signIn', async (data: SignInRequest) => {
    return await apiSignIn(data);
});
