import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account',
});

export async function login() {
    return signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            return user;
        })
        .catch(console.error);
}

export async function logout() {
    return signOut(auth)
        .then(() => null)
        .catch(console.error);
}

export function onUserStateChange(callback: any) {
    onAuthStateChanged(auth, async (user) => {
        const updatedUser = user ? await adminUser(user) : null;
        callback(updatedUser);
    });
}

async function adminUser(user: any) {
    return get(ref(database, 'admins')).then((snapshot) => {
        if (snapshot.exists()) {
            const admins = snapshot.val();
            const isAdmin = admins.includes(user.uid);
            return { ...user, isAdmin };
        }
        return user;
    });
}

type NewProduct = {
    title: string;
    price: string;
    category: string;
    description: string;
    options: string;
};
export async function addNewProduct(product: NewProduct, image: string) {
    const id = uuid();
    return set(ref(database, `products/${id}`), {
        ...product,
        id,
        price: parseInt(product.price),
        image,
        options: product.options.split(','),
    });
}
