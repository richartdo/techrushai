"use client";
import { signOut } from "@/app/auth/actions";
export function SignOutButton(){return <form action={signOut}><button className="button button-quiet" type="submit">Sign out</button></form>}
