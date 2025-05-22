
const admin = require("firebase-admin");
const path = require("path");
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
// console.log(serviceAccount);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const todosCollection = db.collection("Todo");

exports.getTodosFromDB = async () => {
  // console.log("here");
  const snapshot = await todosCollection.get();
  // console.log(snapshot);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

exports.addTodoToDB = async (todo) => {
  try {
    const docRef = await todosCollection.add(todo);
    // console.log(docRef.id);
    return docRef.id;
  }
  catch (err) {
    console.log(err);
  }
};

exports.deleteTodoFromDB = async (id) => {
  await todosCollection.doc(id).delete();
};
