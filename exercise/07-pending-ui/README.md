# 07. Pending UI

## 📝 Notes

## 🤓 Background

No matter how hard you try, you can't control your user's network and sometimes
that's gonna be slow. Without JavaScript, the browser will show a spinner in
favicon to give the user some feedback that stuff's going on. But once we start
making fetch requests, the browser doesn't give the user any feedback.

We can show a spinner easily enough. The trick is to know when. Well, because
Remix manages the network for you, it knows when you're making network requests
and you can use that to know when to show a spinner. Just hook into transitions
via Remix's `useTransition()` hook and you're in business:

📜
[`useTransition()` docs](https://remix.run/docs/en/v1/api/remix#usetransition)

## 💪 Exercise

We've slowed down the customers' page load time. We're going to pretend that the
backend for loading the invoice details for our customers is quite slow. So
navigating around the customers will be slow and frustrating. One thing we
should do to address this better is to give the user an indication that we're
working on their request to navigate. We already have a spinner component
implemented for you. Your job is just to render it when the app is loading.
Using `useTransition` you can render the spinner when the app is in a loading
state (💰 or a not "idle" state).

💯 As extra credit, you can use [`spin-delay`](https://npm.im/spin-delay)
(already installed) to delay showing and hiding the spinner so you never get a
flash of loading state.

## 🗃 Files

- `app/routes/__app.tsx`

## 🦉 Elaboration and Feedback

After the instruction, if you want to remember what you've just learned, then
fill out the elaboration and feedback form:

https://ws.kcd.im/?ws=Advanced%20Remix%20%F0%9F%A6%B8&e=07.%20Pending%20UI&em=
