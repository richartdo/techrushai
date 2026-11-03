"use client";

import Link from "next/link";
import { Check, Circle, Eye, EyeOff } from "lucide-react";
import { useActionState, useState } from "react";
import { resetPassword, signIn, signUp, type AuthState } from "@/app/auth/actions";

const initial: AuthState = {};

function PasswordField({ confirmation = false, signInMode = false, value, onChange }: { confirmation?: boolean; signInMode?: boolean; value?: string; onChange?: (value: string) => void }) {
  const [visible, setVisible] = useState(false);
  const name = confirmation ? "confirmPassword" : "password";
  const label = confirmation ? "Confirm password" : "Password";
  return <label>{label}<span className="password-field"><input name={name} value={value} onChange={(event) => onChange?.(event.target.value)} type={visible ? "text" : "password"} autoComplete={confirmation ? "new-password" : signInMode ? "current-password" : "new-password"} required minLength={8} placeholder={confirmation ? "Re-enter your password" : "At least 8 characters"} /><button type="button" onClick={() => setVisible((current) => !current)} aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`} title={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}>{visible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}</button></span></label>;
}

function Requirement({ met, children }: { met: boolean; children: React.ReactNode }) {
  return <li className={met ? "met" : ""}>{met ? <Check size={14} aria-hidden="true" /> : <Circle size={14} aria-hidden="true" />}{children}</li>;
}

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" | "reset" }) {
  const action = mode === "sign-in" ? signIn : mode === "sign-up" ? signUp : resetPassword;
  const [state, formAction, pending] = useActionState(action, initial);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const title = mode === "sign-in" ? "Sign in to continue learning." : mode === "sign-up" ? "Create your learning space." : "Reset your password.";
  const requirements = [{ text: "At least 8 characters", met: password.length >= 8 }, { text: "One uppercase letter", met: /[A-Z]/.test(password) }, { text: "One lowercase letter", met: /[a-z]/.test(password) }, { text: "One number", met: /\d/.test(password) }, { text: "One special character", met: /[^A-Za-z0-9]/.test(password) }, { text: "Passwords match", met: confirmation.length > 0 && password === confirmation }];
  return <main className="auth-page"><section className="auth-card"><Link className="brand" href="/">techrush<span>ai</span></Link><p className="eyebrow">{mode === "sign-in" ? "Welcome back" : mode === "sign-up" ? "Start your journey" : "Account recovery"}</p><h1>{title}</h1><form action={formAction}><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>{mode !== "reset" && <PasswordField signInMode={mode === "sign-in"} value={mode === "sign-up" ? password : undefined} onChange={mode === "sign-up" ? setPassword : undefined} />}{mode === "sign-up" && <><PasswordField confirmation value={confirmation} onChange={setConfirmation} />{(password || confirmation) && <ul className="password-requirements" aria-live="polite">{requirements.map((requirement) => <Requirement key={requirement.text} met={requirement.met}>{requirement.text}</Requirement>)}</ul>}</>}{state.error && <p className="form-error" role="alert">{state.error}</p>}{state.message && <p className="form-success" role="status">{state.message}</p>}<button className="button button-primary" disabled={pending}>{pending ? "Please wait…" : mode === "sign-in" ? "Sign in" : mode === "sign-up" ? "Create account" : "Send reset link"}</button></form>{mode === "sign-in" ? <p><Link href="/reset-password">Forgot password?</Link> · <Link href="/sign-up">Create an account</Link></p> : <p><Link href="/sign-in">Back to sign in</Link></p>}</section></main>;
}
