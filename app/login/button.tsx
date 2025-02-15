"use client";

import { signInWithGithub } from "./actions";

export function Button() {
  return (
    <button onClick={() => signInWithGithub()}>Sign in with GitHub</button>
  );
}
