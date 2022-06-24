# 05. Non-nav fetching with `useFetcher()`

## 📝 Notes

## 🤓 Background

Picture this: a React component that handles the whole experience of fetching data from a server... _including the server code_. That's what we're going to do here. There are tons of use cases for this, but one really common one is a combobox which allows you to select from a list of options. It's too expensive to send all those options to the client though (maybe you're building the twitter `@`-mention autocomplete for example), so you have to load those possible values as the user is typing. That's where this becomes really complicated... Unless you're using Remix 😉.

In Remix, you can use the `useFetcher()` hook to fetch data from a resource route (a regular route that doesn't have a `default` export). And Remix will manage the network complexity for you.

The neat thing we're doing in here is we're putting the component in the resource route so you can colocate your frontend and backend code in the exact same file (like we do with regular routes) and then you can import that component anywhere and get the whole managed experience. We're still deciding how comfortable we are with routes importing things from other routes, but the DX is _fantastic_ 😅.

## 💪 Exercise

We have a combobox on the new invoice page that allows users to select which customer they're invoicing. We already have a method in our `customer.model.ts` to query the customers from the database and we have the combobox itself created. Now we just need to connect the combobox to the database so as the user types the combobox shows matching customers.

## 🗃 Files

- `app/routes/resources/customers.tsx`
- `app/routes/__app/sales/invoices/new.tsx`

## 🦉 Elaboration and Feedback

After the instruction, if you want to remember what you've just learned, then
fill out the elaboration and feedback form:

https://ws.kcd.im/?ws=Advanced%20Remix%20%F0%9F%A6%B8&e=5%3A%2005.%20Non-nav%20fetching%20with%20%60useFetcher()%60&em=
