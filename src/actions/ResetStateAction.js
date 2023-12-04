import { createAction } from '@reduxjs/toolkit';

export const resetContacts = createAction('ContactSlice/reset');
export const resetConversation = createAction('ConversationSlice/reset');
export const resetConversationDetails = createAction('ConversationDetailsSlice/reset');
