# Next Firebase Template

> Template to use in future projects

## Firebase

- [x] Using local emulator
- [x] Set up Firebase Admin
- [x] SSR auth

Install the latest version of Firebase tools. Once that's done, start the emulator by running

```shell
firebase emulators:start
```

If you haven't installed the Firebase CLI, [check out how to](https://firebase.google.com/docs/cli#install-cli-mac-linux). Note that you may have to install all the emulators on your first run, so do this at home.

#### Environment variables

I have registered a web app under the nickname `hg2022-3afc2f` and copied the connection config:

```env
# .env
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_MEASUREMENT_ID

# For Firebase admin initialization
FIREBASE_AUTH_EMULATOR_HOST
FIRESTORE_EMULATOR_HOST

FIREBASE_DATABASE_URL
FIREBASE_PRIVATE_KEY
FIREBASE_CLIENT_EMAIL
```

The private key (`FIREBASE_PRIVATE_KEY`) and client email (`FIREBASE_CLIENT_EMAIL`) can be found on the [service accounts settings page](https://console.firebase.google.com/project/hg2022-3afc2f/settings/serviceaccounts/adminsdk) on Firebase.

`FIREBASE_AUTH_EMULATOR_HOST` should be `localhost:9099` on development. `FIRESTORE_EMULATOR_HOST` should be `localhost:8080`. Ensure that properly set, otherwise `firestoreAdminFirestore` will edit data on the production Firestore database and make you think everything is failing silently!

`NEXT_PUBLIC_XX` Keys can be found from https://firebase.google.com/docs/web/setup

See `.env.example`.

## Features and examples

### Auth middleware

The `/` and `/profile` page require auth, so see their `getServerSideProps`.

The `/login` page with SSR redirect you to `/` if you're already logged in.

All if this is done with the `withAuth()` middleware. This also adds the Firebase user to `req.user`. Note that this is the user, not the user's document in the database. See the `/auth/login-action` API endpoint to see how to use the user's UID to get their document.

### Yup validate middleware

See the profile updating `POST` API. Note that all middleware are prefixed with `with`.

### Smart links, buttons, and back button

The smart link component will either be a Next link or `<a href>` link depending on the URL. It also has an `underline` prop, which if true, will apply the `underline` tailwind class.

### Profile and editing

There's an edit profile form. We often build these in all the apps.

### Schemas

See the `schemas/` folder for this.

### Utils

`fix-firebase-date` converts Firebase timestamps to datetimes (only first level in object). Serialization and deserialization between client-sever is handled by SuperJSON.
