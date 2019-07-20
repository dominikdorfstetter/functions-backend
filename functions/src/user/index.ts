import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

/**
 * Side-Effects that happen when user creates an acount
 */
export const onUserCreate = functions.auth.user().onCreate((user, context) => {
    const userobj = {
        "email": user.email !== undefined ? `${user.email}` : 'invalid',
        "name": user.displayName !== null ? `${user.displayName}` : 'Neuer Nutzer',
        "createdAt": context.timestamp
    }

    const userRef = db.doc(`users/${user.uid}`);

    return userRef.set(userobj);
});

/**
 * Side-Effects that happen when user deletes his acount
 */
export const onUserDelete = functions.auth.user().onDelete(user => {
        const userRef = db.doc(`users/${user.uid}`);

        return userRef.delete();
});
