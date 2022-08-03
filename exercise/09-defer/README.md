# 09. Defer

## 📝 Notes

## 🤓 Background

Sometimes, it's not our customer's Network connection that's the problem, but
it's own own slow backend that's the problem. In that case, you should try the
following improvements:

- Speed up the slow thing (😅).
  - Optimize DB queries.
  - Add caching (LRU, Redis, etc).
  - Use a different data source.
- Load data concurrently loading with `Promise.all`

Additionally, if initial page load is not a critical metric for your
application, you can also explore the following options that can improve the
perceived performance of your application client side only:

- Use the [`prefetch` prop on `<Link />`][link].
- Add a global transition spinner.
- Add a localized skeleton UI.

We've already implemented these last three improvements on the client. Let's
just pretend for some reason we can't speed up our backend or cache its result.
In that case, despite our best efforts, our users will still have a sub-optimal
experience with our `$customerId` route. Because the `customers` parent route is
responsible for rendering the skeleton UI, we only get the skeleton UI if the
parent route is rendered. There are two situations where that's not the case:

1. When transitioning from a completely different part of the app
2. When loading the app directly on a specific customer

In both of these cases, the user doesn't get to see any UI update until the
slowest bit of data is finished loading. This is not great.

Normally, what people do at this point is load the data in the client. This just
doesn't make sense to server render if it means users have to wait for the slow
data before they can see and interact with _anything_. In fact, we've got an
example of this implemented in `examples/client-side-fetching`. You'll notice
that it's actually not too bad as far as the code is concerned. The unfortunate
bit here is that we have a stair-step waterfall with that:

```
document -> JavaScript -> Data......
```

With React 18 streaming, Remix can do better. We can use Remix's `defer` API and
`Await` component! This gives us:

```
document -> JavaScript
.. Data ..... ->
```

With this approach, the data request happens at the same time as everything else
happening on the server and the result is ultimately streamed in when it's
ready. This makes that initial load happen considerably faster. And what's more,
the API is fantastic.

Example of all of this in action.

```tsx
import { Suspense } from "react"; // <-- using Suspense
import type { LoaderArgs } from "@remix-run/node";
import { defer } from "@remix-run/node"; // <-- using a special defer function
import { Await, useLoaderData } from "@remix-run/react"; // <-- using an Await component

import { getPackageLocation } from "~/models/packages";

export function loader({ params }: LoaderArgs) {
  // NOTE: getPackageLocation returns a promise, but we're *not* awaiting it!!
  const packageLocationPromise = getPackageLocation(params.packageId);

  return defer({
    packageLocation: packageLocationPromise, // <-- we pass a promise to defer
  });
}

export default function PackageRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Let's locate your package</h1>
      <Suspense fallback={<p>Loading package location...</p>}>
        <Await
          // PROMISE TELEPORTATION OVER THE NETWORK!
          resolve={data.packageLocation} // <-- this is a promise!
          errorElement={<p>Error loading package location!</p>}
        >
          {/* Render props are back! */}
          {(packageLocation) => (
            <p>
              Your package is at {packageLocation.latitude} lat and{" "}
              {packageLocation.longitude} long.
            </p>
          )}
        </Await>
      </Suspense>
    </main>
  );
}
```

This will do exactly what you hope it will. When the browser makes a request for
the document, we kick off the `getPackageLocation` right away, but we don't wait
for it to finish. We send a response with Suspense fallback in place. The
browser's document request HTTP connection will stay open because the response
is being streamed. When our `packageLocationPromise` finally resolves, then the
result is streamed to the browser on that HTTP connection and Remix triggers a
re-render of the app with the resolved data.

This will speed up our experience beyond what a client-side fetch could do, and
the API is killer. You can switch between streaming and waiting by simply
adding/removing the `await` keyword in front of the promise. You can even do
this at runtime if you want to do some A/B testing or you know based on the data
whether it's worth waiting for or not.

This is what we mean when we talk about "levers". Want a high Time To First Byte
(TTFB) and don't mind a little Content Layout Shift (CLS)? Then `defer` more of
your loader data! Do spinners and CLS make you sick to your stomach and you
don't mind waiting for slow backends? The use `json`. Want a great TTFB and now
CLS? Speed up your backend or cache it!

An important note about this is that to use this feature, your host needs to
support streaming and your `entry.server.tsx` file needs to be configured to
stream the response using React's `renderToPipeableStream` rather than
`renderToString`. We already have this configured in our entry so we're good to
go.

Unfortunately (as of August 2022), any hosting offering that wraps AWS Lambda
will not support streaming as AWS Lambda currently buffers the response until
it's finished and then sends it (defeating the purpose of streaming). This rules
out Netlify Functions and Vercel Functions. However, Netlify and Vercel each
have offerings that wrap Deno and Cloudflare respectively which _do_ support
streaming. Node.js in a docker container should stream no-problem. Just be sure
that you know whether your host supports streaming before you attempt to use
this API.

## 💪 Exercise

Let's implement the `defer`, `Suspense`, and `Await` APIs on our `$customerId`
route so we can get the best loading experience possible for our slow data.

## 🗃 Files

- `app/routes/__app/sales/customers/$customerId.tsx`

## 🦉 Elaboration and Feedback

After the instruction, if you want to remember what you've just learned, then
fill out the elaboration and feedback form:

https://ws.kcd.im/?ws=Advanced%20Remix%20%F0%9F%A6%B8&e=09.%20Defer&em=
