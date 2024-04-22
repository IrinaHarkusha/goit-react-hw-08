import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/'

const msgOptions = {
    icon: '👏',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }

export const fetchContactsThunk = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
	try {
		const { data } = await axios.get('contacts')
		return data
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message)
	}
})

export const addContactThunk = createAsyncThunk('contacts/addContact', async (contact, thunkAPI) => {
	try {
		const { data } = await axios.post('contacts', contact)
		toast('You have succesfully added new contact', msgOptions);
		return data
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message)
	}
})

export const deleteContactThunk = createAsyncThunk('contacts/deleteContact', async (id, thunkAPI) => {
	try {
		const { data } = await axios.delete(`contacts/${id}`, id)
		toast('You have succesfully deleted contact', msgOptions);
		return data.id
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message)
	}
})