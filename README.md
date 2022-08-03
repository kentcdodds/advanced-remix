<div>
  <h1 align="center"><a href="https://kentcdodds.com/workshops/advanced-remix">💿 Advanced Remix Workshop</a></h1>
  <p>
    Remix enables you to build fantastic user experiences for the web and feel
    happy with the code that got you there. In this workshop, we'll look at some
    more advanced use cases when building Remix applications.
  </p>
</div>

<hr />

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![GPL 3.0 License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]
<!-- prettier-ignore-end -->

## Prerequisites

- Some
  [experience with JavaScript](https://kentcdodds.com/blog/javascript-to-know-for-react)
- Some [experience with React](https://kcd.im/beginner-react)
- Some [experience with Node.js](https://nodejs.dev/learn)
- Some [experience with Remix](https://remix.run/docs/en/v1/tutorials/blog)

## System Requirements

- [git][git] v2.13 or greater
- [NodeJS][node] `14 || 16 || 18`
- [npm][npm] v8 or greater

All of these must be available in your `PATH`. To verify things are set up
properly, you can run this:

```shell
git --version
node --version
npm --version
```

If you have trouble with any of these, learn more about the PATH environment
variable and how to fix it here for [windows][win-path] or
[mac/linux][mac-path].

## Setup

Follow these steps to get this set up:

```sh
git clone https://github.com/FrontendMasters/advanced-remix.git
cd remix-fundamentals
npm run setup
```

If you experience errors here, please open [an issue][issue] with as many
details as you can offer.

### Exercises

You'll find all the exercises in the `exercises` directory. The finished version
of each exercise is in the `final` directory. Each directory is a completely
contained Remix app.

The purpose of the exercise is **not** for you to work through all the material.
It's intended to get your brain thinking about the right questions to ask me as
_I_ walk through the material.

### Running each app

Each directory in the `final` and `exercises` directories is a Remix app. The
easiest way to run these without having to `cd` into each directory is to use
the `dev.js` script in the root of this repository:

```sh
# to run the first exercise app:
node dev exercise/01

# This runs the first exercise too:
node dev 1

# or to run the final version of the 2nd exercise
node dev final/02
# this runs the 1st extra credit of the final version of the 2nd exercise
node dev final2.1

# this will just ask you which one you want to run
node dev
```

Each will run on a unique port so you can run multiple apps at once.

Unfortunately, due to the nature of this workshop, ⌘+P isn't very useful
(because there are a LOT of duplicate files). If you'd prefer, you can open each
exercise in its own editor. Or just make sure to prefix your searches with
"exercise/03" (for example) so you're searching in the right app.

### Instructions

For each exercise, follow the instructions in the `README.md` file of the
exercise directory to learn what the objectives are.

You can use the `diff.js` script to be shown the differences between what's in
any of the apps. For example:

```sh
# to be shown the differences between the first exercise and the final version:
node diff exercise/01 final/01

# We've got some sensible defaults in place so you can get the same diff as above with:
node diff 1

# And for comparing yourself to extra credits, you can run:
node diff exercise/02 final/02.2

# this will just ask you which ones you want to diff
node diff
```

This can be handy for you to run when you think you're done but things aren't
quite working as you expect.

Sometimes there are changes that happen outside of the tutorial because they're
unrelated to Remix but they can be handy to know about, so the diff command can
help with that:

```sh
# To be shown the changes that happened to prepare for the exercise:
node diff final/04 exercise/05
```

NOTE: Unfortunately, there's no way to exclude some files from the diff we're
doing, so we limit the diff to only the `app` directory (where almost all of
your code changes happen). You'll need to ignore any changes to
`styles/tailwind.css` however. That's a generated file. Sorry about that.

## Workshop Feedback

Each exercise has an Elaboration and Feedback link. Please fill that out after
the exercise and instruction.

At the end of the workshop, please go to this URL to give overall feedback.
Thank you! https://kcd.im/remix-advanced-ws-feedback

<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[build-badge]: https://img.shields.io/github/workflow/status/FrontendMasters/advanced-remix/%E2%9C%85%20Validate/main?logo=github&style=flat-square
[build]: https://github.com/FrontendMasters/advanced-remix/actions?query=workflow%3Avalidate
[license-badge]: https://img.shields.io/badge/license-GPL%203.0%20License-blue.svg?style=flat-square
[license]: https://github.com/FrontendMasters/advanced-remix/blob/main/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://kentcdodds.com/conduct
[win-path]: https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
[mac-path]: http://stackoverflow.com/a/24322978/971592
[issue]: https://github.com/FrontendMasters/advanced-remix/issues/new
<!-- prettier-ignore-end -->
