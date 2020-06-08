import firebase from "./firebaseDb";

export function deleteExpense(expenseDetails) {

  const { id, price, category, date } = expenseDetails;

  // Month format is Eg. May. To be used as Collection title
  const month = date.substr(0, 3);
  
  // Exact date format is Eg. May 11 2020. To be used as Date Document title
  const exactDate = date.substr(0, 11);

  let uid = firebase.auth().currentUser.uid;
  let collectionRef = firebase
    .firestore()
    .collection("Users")
    .doc(uid)
    .collection(month);

  // 1. Delete specific transaction
  collectionRef
    .doc(exactDate)
    .collection("All Expenses")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Delete successful!");
    })
    .catch((error) => {
      console.error(error);
    });

  // 2. Update monthly total in Info AND category expense in Info
  collectionRef
    .doc("Info")
    .update({
      monthlyTotal: firebase.firestore.FieldValue.increment(-price),
      [category]: firebase.firestore.FieldValue.increment(-price),
    })
    .then((docRef) => {
      console.log("Total expense updated!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

  // 3. Update daily total and daily transaction number
  collectionRef
    .doc(exactDate)
    .update({
      dailyTotal: firebase.firestore.FieldValue.increment(-price),
      dailyTransactions: firebase.firestore.FieldValue.increment(-1),
    })
    .then((docRef) => {
      console.log("Daily total updated!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

export function addExpense(expenseDetails) {
  const { name, price, category, description, date } = expenseDetails;

  // Month format is Eg. May. To be used as Collection title
  const month = date.substr(0, 3);

  // Exact date format is Eg. May 11 2020. To be used as Date Document title
  const exactDate = date.substr(0, 11);
  
  // Format is Eg. May 13 2020 00:00:00 GMT+0800 (+08). To be used for ordering
  const dateWithoutDay = date;

  let uid = firebase.auth().currentUser.uid;
  let collectionRef = firebase
    .firestore()
    .collection("Users")
    .doc(uid)
    .collection(month);

  // 1. Adds each daily transaction
  collectionRef
    .doc(exactDate)
    .collection("All Expenses")
    .add({
      name: name,
      price: price,
      category: category,
      description: description,
      date: dateWithoutDay,
    })
    .then((docRef) => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

  // 2. Update monthly total in Info AND category expense in Info
  collectionRef
    .doc("Info")
    .set(
      {
        monthlyTotal: firebase.firestore.FieldValue.increment(price),
        [category]: firebase.firestore.FieldValue.increment(price),
      },
      { merge: true }
    )
    .then((docRef) => {
      console.log("Total expense updated!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

  // 3. Update daily total and daily transaction number
  collectionRef
    .doc(exactDate)
    .set(
      {
        dailyTotal: firebase.firestore.FieldValue.increment(price),
        dailyTransactions: firebase.firestore.FieldValue.increment(1),
        date: exactDate,
      },
      { merge: true }
    )
    .then((docRef) => {
      console.log("Daily total updated!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};