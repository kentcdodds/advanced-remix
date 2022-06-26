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
git clone https://github.com/kentcdodds/advanced-remix.git
cd advanced-remix
npm run setup
```

This will take some time. This repository has many projects in it that each need
to have their own database setup. We also run type checking and the build to
make sure things are ready to rock and roll 🤘

If you experience errors here, please open [an issue][issue] with as many
details as you can offer.

### 💪 Exercises

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

# or to run the final version of the 2nd exercise
node dev final/02
```

Each will run on a unique port so you can run multiple apps at once.

Alternatively, rather than opening this whole repo in an editor window, you open
each exercise folder in an individual editor window (this will make things like
⌘+P more useful).

### Instructions

For each exercise, follow the instructions in the `README.md` file of the
exercise directory to learn what the objectives are.

You can use the `diff.js` script to be shown the differences between what's in
any of the apps. For example:

```sh
# to be shown the differences between the first exercise and the final version:
node diff exercise/01 final/01
```

This can be handy for you to run when you think you're done but things aren't
quite working as you expect.

Sometimes there are changes that happen outside of the exercise because they're
not the focus of the workshop but they can be handy to know about, so the diff
command can help with that:

```sh
# To be shown the changes that happened to prepare for the exercise:
node diff final/04 exercise/05
```

## Workshop Feedback

Each exercise has an Elaboration and Feedback link. Please fill that out after
the exercise and instruction.

At the end of the workshop, please go to this URL to give overall feedback.
Thank you! https://kcd.im/remix-advanced-ws-feedback

<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[build-badge]: https://img.shields.io/github/workflow/status/kentcdodds/advanced-remix/%E2%9C%85%20Validate/main?logo=github&style=flat-square
[build]: https://github.com/kentcdodds/advanced-remix/actions?query=workflow%3Avalidate
[license-badge]: https://img.shields.io/badge/license-GPL%203.0%20License-blue.svg?style=flat-square
[license]: https://github.com/kentcdodds/advanced-remix/blob/main/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://kentcdodds.com/conduct
[win-path]: https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
[mac-path]: http://stackoverflow.com/a/24322978/971592
[issue]: https://github.com/kentcdodds/advanced-remix/issues/new
<!-- prettier-ignore-end -->
