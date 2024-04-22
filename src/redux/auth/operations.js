import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const setToken = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
}
export const clearToken = () => {
    axios.defaults.headers.common.Authorization = ``
}


export const registerThunk = createAsyncThunk("auth/register", async (credentials, thunkApi) => {
    try {
        const { data } = await axios.post("users/signup", credentials)
        setToken(data.token)
        return data
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})

export const loginThunk = createAsyncThunk("auth/login", async (credentials, thunkApi) => {
    try {
        const { data } = await axios.post("users/login", credentials)
        setToken(data.token)
        return data
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})

export const logoutThunk = createAsyncThunk("auth/logout", async (_, thunkApi) => {
    try {
        await axios.post("users/logout")
        clearToken()
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})

export const refreshThunk = createAsyncThunk('auth/refresh', async (_, thunkApi) => {
	const savedToken = thunkApi.getState().auth.token
	if (!savedToken) {
		return thunkApi.rejectWithValue('Unable to fetch user')
	}
	setToken(savedToken)
	try {
		const { data } = await axios.get('users/current')
		return data
	} catch (error) {
		return thunkApi.rejectWithValue(error.message)
	}
})