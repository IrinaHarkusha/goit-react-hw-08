
import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { addContactThunk, deleteContactThunk, fetchContactsThunk } from './operations'
import { logoutThunk } from '../auth/operations'

const initialState = {
	contacts: [],
	isLoading: false,
	isError: false,
}

const sliceContacts = createSlice({
	name: 'contacts',
	initialState,
	selectors: {
		selectContacts: state => state.contacts,
		selectIsError: state => state.isError,
		selectIsLoading: state => state.isLoading,
	},
	
	extraReducers: builder => {
		builder
			.addCase(logoutThunk.pending, state => {
				state.contacts = []
			})
			.addCase(fetchContactsThunk.fulfilled, (state, { payload }) => {
				state.contacts = payload
			})
			.addCase(addContactThunk.fulfilled, (state, { payload }) => {
				state.contacts.push(payload)
			})
			.addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
				state.contacts = state.contacts.filter(item => item.id !== payload)
			})
			.addMatcher(
				isAnyOf(fetchContactsThunk.fulfilled, addContactThunk.fulfilled, deleteContactThunk.fulfilled),
				state => {
					state.isLoading = false
				})
			.addMatcher(
				isAnyOf(fetchContactsThunk.pending, addContactThunk.pending, deleteContactThunk.pending),
				state => {
					state.isLoading = true
					state.isError = false
				}
			)
			.addMatcher(isAnyOf(fetchContactsThunk.rejected, addContactThunk.rejected, deleteContactThunk.rejected), (state, { payload }) => {
				state.isError = payload
				state.isLoading = false
				})
	},

})

export const contactsReducer = sliceContacts.reducer

export const { selectContacts, selectIsLoading, selectIsError } = sliceContacts.selectors