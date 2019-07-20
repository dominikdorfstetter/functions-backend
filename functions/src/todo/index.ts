import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/**
 * INTERFACE TODO
 */
interface Todo {
    title?: string;
    text?: string;
    done?: boolean;
    startTime?: number;
    endTime?: number;
    user?: any;
    created_at?: Date;
    updated_at?: Date;
}

/**
 * REST ENDPOINT
 */
export const crud_todo = functions.https.onRequest((req, res) => {
    let ret = {} as any;

    switch (req.method) {
        case ('GET'):
            ret = res.status(200).json(
                {
                    "message": "SENT GET"
                }
            );
            break;
        case ('PUT'):
            ret = res.status(200).json(
                {
                    "message": "SENT PUT"
                }
            );
            break;
        case ('DELTE'):
            ret = res.status(200).json(
                {
                    "message": "SENT DELETE"
                }
            );

            break;
        case ('POST'):
            // check if there is a request body & if todo argument is set
            if (!req.body && !req.body.todo) {
                ret = res.status(500).send('not allowed');
            } else {
                // if passes check creates Todo on firestore
                createTodo((req.body.todo)).then((ref: FirebaseFirestore.DocumentReference) => {
                    console.info(`[TODO] Created ${ref.path}`)
                    ret = res.status(200).json(
                        {
                            "message": `[TODO] Created ${ref.path}`
                        }
                    );
                }).catch(err => {
                    res.status(403).send(`[TODO] Error on creation. ${err}`);
                });
                
            }
            break;
        default: ret = res.status(403).send('not allowed');
    }
    return ret;
});

const createTodo = async ({ title, text, user }: Todo) => {
    const newTodo = {
        title,
        text,
        startTime: 0,
        endTime: 0,
        done: false,
        user: admin.firestore().doc(`users/${user}`),
        created_at: new Date(),
    } as Todo;

    let createTodo$;

    try {
        // first create Todo on /todos
        createTodo$ = await admin.firestore()
            .collection('todos')
            .add(newTodo);
        
        // then add the item to the user profile
        await admin.firestore()
            .doc(`users/${user}/todos/${createTodo$.id}`)
            .set(newTodo);

        return Promise.resolve(createTodo$)
    } catch(err) {
        return Promise.reject(err);
    }
}