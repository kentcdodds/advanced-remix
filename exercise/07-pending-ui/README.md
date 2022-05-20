# 07. Pending UI

## Background

No matter how hard you try, you can't control your user's network and sometimes that's gonna be slow. Without JavaScript, the browser will show a spinner in favicon to give the user some feedback that stuff's going on. But once we start making fetch requests, the browser doesn't give the user any feedback.

TODO: write some more explanation to make this self-paced

## Exercise

We've slowed down the customers' page load time. So navigating around the customers will be slow and frustrating. We already have a spinner component implemented for you. Your job is just to render it when the app is loading. Using `useTransition` you can render the spinner when the app is in a loading state (💰 or a not "idle" state).

💯 As extra credit, you can use [`spin-delay`](https://npm.im/spin-delay) (already installed) to delay showing and hiding the spinner so you never get a flash of loading state.

## Files

- `app/routes/__app.tsx`
