<div align="center">
  <img src="logo.svg" width="250" />
</div>

<h1 align="center">
 NLW Setup, Habit Tracker
</h1>

This Habit Tracker application is a tool to help users keep track of their daily habits. It uses React as its UI library, and TypeScript for data typing. Authentication is done with Auth0 and requests to the server are managed with Axios. The design is styled with Radix UI and TailwindCSS. Application state is managed with Recoil.

On the backend, the application is developed with Node.js and TypeScript, and uses the Fastify framework to handle routes and middleware. The database is managed with Prisma and authentication is done with Json Web Tokens along with Auth0 on the client side. Data validations are done with Zod. The application also supports push notifications through the Web Push Notifications API.

## :hammer_and_wrench: Tools

### Frontend

* React
* TypeScript
* Auth0
* Vite
* Axios
* Radix UI
* TailwindCSS
* Recoil
* Web Push Notifications
* Service Workers

### Backend

* Node.js
* TypeScript
* Fastify
* Prisma
* Json Web Tokens
* Zod


## :mailbox_with_mail: Utilities
 
### <strong>Web Push Notifications</strong>

Web Push Notifications are notifications sent by a website to a user through the browser, even when the user is not visiting the website. Push notifications are similar to mobile app notifications, but instead of being sent by an app installed on the device, they are sent directly from the website.

To receive push notifications from the web, the user needs to allow the website to send notifications. When the user allows push notifications to be sent, the website can send notifications to the user's device whenever there is a relevant update or important event.

Web push notifications are supported by most modern browsers including Google Chrome, Mozilla Firefox and Microsoft Edge. To send web push notifications, you need to use browser-specific APIs such as Push API and Service Workers.

Web push notifications can be used in a variety of use cases, such as alerting the user to a new message, updating an order, breaking news, weather updates, and more.


### <strong>Service Workers</strong>

Service Workers are a scripting technology that allows the browser to run a script in the background, separate from the web page, that can intercept and manipulate browser requests and responses, enabling offline experiences, push notifications, advanced caching, and other functionality.

Service Workers work on an event model, allowing the script to respond to events such as user requests, notifications, cache updates, etc. They are able to cache data so that pages can load even if the user is offline or has a slow connection. This can improve page loading speed and provide a better user experience.

Service Workers are also used to implement push notifications. When a user subscribes to push notifications, the Service Worker can receive notifications from the server and display them even when the user is not browsing the site.

To work with Service Workers, knowledge of JavaScript is required, as they are implemented in JavaScript. Also, it's important to understand how to work with events and how to manage caches and notifications in the browser. There are several libraries available that can help simplify the process of implementing Service Workers such as Workbox.


### <strong>Radix UI</strong>

Radix UI is a library of React components developed by Modulz. It offers a wide range of accessible and ready-to-use components for different types of web projects. The library provides basic components such as buttons, menus, forms and tables, as well as more complex components such as modal, dropdown and graphics.

Radix UI components are highly customizable, allowing developers to easily change colors, styles, sizes and other properties. Furthermore, the library is designed to be compatible with other frameworks and component libraries, making it flexible and easy to integrate into existing projects.

Another interesting feature of Radix UI is that it provides a consistent and scalable design system that helps maintain a consistent look and feel across the application. The library is free and open source, and can be installed via NPM or Yarn.

### <strong>Working with Dates</strong>

Working with dates in applications is a common and important task, as we often need to manipulate dates, display formatted dates to users, or process information based on dates.

JavaScript has a Date object, which can be used to represent dates. We can create a new Date object with the Date() constructor and pass a string containing a date as an argument:

```js
const date = new Date('2022-03-18');
```

We can also create a Date object with the no-argument Date() constructor, which returns the current date:

```js
const now = new Date();
```

JavaScript also uses Unix time, which is the count of seconds since midnight (00:00:00) UTC on January 1, 1970. We can get the Unix time of a Date object using the getTime() method:

```js
const unixTime = date.getTime() / 1000;
```

The Intl library is a built-in JavaScript library that can be used to format dates according to the user's language and country. For example, we can format a date in Portuguese using the Intl.DateTimeFormat class:

```js
const date = new Date('2022-03-18');
const formatter = new Intl.DateTimeFormat('pt-BR');
const formattedDate = formatter.format(date); // 03/18/2022
```

There are also several external libraries that can make working with dates easier, such as Moment.js, Day.js, and date-fns. These libraries offer several functionalities for manipulating dates, such as adding or subtracting days, formatting dates, calculating the difference between dates, among others.

In summary, when working with dates in JavaScript, we can use the Date object, Unix time, the Intl library and external libraries to manipulate and format dates in an easier and more efficient way.

## :speech_balloon: Explanations

### Auth0 Authentication 

Reduce costs and risks that come with building your own solution. A flexible solution that plugs into any application written in any language. Auth0 lets you quickly add authentication to your React app and gain access to user profile information. We will now see how to integrate Auth0 with any React application using the Auth0 React SDK (Software Development Kit).

* On the platform

##### Get Your Application Keys 

When you signed up for Auth0, a new application was created for you, or you could have created a new one. You will need some details about that application to communicate with Auth0. You can get these details from the Application Settings section in the Auth0 dashboard.

You need the following information:

* Domain
* Client ID

##### Configure Callback URLs

A callback URL is a URL in your application where Auth0 redirects the user after they have authenticated. The callback URL for your app must be added to the Allowed Callback URLs field in your Application Settings. If this field is not set, users will be unable to log in to the application and will get an error.

##### Configure Allowed Web Origins

You need to add the URL for your app to the Allowed Web Origins field in your Application Settings. If you don't register your application URL here, the application will be unable to silently refresh the authentication tokens and your users will be logged out the next time they visit the application, or refresh the page.

* In code

##### Install the Auth0 React SDK

Run the following command within your project directory to install the `Auth0 React SDK`:

 - `npm install @auth0/auth0-react`

##### Configure the Auth0Provider component

Under the hood, the Auth0 React SDK uses React Context to manage the authentication state of your users. One way to integrate Auth0 with your React app is to wrap your root component with an Auth0Provider that you can import from the SDK.

```tsx
// web/src/main.tsx

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        cacheLocation="localstorage"
      >
        <App />
      </Auth0Provider>
    </RecoilRoot>
  </React.StrictMode>
)
```

##### Add Login to Your Application

The Auth0 React SDK gives you tools to quickly implement user authentication in your React application, such as creating a login button using the `loginWithRedirect()` method from the `useAuth0()` hook. Executing `loginWithRedirect()` redirects your users to the Auth0 Universal Login Page, where Auth0 can authenticate them. Upon successful authentication, Auth0 will redirect your users back to your application.

```tsx
// web/src/components/login/integrate/LoginButton.tsx

import { useAuth0 } from '@auth0/auth0-react'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../../../atoms'
import { api } from '../../../lib/axios'
import { Lightning } from 'phosphor-react'

export const LoginButton = () => {
  const { loginWithPopup, user } = useAuth0()
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
  const notAuthenticated = user?.email && currentUser.email === ''

  if (notAuthenticated) {
    api
      .post('/auth/login', {
        email: user.email,
        picture: user.picture,
      })
      .then((res) => {
        setCurrentUser({
          id: res.data.user.id,
          email: res.data.user.email,
          picture: res.data.user.picture,
        })
        localStorage.setItem('session', res.data.sessionToken)
      })
  }

  return (
    <button
      type="button"
      onClick={() => loginWithPopup()}
      className={style.wrapper}
    >
      <Lightning weight="bold" size={20} />
      Login
    </button>
  )
}
```

##### Add Logout to Your Application

Now that you can log in to your React application, you need a way to log out. You can create a logout button using the `logout()` method from the `useAuth0()` hook. Executing logout() redirects your users to your Auth0 logout endpoint (https://YOUR_DOMAIN/v2/logout) and then immediately redirects them to your application.

```tsx
// web/src/components/LogoutButton.tsx

import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { LightningSlash, SignOut } from 'phosphor-react'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../atoms'

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const LogoutButton = ({ setLoading }: Props) => {
  const { logout } = useAuth0()
  const [_, setCurrentUser] = useRecoilState(currentUserState)

  return (
    <button
      onClick={() => {
        setLoading(true)
        localStorage.removeItem('session')
        setCurrentUser({
          id: '',
          email: '',
          picture: '',
        })
        logout()
      }}
      type="button"
      className={style.wrapper}
    >
      <LightningSlash weight="bold" size={20} />
      Logout
    </button>
  )
}
```

<br />

### Services Workers and Web Push API Notifications 

Services workers are scripts that we can keep running in our application even when it is closed or even when the user has no internet connection.

Essentially a service worker behaves like a proxy server sitting between a web application, the browser and the network (when available). They serve, among other things, to enable the creation of efficient offline experiences, intercept network requests – acting appropriately according to the current connection status – and update assets residing on the server. Service workers also allow access to push notification and background sync APIs.

#### Service worker concepts and usage

A service worker is an event-driven worker registered against an origin and a path. It takes the form of a JavaScript file that can control the web-page/site that it is associated with, intercepting and modifying navigation and resource requests, and caching resources in a very granular fashion to give you complete control over how your app behaves in certain situations (the most obvious one being when the network is not available).

A service worker is run in a worker context: it therefore has no DOM access, and runs on a different thread to the main JavaScript that powers your app, so it is non-blocking. It is designed to be fully async; as a consequence, APIs such as synchronous XHR and Web Storage can't be used inside a service worker.

Service workers only run over HTTPS, for security reasons. Most significantly, HTTP connections are susceptible to malicious code injection by man in the middle attacks, and such attacks could be worse if allowed access to these powerful APIs. In Firefox, service worker APIs are also hidden and cannot be used when the user is in private browsing mode.

#### Navigator.serviceWorker

The `Navigator.serviceWorker` read-only property returns the ServiceWorkerContainer object for the associated document, which provides access to registration, removal, upgrade, and communication with the ServiceWorker.

The ServiceWorkerContainer interface of the Service Worker API provides an object representing the service worker as an overall unit in the network ecosystem, including facilities to register, unregister and update service workers, and access the state of service workers and their registrations.

Most importantly, it exposes the ServiceWorkerContainer.register() method used to register service workers, and the `ServiceWorkerContainer.controller` property used to determine whether or not the current page is actively controlled.

#### Instance methods

* <strong>ServiceWorkerContainer.register()</strong> - Creates or updates a ServiceWorkerRegistration for the given scriptURL.
 
* <strong>ServiceWorkerContainer.getRegistration()</strong> - Gets a ServiceWorkerRegistration object whose scope matches the provided document URL. The method returns a Promise that resolves to a ServiceWorkerRegistration or undefined.
 
#### PushManager

The PushManager interface of the Push API provides a way to receive notifications from third-party servers as well as request URLs for push notifications.

This interface is accessed via the `ServiceWorkerRegistration.pushManager` property.

##### Instance methods

* <strong>PushManager.getSubscription()</strong> - Retrieves an existing push subscription. It returns a Promise that resolves to a PushSubscription object containing details of an existing subscription. If no existing subscription exists, this resolves to a null value.
 
* <strong>PushManager.permissionState()</strong> - Returns a Promise that resolves to the permission state of the current PushManager, which will be one of `'granted'`, `'denied'`, or `'prompt'`.

* <strong>PushManager.subscribe()</strong> - Subscribes to a push service. It returns a Promise that resolves to a PushSubscription object containing details of a push subscription. A new push subscription is created if the current service worker does not have an existing subscription.

* <strong>ServiceWorkerRegistration.showNotification()</strong> - The showNotification() method of the ServiceWorkerRegistration interface creates a notification on an active service worker. 

* <strong>ExtendableEvent.waitUntil()</strong> - The ExtendableEvent.waitUntil() method tells the event dispatcher that work is ongoing. It can also be used to detect whether that work was successful. In service workers, waitUntil() tells the browser that work is ongoing until the promise settles, and it shouldn't terminate the service worker if it wants that work to complete. The install events in service workers use waitUntil() to hold the service worker in the installing phase until tasks complete. If the promise passed to waitUntil() rejects, the install is considered a failure, and the installing service worker is discarded. This is primarily used to ensure that a service worker is not considered installed until all of the core caches it depends on are successfully populated. 

```js
// web/public/service-worker.js

self.addEventListener('push', function (event) {
  const body = event.data?.text() ?? ''
  event.waitUntil(
    self.registration.showNotification('Habits', {
      body,
    })
  )
})

// web/src/utils/handleNotifications.ts

export function handleNotifications(currentUser: {
  id: string
  email: string
  picture: string
}) {
  navigator.serviceWorker
    .register('service-worker.js')
    .then(async (serviceWorker) => {
      let subscription = await serviceWorker.pushManager.getSubscription()

      if (!subscription) {
        const publicKeyResponse = await api.get('/push/public_key')

        subscription = await serviceWorker.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: publicKeyResponse.data.publicKey,
        })
      }

      await api.post('/notification/register', {
        subscription,
      })

      if (currentUser.email !== '')
        await api.post('/notification/send', {
          subscription,
          user: currentUser.email,
        })
    })
}
```

<br />

#### WebPush Library

Web push requires push messages triggered from a backend to be done via the Web Push Protocol and if you want to send data with your push message you should also encrypt that data according to the specification Message Encryption for Web Push.

This module facilitates sending messages and also handles legacy support for browsers that rely on GCM (Google Cloud Messaging) for message sending/delivery.

##### Voluntary Application Server Identification for Web Push (draft-ietf-webpush-vapid-01)

```
// VAPID keys should be generated only once.
// get Public and Private Key
const vapidKeys = webpush.generateVAPIDKeys();
```

An application server can voluntarily identify itself to a push service using the described technique. This identification information can be used by the push service to attribute requests that are made by the same application server to a single entity. This can used to reduce the secrecy for push subscription URLs by being able to restrict subscriptions to a specific application server. An application server is further able to include additional information that the operator of a push service can use to contact the operator of the application server.

So there are two reasons for `VAPID`.

 - The first is to restrict the validity of a subscription to a specific application server (so, by using VAPID, only your server will be able to send notifications to a subscriber).

 - The second is to add more information to the push notification, so that the push service operator knows who is sending the notifications. If something is going wrong with your notifications, the operator knows who you are and can contact you. Moreover, they can offer you some kind of interface to monitor your push notifications.


```ts
// web/src/controllers/notification-controller.ts

import WebPush from "web-push";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

// get Public and Private Key
// console.log(WebPush.generateVAPIDKeys())

const publicKey = `BAmA8fBVC3iLwrOsykZ5PqpV5p1Ne_9hJn7Bo0rAnM5JZGdG-Lj7L6Ntmhj6IWVZTgkB4thay3yJiOlW5HhUh4Y`;
const privateKey = process.env.NOTIFICATION_PRIVATE_KEY!;

WebPush.setVapidDetails("http://localhost:3333", publicKey, privateKey);

export class NotificationController {
  async publicKey() {
    try {
      return {
        publicKey,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async register(_: FastifyRequest, reply: FastifyReply) {
    try {
      return reply.status(201).send();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async send(request: FastifyRequest, reply: FastifyReply) {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          auth: z.string(),
          p256dh: z.string(),
        }),
      }),
      user: z.string(),
    });

    try {
      const { subscription, user } = sendPushBody.parse(request.body);
      WebPush.sendNotification(
        subscription,
        `Bom te ver novamente! ${user.split("@")[0]}`,
      );
      return reply.status(201).send();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
```

<p align="center">Project made with :blue_heart: by <a href="https://github.com/stardusteight-d4c">Gabriel Sena</a></p>
