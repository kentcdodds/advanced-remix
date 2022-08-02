# 09. Defer

## 📝 Notes

## 🤓 Background

TODO

Example of `Await` usage:

```tsx
<Suspense fallback={<div>loading...</div>}>
  <Await resolve={loaderData.deferValue} errorElement={<div>Oh no</div>}>
    {(deferValue) => <div>{deferValue.whatever}</div>}
  </Await>
</Suspense>
```

## 💪 Exercise

TODO

## 🗃 Files

- `app/routes/__app/sales/customers/$customerId.tsx`

## 🦉 Elaboration and Feedback

After the instruction, if you want to remember what you've just learned, then
fill out the elaboration and feedback form:

https://ws.kcd.im/?ws=Advanced%20Remix%20%F0%9F%A6%B8&e=09.%20Defer&em=
