# 08. Skeletons

## 📝 Notes

## Background

A loading spinner is great... But we can improve that experience even further by offering what's called a skeleton UI. This improves the user's perceived performance because they can instantly see some response from the application and can start acclimating themselves to the new UI while you're loading the data. This is especially useful if you have some part of the UI that takes a bit of time to the load, but the rest is already there.

With nested routing, this is pretty straightforward as well. You simply determine whether you're in a loading state and instead of showing the `<Outlet />` you show the `<Skeleton />` component. Doing this means that the user is no longer looking at the old data, but instead at the skeleton UI.

## Exercise

When we're on the customer page navigating between customers, we want to show a skeleton UI instead of just the spinner in the corner to improve the UX. We've already built a skeleton component for you. Your job is to use `useTransition().pathname` to determine which customer we're transitioning to and display the skeleton component while we load the rest of the data.

## Files

- `app/routes/__app/sales/customers.tsx`
