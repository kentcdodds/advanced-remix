# 05. Non-nav fetching with `useFetcher()`

## Background

TODO: write some explanation to make this self-paced

## Exercise

We have a combobox on the new invoice page that allows users to select which customer they're invoicing. We already have a method in our `customer.model.ts` to query the customers from the database and we have the combobox itself created. Now we just need to connect the combobox to the database so as the user types the combobox shows matching customers.

## Files

- `app/routes/resources/customers.tsx`
- `app/routes/__app/sales/invoices/new.tsx`
