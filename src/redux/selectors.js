import { createSelector } from '@reduxjs/toolkit'
import { selectContacts } from './contacts/slice'
import { selectFilter } from './filters/slice'


export const selectFilteredContacts = createSelector([selectContacts, selectFilter], (contacts, searchStr) => { 
		return contacts.filter(
			item =>
				item.name.toLowerCase().includes(searchStr.toLowerCase())
		)
	})