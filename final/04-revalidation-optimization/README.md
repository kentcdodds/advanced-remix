# 10. Finished

## Background

TODO: write some explanation to make this self-paced

## Exercise

We don't need to reload the user whenever there's a mutation. The user's information shouldn't change between mutations. It only changes when they login or logout. So add `unstable_shouldReload` to the root route and only reload that route's loader when the user logs in or logs out.

## Files

- `app/root.tsx`
