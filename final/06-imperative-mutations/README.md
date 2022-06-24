# 06. Imperative Mutations

## 📝 Notes

## 🤓 Background

So far the only way we've made mutations for our app is by using forms where the user actually has to click something to submit the mutation. But sometimes we want to let our backend know something without the user having to click anything. For example, on [kentcdodds.com/blog](https://kentcdodds.com/blog), Kent wanted to track how many times a blog post was read without having readers self-report by clicking a "I read this" button. If you're on one of the blog posts for long enough to have read it and scroll through the whole then that should count as a "read." So Kent used `useFetcher().submit` + `useEffect` to make this work. It's something like this:

```tsx
const action = ({ request, params }) => {
  const userId = await getUserId(request);
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "mark-as-read") {
    const slug = params.slug;
    await markAsRead({ userId, slug });
    return new Response("success");
  }
  throw new Error("Unknown intent");
};

function BlogPostRoute() {
  // stuff...

  const readFetcher = useFetcher();
  useEffect(() => {
    if (isRead) {
      readFetcher.submit({ intent: "mark-as-read" }, { method: "post" });
    }
  }, [readFetcher, isRead]);

  // more stuff...
}
```

## 💪 Exercise

Because this app deals with financial and customer data, we don't want anyone snooping if a user leaves their computer unattended. So we want to log the user out after a time.

We've already got the modal and logic around the timeout implemented for you. Your job is the Remix bit (of course). You need to post to the `/logout` route to get the user logged out.

## 🗃 Files

- `app/root.tsx`

## 🦉 Elaboration and Feedback

After the instruction, if you want to remember what you've just learned, then
fill out the elaboration and feedback form:

https://ws.kcd.im/?ws=Advanced%20Remix%20%F0%9F%A6%B8&e=15%3A%2006.%20Imperative%20Mutations&em=
