# 09. Deferred

## 📝 Notes

## 🤓 Background

TODO

Example of `Deferred` usage:

```tsx
<Deferred
  value={loaderData.deferredValue}
  fallback={<div>loading...</div>}
  errorElement={<div>Oh no</div>}
>
  {(deferredValue) => <div>{deferredValue.whatever}</div>}
</Deferred>
```

## 💪 Exercise

TODO

## 🗃 Files

- `app/routes/__app/sales/customers/$customerId.tsx`

## 🦉 Elaboration and Feedback

After the instruction, if you want to remember what you've just learned, then
fill out the elaboration and feedback form:

https://ws.kcd.im/?ws=Advanced%20Remix%20%F0%9F%A6%B8&e=9%3A%2009.%20Deferred&em=
