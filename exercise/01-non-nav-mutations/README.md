# 01. Non-nav mutations with `useFetcher()`

## 📝 Notes

## 🤓 Background

From the beginning of the web, `<form>` has been how mutations were handled. The user fills out some fields, clicks the submit button, and the browser serializes that form and sends it to the server. The server processes the form and returns a response (normally a redirect to another page). Thanks to modern advancements in JavaScript, we're able to offer a better user experience that doesn't involve a full-page refresh, but the mental model of a form with Remix is still the same. Form submissions are navigations by default.

This process works great for when you're creating a new invoice and navigating the user to the page for that invoice they just created, but it doesn't work well for something like favoriting a tweet for example. When you favorite a tweet, that leaves the user where they are. They can even favorite one tweet, and then go and favorite another tweet before the first is finished and everything should just work out. Not every mutation involves a navigation.

This is where `useFetcher()` comes in. With `useFetcher()`, you can create a mutation that doesn't navigate. However, the mental model and API remains the same. Think of `useFetcher()` as a non-navigation version of `Form` and `useTransition()` (because that's what it is).

📜 [`useFetcher()` docs](https://remix.run/docs/en/v1/api/remix#usefetcher)

## 💪 Exercise

In this exercise, we need to change from a regular `form` to a `useFetcher().Form` so we can avoid the full-page refresh, avoid history stack additions, and (in the next exercises) add optimistic UI and focus management. Go to the deposit form that shows up on the invoice details route and turn that into a `useFetcher().form`.

Interesting, the UI already technically works (hooray progressive enhancement!). So the required changes here will be quite minimal. When you're done you'll wonder "is that all?" Yes... it is.

## 🗃 Files

- `app/routes/__app/sales/invoices/$invoiceId.tsx`

## 🦉 Elaboration and Feedback

After the instruction, if you want to remember what you've just learned, then
fill out the elaboration and feedback form:

https://ws.kcd.im/?ws=Advanced%20Remix%20%F0%9F%A6%B8&e=1%3A%2001.%20Non-nav%20mutations%20with%20%60useFetcher()%60&em=
