import firebase from 'firebase';

const main_url = (window.location.href.indexOf('localhost') > -1)
    ? "http://localhost:3000"
    : process.env.APP_URL;

export const tableDataParser = data => {
    let array = [];
    array = Object.entries(data).map(item => {
        item[1].id = item[0];
        return item[1];
    })
    return array;
}

export const logOut = () => {
    firebase.auth().signOut()
        .then(result => {
            localStorage.removeItem('user');
            window.location.href = main_url;
        })
        .catch(error => {
            console.log(error);
        });
}