# 03. Focus Management

## 📝 Notes

## 🤓 Background

One of the benefits of having JavaScript on the page is we're able to help the user navigate around the app more intelligently. Without JavaScript, their focus always goes to `<body>` any time they click a link or submit a form. With JavaScript, their focus stays where it was (assuming that element remains on the page post-transition... otherwise it _does_ go to the `<body>`). But even this is often not the most intelligent thing to do for the user. We can do better.

Especially when the user is doing repetitive data entry, it would be really nice if we help clear out form values and set focus to where it should go so they can get through their data entry faster. Or even in a regular form, if there's an error, wouldn't it be nice if we focus their focus to the field with the error? (The answer is "yes").

This is precisely where React's `useEffect` hook shines and it's the primary use-case for this hook in a Remix app. Here's a simple example of something you could do:

```tsx
useEffect(() => {
  if (homeAddressHasError) {
    formRef.current.elements.homeAddress.focus();
  }
}, [homeAddressHasError]);
```

## 💪 Exercise

Someone came through and added display error messages for us (how nice of them). But our focus management could definitely be better. Here's what we want to have happen on the new deposits form:

1. If there's an error, focus on the element that's in error (if there are multiple, just focus on the first one)
2. If there's no error, focus on the first input element

## 🗃 Files

- `app/routes/__app/sales/invoices/$invoiceId.tsx`

## 🦉 Elaboration and Feedback

After the instruction, if you want to remember what you've just learned, then
fill out the elaboration and feedback form:

(https://ws.kcd.im/?ws=Advanced%20Remix%20%F0%9F%A6%B8&e=3%3A%2003.%20Focus%20Management&em=)
