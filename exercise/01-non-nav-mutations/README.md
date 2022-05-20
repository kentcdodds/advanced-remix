# 01. Non-nav mutations with `useFetcher()`

## Background

TODO: write some explanation to make this self-paced

## Exercise

In this exercise, we need to change from a regular `form` to a `useFetcher().Form` so we can avoid the full-page refresh, avoid history stack additions, and (in the next exercises) add optimistic UI and focus management. Go to the deposit form that shows up on the invoice details route and turn that into a `useFetcher().form`.

Interesting, the UI already technically works (hooray progressive enhancement!).

## Files

- `app/routes/__app/sales/invoices/$invoiceId.tsx`
