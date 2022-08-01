# 02. Optimistic UI

## 📝 Notes

## 🤓 Background

Continuing with the twitter example in the last exercise, when you click "favorite" on a tweet, it shows the filled-in red heart instantly. Even if you're on a slow connection. How do they manage to do that? Well, it's a trick! The tweet hasn't _actually_ been favorited yet! They're just being... optimistic! Turns out 99% of the time when you favorite a tweet, it's successful. So they just decided that they'll show you the finished state before it's actually finished.

This is called optimistic UI and it's a great way to improve perceived performance and the user experience of your app. However it can be tricky to implement because sometimes your optimism is misplaced! For example, what if you try to favorite a tweet that was deleted? In that case, twitter will show a toast message that explains you can't favorite the tweet and it will un-fill the heart to rollback the optimistic state.

Luckily for us, in Remix, you don't have to think about rolling back. It just magically happens thanks to the way Remix works. I'm not joking. You're about to experience it first-hand! Your only job is to determine what the UI will look like when the mutation is finished and display that. For favoriting a tweet that's easy (just fill in the heart), but sometimes it requires knowing a little bit more about the mutation, which Remix is well suited to provide you with via `useTransition().submission` (and `useFetcher().submission`).

📜 [Remix docs on Optimistic UI](https://remix.run/docs/en/v1/guides/optimistic-ui)

## 💪 Exercise

Let's make the deposit form optimistically list the new deposit the user just submitted. After all, all the data we need to display the new deposit is right there. The user just gave it to us!

- `amount`
- `depositDateFormatted` (we can get that from `depositDate.toLocalDateString()`)

## 🗃 Files

- `app/routes/__app/sales/invoices/$invoiceId.tsx`

## 🦉 Elaboration and Feedback

After the instruction, if you want to remember what you've just learned, then
fill out the elaboration and feedback form:

https://ws.kcd.im/?ws=Advanced%20Remix%20%F0%9F%A6%B8&e=02.%20Optimistic%20UI&em=
