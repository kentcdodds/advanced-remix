# 04. Revalidation Optimization

## 📝 Notes

## 🤓 Background

Before JavaScript came around, any time you submitted a form, the browser would send a request the server and the server would respond with a new page. This effectively revalidated all the data on the page (because the whole page was new). When JavaScript showed up, we decided we should use the response that came back and stitch it into the existing page. Unfortunately, this led to a lot of data inconsistencies and missed data and that's when "Application state management" became such a challenge in the world of development of the world wide web. And it's the primary cause for the frustration that you hear from OG web developers who lament how hard it is to build for the web these days.

Remix "remixes" the old (and much simpler) mental model with the modern UX JavaScript affords us. Every time there's a mutation, rather than trying to stitch together the new data with the old data, Remix will just revalidate all the data on the page. This drastically simplifies the development process and reduces inconsistency bugs and code. However it may not be the most optimal strategy for all data.

For example, there's some data that rarely if ever changes during the course of a user's session. For example... the user's session 😂 Reloading the user's data every time a mutation is made is probably unnecessary. The same could be said of the user's light/dark mode preference as another example.

Remix has, of course, taken this into consideration and we're still working through what the final API for this will be, but it does exist and it's called `unstable_shouldReload`. With this API as it currently stands today, you provide a function that accepts information about the transition that's happening and you determine (on a per-route basis) whether it's worthwhile to revalidate the data for that route.

You can think of it like the second argument of [`React.memo`](https://reactjs.org/docs/react-api.html#reactmemo) (called the "comparator" function). Once provided, you are responsible for deciding whether that component should re-render. Look at the data your route needs and think of all situations when that data could change and only return true if those situations are happening.

📜 [`unstable_shouldReload` docs](https://remix.run/docs/en/v1/api/conventions#unstable_shouldreload)

## 💪 Exercise

We don't need to reload the user whenever there's a mutation. The user's information shouldn't change between mutations. It only changes when they login or logout. So add `unstable_shouldReload` to the root route and only reload that route's loader when the user logs in or logs out.

## 🗃 Files

- `app/root.tsx`

## 🦉 Elaboration and Feedback

After the instruction, if you want to remember what you've just learned, then
fill out the elaboration and feedback form:

https://ws.kcd.im/?ws=Advanced%20Remix%20%F0%9F%A6%B8&e=04.%20Revalidation%20Optimization&em=
